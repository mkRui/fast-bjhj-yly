import { Request } from "mor-request";
import { API } from "../types";

export default class Api extends Request {
  public async getSetting(params: API.PeriodSetting.Params): Promise<API.PeriodSetting.Response> {
    return await this.get<API.PeriodSetting.Data>("/user/leave/period/setting", params);
  }
}

