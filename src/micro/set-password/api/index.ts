import { Request } from "mor-request";

import { API } from "../types";
export default class Api extends Request {
  // 获取所属公司
  public async changePassword(
    params: API.ChangePassword.Params
  ): Promise<API.ChangePassword.Response> {
    return await this.post<API.ChangePassword.Data>(
      "/auth/changePassword",
      params
    );
  }
}
