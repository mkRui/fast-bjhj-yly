import { Request } from "mor-request";

import { API } from "../types";
export default class Api extends Request {
  // 获取资源与角色关联列表
  public async getRoleList(
    params: API.RoleResourceList.Params
  ): Promise<API.RoleResourceList.Response> {
    return await this.get<API.RoleResourceList.DataChildren[]>(
      "/sys/role/res/list",
      params
    );
  }

  // 变更角色资源关联
  public async setRoleRes(
    params: API.SetRoleResource.Params
  ): Promise<API.SetRoleResource.Response> {
    return await this.post<API.SetRoleResource.Data>(
      "/sys/role/res/mod",
      params
    );
  }
}
