import { baseURL } from "@/api";

import { NOTIFICATION_USE_MOCK, startMockSseClient } from "../mock";

const DEFAULT_SSE_PATH = "/user/notice/sse";
const RECONNECT_DELAY_MS = 3000;
const MAX_RECONNECT_DELAY_MS = 30000;

export interface SseFrame {
  event: string;
  data: string;
}

export interface SseClientOptions {
  url?: string;
  token: string;
  signal?: AbortSignal;
  onMessage: (frame: SseFrame) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: unknown) => void;
}

function parseSseBlock(block: string): SseFrame | null {
  const trimmed = block.trim();
  if (!trimmed) return null;

  let event = "message";
  const dataLines: string[] = [];

  for (const line of trimmed.split("\n")) {
    if (line.startsWith("event:")) {
      event = line.slice(6).trim();
    } else if (line.startsWith("data:")) {
      dataLines.push(line.slice(5).trimStart());
    }
  }

  if (!dataLines.length) return null;

  return {
    event,
    data: dataLines.join("\n"),
  };
}

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new Error("aborted"));
      return;
    }

    const timer = window.setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);

    const onAbort = (): void => {
      window.clearTimeout(timer);
      reject(new Error("aborted"));
    };

    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

export function startSseClient(options: SseClientOptions): () => void {
  if (NOTIFICATION_USE_MOCK) {
    return startMockSseClient({
      signal: options.signal,
      onMessage: options.onMessage,
      onOpen: options.onOpen,
      onClose: options.onClose,
    });
  }

  const url = options.url ?? `${baseURL}${DEFAULT_SSE_PATH}`;
  let stopped = false;
  let reconnectDelay = RECONNECT_DELAY_MS;

  const stop = (): void => {
    stopped = true;
  };

  const connect = async (): Promise<void> => {
    while (!stopped && !options.signal?.aborted) {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "text/event-stream",
            Authorization: `Bearer ${options.token}`,
          },
          credentials: "include",
          signal: options.signal,
        });

        if (!response.ok || !response.body) {
          throw new Error(`SSE connection failed: ${response.status}`);
        }

        reconnectDelay = RECONNECT_DELAY_MS;
        options.onOpen?.();

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (!stopped && !options.signal?.aborted) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split(/\n\n/);
          buffer = parts.pop() ?? "";

          for (const part of parts) {
            const frame = parseSseBlock(part);
            if (frame) {
              options.onMessage(frame);
            }
          }
        }

        options.onClose?.();
      } catch (error) {
        if (stopped || options.signal?.aborted) break;
        options.onError?.(error);
        try {
          await sleep(reconnectDelay, options.signal);
        } catch {
          break;
        }
        reconnectDelay = Math.min(reconnectDelay * 2, MAX_RECONNECT_DELAY_MS);
      }
    }
  };

  void connect();

  return stop;
}
