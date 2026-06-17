import { NoticeStateEnum } from "@/types/enum-types";
import { NoticeTypeEnum } from "@/types/enum-types";

import type { API } from "../types/api";

export const NOTIFICATION_USE_MOCK = true;

const now = Date.now();

function formatTime(offsetMs: number): string {
  const date = new Date(now - offsetMs);
  const pad = (n: number): string => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export const INITIAL_MOCK_NOTICES: API.Page.RecordItem[] = [
  {
    id: "notice-001",
    title: "请假审批通过",
    content: "您 2026-06-14 的请假申请已通过审核。",
    type: NoticeTypeEnum.MESSAGE,
    state: NoticeStateEnum.UNREAD,
    createTime: formatTime(1000 * 60 * 12),
  },
  {
    id: "notice-002",
    title: "课时上报提醒",
    content: "请于本周五前完成 6 月份课时上报。",
    type: NoticeTypeEnum.NOTICE,
    state: NoticeStateEnum.UNREAD,
    createTime: formatTime(1000 * 60 * 60 * 3),
  },
  {
    id: "notice-003",
    title: "资产领用审核",
    content: "您申请的投影仪领用已进入审批流程，请留意后续通知。",
    type: NoticeTypeEnum.MESSAGE,
    state: NoticeStateEnum.UNREAD,
    createTime: formatTime(1000 * 60 * 60 * 8),
  },
  {
    id: "notice-004",
    title: "系统维护通知",
    content: "系统将于 6 月 20 日 22:00-23:00 进行维护，期间可能无法访问。",
    type: NoticeTypeEnum.NOTICE,
    state: NoticeStateEnum.READ,
    createTime: formatTime(1000 * 60 * 60 * 24),
  },
  {
    id: "notice-005",
    title: "展会资料已确认",
    content: "您提交的展会上报资料已确认收悉。",
    type: NoticeTypeEnum.MESSAGE,
    state: NoticeStateEnum.READ,
    createTime: formatTime(1000 * 60 * 60 * 48),
  },
];

export const MOCK_SSE_TEMPLATES = [
  {
    title: "新消息提醒",
    content: "您有一条新的系统通知，请及时查看。",
    type: "info",
  },
  {
    title: "审批待处理",
    content: "有新的用车申请等待您审核。",
    type: "warning",
  },
  {
    title: "操作成功",
    content: "您的课时上报已成功提交。",
    type: "success",
  },
] as const;

export const MOCK_SSE_INITIAL_DELAY_MS = 8000;
export const MOCK_SSE_INTERVAL_MS = 45000;
