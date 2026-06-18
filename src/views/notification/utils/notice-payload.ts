import type { NotificationInstance } from "antd/es/notification/interface";

export type NoticeLevel = "success" | "info" | "warning" | "error";

export interface NoticePayload {
  title?: string;
  content?: string;
  type?: string;
}

export function resolveNoticeLevel(type?: string): NoticeLevel {
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
  payload: NoticePayload,
  onClick?: () => void
): void {
  const level = resolveNoticeLevel(payload.type);
  const title = payload.title || "新消息提醒";
  const description = payload.content;

  notification[level]({
    message: title,
    description,
    placement: "topRight",
    duration: 4.5,
    onClick,
  });
}
