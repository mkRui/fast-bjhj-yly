import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  public async getStatisticsPage(
    params: API.StatisticsPage.Params
  ): Promise<API.StatisticsPage.Response> {
    return await this.get<API.StatisticsPage.Data>("/tms/work/teacher/statistics/page", params);
  }

  public async getWorkPage(params: API.WorkPage.Params): Promise<API.WorkPage.Response> {
    return await this.get<API.WorkPage.Data>("/tms/work/teacher/page", params);
  }
}
