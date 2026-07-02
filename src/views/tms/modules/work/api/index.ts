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

  public async editWork(params: API.WorkEdit.Params): Promise<API.WorkEdit.Response> {
    return await this.post<API.WorkEdit.Data>("/tms/work/edit", params);
  }

  public async delWork(params: API.WorkDel.Params): Promise<API.WorkDel.Response> {
    return await this.post<API.WorkDel.Data>("/tms/work/work/del", params);
  }
}
