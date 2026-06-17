export interface SseNoticePayload {
  id?: string;
  title?: string;
  content?: string;
  type?: string;
  unreadCount?: number;
}

export type SseNoticeLevel = "success" | "info" | "warning" | "error";
