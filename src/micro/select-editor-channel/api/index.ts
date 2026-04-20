import { Request } from "mor-request";

import { API } from "../types";
export default class Api extends Request {
  // 获取模板
  public async getChannelList(): Promise<API.ChannelList.Response> {
    return await this.get<API.ChannelList.Data[]>("/cms/op/page/channel/tree");
  }
}
