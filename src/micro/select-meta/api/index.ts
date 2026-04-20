import { Request } from "mor-request";

import { API } from "../types";
export default class Api extends Request {
  public async getMetaList(
    params: API.MetaList.Params
  ): Promise<API.MetaList.Response> {
    return await this.get<API.MetaList.Data[]>(
      "/cms/op/channel/template/meta/list",
      params
    );
  }
}
