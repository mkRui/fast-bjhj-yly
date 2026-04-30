import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  public async getPage(params: API.Page.Params): Promise<API.Page.Response> {
    return await this.get<API.Page.Data>("/ams/category/page", params);
  }

  public async add(params: API.Add.Params): Promise<API.Add.Response> {
    return await this.post<API.Add.Data>("/ams/category/add", params);
  }

  public async del(params: API.Del.Params): Promise<API.Del.Response> {
    return await this.post<API.Del.Data>("/ams/category/del", params);
  }

  public async edit(params: API.Edit.Params): Promise<API.Edit.Response> {
    return await this.post<API.Edit.Data>("/ams/category/edit", params);
  }
}

