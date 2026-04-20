import { Request } from "mor-request";

import { API } from "../types";
export default class Api extends Request {
  // 获取模板
  public async getMetaList(
    params: API.MetaList.Params
  ): Promise<API.MetaList.Response> {
    return await this.get<API.MetaList.Data[]>(
      "/cms/op/page/template/meta/list",
      params
    );
  }
}
