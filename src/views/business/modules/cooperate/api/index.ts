import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  public async getIntentionList(
    params?: API.Intention.Params
  ): Promise<API.Intention.Response> {
    return await this.get<API.Intention.Data>("/biz/intention/page", params);
  }

  public async setIntention(
    params: API.SetIntention.Params
  ): Promise<API.SetIntention.Response> {
    return await this.post<API.SetIntention.Data>(
      "/biz/intention/reply",
      params
    );
  }
}
