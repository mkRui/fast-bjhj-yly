import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  public async getPeriodList(): Promise<API.PeriodList.Response> {
    return await this.get<API.PeriodList.Data[]>("/tms/leave/period/List");
  }

  public async getPage(params: API.Page.Params): Promise<API.Page.Response> {
    return await this.get<API.Page.Data>("/tms/leave/page", params);
  }

  public async check(params: API.Check.Params): Promise<API.Check.Response> {
    return await this.post<API.Check.Data>("/tms/leave/check", params);
  }
}

