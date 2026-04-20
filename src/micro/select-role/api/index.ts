import { Request } from "mor-request";

import { API } from "../types";
export default class Api extends Request {
  // 获取所属公司
  public async getRoleList(): Promise<API.RoleList.Response> {
    return await this.get<API.RoleList.Data[]>("/sys/user/role/list");
  }

  // 获取角色列表
  public async getUserRoleList(
    params: API.UserRoleList.Params
  ): Promise<API.UserRoleList.Response> {
    return await this.get<API.UserRoleList.Data[]>(
      "/sys/user/userRole/list",
      params
    );
  }
}
