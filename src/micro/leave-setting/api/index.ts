import { Request } from "mor-request";
import { API } from "../types";

export default class Api extends Request {
  public async getSetting(): Promise<API.Setting.Response> {
    return await this.get<API.Setting.Data>("/user/leave/setting");
  }
}
