import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  // 获取列表
  public async getResPage(
    params?: API.List.Params
  ): Promise<API.List.Response> {
    return await this.get<API.List.Data[]>("/sys/res/list", params);
  }

  // 删除
  public async delRes(
    params?: API.DelRes.Params
  ): Promise<API.DelRes.Response> {
    return await this.post<API.DelRes.Data>("/sys/res/del", params);
  }

  // 新增
  public async addRes(
    params?: API.AddRes.Params
  ): Promise<API.AddRes.Response> {
    return await this.post<API.AddRes.Data>("/sys/res/add", params);
  }

  // 修改
  public async setRes(
    params?: API.SetRes.Params
  ): Promise<API.SetRes.Response> {
    return await this.post<API.SetRes.Data>("/sys/res/edit", params);
  }
}
