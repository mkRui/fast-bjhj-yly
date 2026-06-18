import type { API } from "../types/api";

const now = Date.now();

function formatTime(offsetMs: number): string {
  const date = new Date(now - offsetMs);
  const pad = (n: number): string => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export const NOTIFICATION_USE_MOCK = import.meta.env.VITE_NOTIFICATION_MOCK === "true";

export const INITIAL_MOCK_NOTICES: API.List.RecordItem[] = [
  {
    id: "1",
    title: "请假审批待处理",
    content: "有新的教师请假申请等待审核。",
    target: "4",
    targetId: "1001",
    alertTime: formatTime(1000 * 60 * 12),
  },
  {
    id: "2",
    title: "易耗品申请待处理",
    content: "有新的易耗品申请等待审核。",
    target: "2",
    targetId: "1002",
    alertTime: formatTime(1000 * 60 * 60 * 3),
  },
  {
    id: "3",
    title: "用车申请待处理",
    content: "有新的用车申请等待审核。",
    target: "3",
    targetId: "1003",
    alertTime: formatTime(1000 * 60 * 60 * 8),
  },
];
