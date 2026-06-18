import { Request } from "mor-request";
import {
  NOTIFICATION_USE_MOCK,
  mockGetList,
  mockGetUnreadCount,
  mockRead,
  mockReadAll,
} from "../mock";
import { API } from "../types/api";

const toUnreadCount = (value: unknown): number => {
  const count = Number(value);
  return Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;
};

export class Api extends Request {
  public async getList(params: API.List.Params): Promise<API.List.Response> {
    if (NOTIFICATION_USE_MOCK) {
      return mockGetList(params);
    }
    return await this.get<API.List.Data>("/msg/message/list", params);
  }

  public async read(params: API.Read.Params): Promise<API.Read.Response> {
    if (NOTIFICATION_USE_MOCK) {
      return mockRead(params);
    }
    return await this.post<API.Read.Data>("/msg/message/read", params);
  }

  public async readAll(): Promise<API.Read.Response> {
    if (NOTIFICATION_USE_MOCK) {
      return mockReadAll();
    }
    return await this.post<API.Read.Data>("/msg/message/readAll", {});
  }

  public async getUnreadCount(): Promise<API.UnreadCount.Response> {
    if (NOTIFICATION_USE_MOCK) {
      return mockGetUnreadCount();
    }
    const response = await this.get<unknown>("/msg/message/count");
    const [err, data] = response;
    if (err) return response as unknown as API.UnreadCount.Response;
    return [null, toUnreadCount(data)];
  }
}
