import type { API } from "../types/api";
import { INITIAL_MOCK_NOTICES } from "./data";

function cloneNotices(): API.List.RecordItem[] {
  return INITIAL_MOCK_NOTICES.map((item) => ({ ...item }));
}

class MockNoticeStore {
  private unreadNotices: API.List.RecordItem[] = cloneNotices();
  private readNotices: API.List.RecordItem[] = [];
  private seq = INITIAL_MOCK_NOTICES.length;

  public getUnreadCount(): number {
    return this.unreadNotices.length;
  }

  public getList(params: API.List.Params): API.List.RecordItem[] {
    const source = params.readFlag ? this.readNotices : this.unreadNotices;
    return [...source].sort(
      (a, b) =>
        new Date(b.alertTime || 0).getTime() - new Date(a.alertTime || 0).getTime()
    );
  }

  public markRead(id: string): void {
    const index = this.unreadNotices.findIndex((item) => item.id === id);
    if (index < 0) return;
    const [target] = this.unreadNotices.splice(index, 1);
    this.readNotices.unshift(target);
  }

  public markAllRead(): void {
    this.readNotices.unshift(...this.unreadNotices);
    this.unreadNotices = [];
  }

  public addNotice(payload: {
    title: string;
    content: string;
    target?: string;
    targetId?: string;
  }): API.List.RecordItem {
    this.seq += 1;
    const notice: API.List.RecordItem = {
      id: String(this.seq),
      title: payload.title,
      content: payload.content,
      target: payload.target,
      targetId: payload.targetId,
      alertTime: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    this.unreadNotices.unshift(notice);
    return notice;
  }
}

export const mockNoticeStore = new MockNoticeStore();
