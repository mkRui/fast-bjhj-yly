import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  public async getPage(params: API.List.Params): Promise<API.List.Response> {
    return await this.get<API.List.Data>("/tms/teacher/page", params);
  }

  public async getInfo(params: API.Info.Params): Promise<API.Info.Response> {
    return await this.get<API.Info.Data>("/tms/teacher/info", params);
  }

  public async edit(params: API.Edit.Params): Promise<API.Edit.Response> {
    return await this.post<API.Edit.Data>("/tms/teacher/edit", params);
  }

  public async del(params: API.Del.Params): Promise<API.Del.Response> {
    return await this.post<API.Del.Data>("/tms/teacher/del", params);
  }
}

