import { Request } from "mor-request";

import { API } from "../types";
export default class Api extends Request {
  // 获取所属公司
  public async getEditorList(): Promise<API.RoleList.Response> {
    return await this.get<API.RoleList.Data[]>("/cms/op/editor/list");
  }
}
