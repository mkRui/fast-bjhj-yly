import { Request } from "mor-request";
import {
  NOTIFICATION_USE_MOCK,
  mockGetPage,
  mockGetUnreadCount,
  mockRead,
  mockReadAll,
} from "../mock";
import { API } from "../types/api";

export class Api extends Request {
  public async getPage(params: API.Page.Params): Promise<API.Page.Response> {
    if (NOTIFICATION_USE_MOCK) {
      return mockGetPage(params);
    }
    return await this.get<API.Page.Data>("/user/notice/page", params);
  }

  public async read(params: API.Read.Params): Promise<API.Read.Response> {
    if (NOTIFICATION_USE_MOCK) {
      return mockRead(params);
    }
    return await this.post<API.Read.Data>("/user/notice/read", params);
  }

  public async readAll(): Promise<API.Read.Response> {
    if (NOTIFICATION_USE_MOCK) {
      return mockReadAll();
    }
    return await this.post<API.Read.Data>("/user/notice/readAll", {});
  }

  public async getUnreadCount(): Promise<API.UnreadCount.Response> {
    if (NOTIFICATION_USE_MOCK) {
      return mockGetUnreadCount();
    }
    return await this.get<API.UnreadCount.Data>("/user/notice/unreadCount");
  }
}
