import { App } from "antd";
import { FC, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import eventDispatch from "@/utils/common/event-dispatch";
import morStorage from "@/utils/common/local-storage";

import { NoticeEvents } from "../constants/events";
import type { SseNoticePayload } from "../types/sse";
import { parseNoticePayload, showGlobalNotice } from "../utils/notice-payload";
import { startSseClient } from "../utils/sse-client";

const GlobalNotification: FC = () => {
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const stopRef = useRef<(() => void) | null>(null);

  const handlePayload = useCallback(
    (payload: SseNoticePayload): void => {
      showGlobalNotice(notification, payload, () => {
        navigate("/notification");
      });

      if (typeof payload.unreadCount === "number") {
        eventDispatch.emit(NoticeEvents.UNREAD_COUNT, payload.unreadCount);
      } else {
        eventDispatch.emit(NoticeEvents.RECEIVED);
      }
    },
    [navigate, notification]
  );

  const disconnect = useCallback((): void => {
    stopRef.current?.();
    stopRef.current = null;
  }, []);

  const connect = useCallback((): void => {
    disconnect();

    const token = morStorage.getItem("token");
    if (!token) return;

    const controller = new AbortController();

    stopRef.current = startSseClient({
      token,
      signal: controller.signal,
      onMessage: (frame) => {
        if (frame.event === "ping" || frame.data === "ping") {
          return;
        }
        handlePayload(parseNoticePayload(frame.data));
      },
    });

    const previousStop = stopRef.current;
    stopRef.current = () => {
      controller.abort();
      previousStop();
    };
  }, [disconnect, handlePayload]);

  useEffect(() => {
    connect();

    const handleLogout = (): void => {
      disconnect();
    };

    eventDispatch.on("login", handleLogout);

    return () => {
      eventDispatch.off("login", handleLogout);
      disconnect();
    };
  }, [connect, disconnect]);

  return null;
};

export default GlobalNotification;
