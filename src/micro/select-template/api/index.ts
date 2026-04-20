import { Request } from "mor-request";

import { API } from "../types";
export default class Api extends Request {
  // 获取模板
  public async getTemplateList(): Promise<API.TemplateList.Response> {
    return await this.get<API.TemplateList.Data[]>(
      "/cms/op/channel/template/list"
    );
  }
}
