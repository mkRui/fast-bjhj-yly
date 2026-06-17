import type { SseFrame } from "../utils/sse-client";
import {
  MOCK_SSE_INITIAL_DELAY_MS,
  MOCK_SSE_INTERVAL_MS,
  MOCK_SSE_TEMPLATES,
} from "./data";
import { mockNoticeStore } from "./store";

export interface MockSseClientOptions {
  signal?: AbortSignal;
  onMessage: (frame: SseFrame) => void;
  onOpen?: () => void;
  onClose?: () => void;
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

export function startMockSseClient(options: MockSseClientOptions): () => void {
  let stopped = false;
  let templateIndex = 0;

  const pushNotice = (): void => {
    if (stopped || options.signal?.aborted) return;

    const template = MOCK_SSE_TEMPLATES[templateIndex % MOCK_SSE_TEMPLATES.length];
    templateIndex += 1;

    mockNoticeStore.addNotice({
      title: template.title,
      content: template.content,
      type: template.type,
    });

    options.onMessage({
      event: "message",
      data: JSON.stringify({
        title: template.title,
        content: template.content,
        type: template.type,
        unreadCount: mockNoticeStore.getUnreadCount(),
      }),
    });
  };

  const run = async (): Promise<void> => {
    options.onOpen?.();

    try {
      await sleep(MOCK_SSE_INITIAL_DELAY_MS, options.signal);
      pushNotice();

      while (!stopped && !options.signal?.aborted) {
        await sleep(MOCK_SSE_INTERVAL_MS, options.signal);
        pushNotice();
      }
    } catch {
      // aborted
    } finally {
      if (!stopped) {
        options.onClose?.();
      }
    }
  };

  void run();

  return () => {
    stopped = true;
  };
}
