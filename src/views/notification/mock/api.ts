import type { API } from "../types/api";
import { mockNoticeStore } from "./store";

function delay(ms = 200): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export async function mockGetPage(
  params: API.Page.Params
): Promise<API.Page.Response> {
  await delay();
  return [null, mockNoticeStore.getPage(params)];
}

export async function mockGetUnreadCount(): Promise<API.UnreadCount.Response> {
  await delay(100);
  return [null, mockNoticeStore.getUnreadCount()];
}

export async function mockRead(
  params: API.Read.Params
): Promise<API.Read.Response> {
  await delay();
  mockNoticeStore.markRead(params.id);
  return [null, null];
}

export async function mockReadAll(): Promise<API.Read.Response> {
  await delay();
  mockNoticeStore.markAllRead();
  return [null, null];
}
