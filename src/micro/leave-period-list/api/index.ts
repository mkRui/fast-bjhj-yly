import { Request } from "mor-request";
import { API } from "../types";

export default class Api extends Request {
  public async getList(): Promise<API.PeriodList.Response> {
    return await this.get<API.PeriodList.Data[]>("/user/leave/period/List");
  }
}
