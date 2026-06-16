import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  public async getApplyPage(params: API.ApplyPage.Params): Promise<API.ApplyPage.Response> {
    return await this.get<API.ApplyPage.Data>("/ams/assets/item/apply/page", params);
  }

  public async applyCheck(params: API.ApplyCheck.Params): Promise<API.ApplyCheck.Response> {
    return await this.post<API.ApplyCheck.Data>("/ams/assets/apply/check", params);
  }

  public async disposeCheck(params: API.DisposeCheck.Params): Promise<API.DisposeCheck.Response> {
    return await this.post<API.DisposeCheck.Data>("/ams/assets/dispose/check", params);
  }
}
