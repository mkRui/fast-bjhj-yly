import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  public async getPeriod(): Promise<API.Period.Response> {
    return await this.get<API.Period.Data>("/user/submit/period");
  }

  public async submitWork(params: API.SubmitWork.Params): Promise<API.SubmitWork.Response> {
    return await this.post<API.SubmitWork.Data>("/user/submit/work", params);
  }

  public async getWorkStatistics(
    params?: API.WorkStatistics.Params
  ): Promise<API.WorkStatistics.Response> {
    return await this.get<API.WorkStatistics.Data[]>("/user/submit/work/statistics", params);
  }

  public async getWorkPage(params: API.WorkPage.Params): Promise<API.WorkPage.Response> {
    return await this.get<API.WorkPage.Data>("/i/user/submit/work/page", params);
  }
}

