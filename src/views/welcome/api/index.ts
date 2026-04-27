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
    return await this.get<API.WorkPage.Data>("/user/submit/work/page", params);
  }

  public async getLeavePeriodList(): Promise<API.LeavePeriodList.Response> {
    return await this.get<API.LeavePeriodList.Data>("/user/leave/period/List");
  }

  public async getLeavePeriodSetting(
    params: API.LeavePeriodSetting.Params
  ): Promise<API.LeavePeriodSetting.Response> {
    return await this.get<API.LeavePeriodSetting.Data>("/user/leave/period/setting", params);
  }

  public async submitLeave(params: API.LeaveSubmit.Params): Promise<API.LeaveSubmit.Response> {
    return await this.post<API.LeaveSubmit.Data>("/user/leave/submit", params);
  }

  public async getLeavePage(params: API.LeavePage.Params): Promise<API.LeavePage.Response> {
    return await this.get<API.LeavePage.Data>("/user/leave/page", params);
  }
}
