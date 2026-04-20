import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  // 获取列表
  public async getRolePage(
    params?: API.List.Params
  ): Promise<API.List.Response> {
    return await this.get<API.List.Data[]>("/sys/role/list", params);
  }

  // 删除
  public async delRole(
    params?: API.DelRole.Params
  ): Promise<API.DelRole.Response> {
    return await this.post<API.DelRole.Data>("/sys/role/del", params);
  }

  // 新增
  public async addRole(
    params?: API.AddRole.Params
  ): Promise<API.AddRole.Response> {
    return await this.post<API.AddRole.Data>("/sys/role/add", params);
  }

  // 修改
  public async setRole(
    params?: API.SetRole.Params
  ): Promise<API.SetRole.Response> {
    return await this.post<API.SetRole.Data>("/sys/role/del", params);
  }
}
