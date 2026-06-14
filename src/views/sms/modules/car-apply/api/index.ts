import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  public async getApplyPage(
    params: API.ApplyPage.Params
  ): Promise<API.ApplyPage.Response> {
    return await this.get<API.ApplyPage.Data>("/crms/apply/page", params);
  }

  public async applyCheck(
    params: API.ApplyCheck.Params
  ): Promise<API.ApplyCheck.Response> {
    return await this.post<API.ApplyCheck.Data>("/crms/apply/check", params);
  }
}
