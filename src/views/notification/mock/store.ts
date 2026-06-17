import { NoticeStateEnum } from "@/types/enum-types";
import { NoticeTypeEnum } from "@/types/enum-types";

import type { API } from "../types/api";
import { INITIAL_MOCK_NOTICES } from "./data";

function cloneNotices(): API.Page.RecordItem[] {
  return INITIAL_MOCK_NOTICES.map((item) => ({ ...item }));
}

class MockNoticeStore {
  private notices: API.Page.RecordItem[] = cloneNotices();
  private seq = INITIAL_MOCK_NOTICES.length;

  public getUnreadCount(): number {
    return this.notices.filter((item) => item.state === NoticeStateEnum.UNREAD).length;
  }

  public getPage(params: API.Page.Params): API.Page.Data {
    const current = Math.max(0, Number(params.current ?? "0"));
    const size = Math.max(1, Number(params.size ?? "10"));
    const state = params.state ? Number(params.state) : NoticeStateEnum.ALL;

    let filtered = [...this.notices];
    if (state === NoticeStateEnum.READ) {
      filtered = filtered.filter((item) => item.state === NoticeStateEnum.READ);
    } else if (state === NoticeStateEnum.UNREAD) {
      filtered = filtered.filter((item) => item.state === NoticeStateEnum.UNREAD);
    }

    filtered.sort(
      (a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
    );

    const total = filtered.length;
    const pages = Math.max(1, Math.ceil(total / size));
    const start = current * size;

    return {
      size,
      pages,
      total,
      current,
      records: filtered.slice(start, start + size),
    };
  }

  public markRead(id: string): void {
    const target = this.notices.find((item) => item.id === id);
    if (target) {
      target.state = NoticeStateEnum.READ;
    }
  }

  public markAllRead(): void {
    this.notices.forEach((item) => {
      item.state = NoticeStateEnum.READ;
    });
  }

  public addNotice(payload: {
    title: string;
    content: string;
    type?: string;
  }): API.Page.RecordItem {
    this.seq += 1;
    const notice: API.Page.RecordItem = {
      id: `notice-mock-${this.seq}`,
      title: payload.title,
      content: payload.content,
      type:
        payload.type === NoticeTypeEnum.NOTICE
          ? NoticeTypeEnum.NOTICE
          : NoticeTypeEnum.MESSAGE,
      state: NoticeStateEnum.UNREAD,
      createTime: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    this.notices.unshift(notice);
    return notice;
  }
}

export const mockNoticeStore = new MockNoticeStore();
