import { Request } from "mor-request";

import { API } from "../types";
export default class Api extends Request {
  // 获取资源与角色关联列表
  public async getChannelTree(): Promise<API.ChannelTree.Response> {
    return await this.get<API.ChannelTree.TreeData[]>("/cms/op/page/channel/tree");
  }
}
