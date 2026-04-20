import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  // 获取用户列表
  public async getAccount(
    params?: API.Account.Params
  ): Promise<API.Account.Response> {
    return await this.get<API.Account.Data[]>("/cms/op/editor/list", params);
  }

  // 新增用户
  public async addAccount(
    params: API.AddAccount.Params
  ): Promise<API.AddAccount.Response> {
    return await this.post<API.AddAccount.Data>("/cms/op/editor/add", params);
  }

  // 删除用户
  public async delAccount(
    params: API.DelAccount.Params
  ): Promise<API.DelAccount.Response> {
    return await this.post<API.DelAccount.Data>(
      "/cms/op/editor/delete",
      params
    );
  }

  // 重置密码
  public async setAccountPassword(
    params: API.setAccountPassword.Params
  ): Promise<API.setAccountPassword.Response> {
    return await this.post<API.setAccountPassword.Data>(
      "/sys/user/password/reset",
      params
    );
  }
}
