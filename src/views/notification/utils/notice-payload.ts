import type { NotificationInstance } from "antd/es/notification/interface";

import type { SseNoticeLevel, SseNoticePayload } from "../types/sse";

export function parseNoticePayload(data: string): SseNoticePayload {
  try {
    const parsed = JSON.parse(data) as unknown;
    if (typeof parsed === "object" && parsed !== null) {
      return parsed as SseNoticePayload;
    }
  } catch {
    // plain text payload
  }

  return { content: data };
}

export function resolveNoticeLevel(type?: string): SseNoticeLevel {
  switch (type) {
    case "success":
      return "success";
    case "warning":
      return "warning";
    case "error":
      return "error";
    default:
      return "info";
  }
}

export function showGlobalNotice(
  notification: NotificationInstance,
  payload: SseNoticePayload,
  onClick?: () => void
): void {
  const level = resolveNoticeLevel(payload.type);
  const title = payload.title || "新通知";
  const description = payload.content;

  notification[level]({
    message: title,
    description,
    placement: "topRight",
    duration: 4.5,
    onClick,
  });
}
