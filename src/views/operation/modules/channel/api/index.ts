import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  // 获取列表
  public async getResPage(
    params?: API.List.Params
  ): Promise<API.List.Response> {
    return await this.get<API.List.Data[]>("/cms/op/channel/tree", params);
  }

  // 获取频道元数据
  public async getMetaList(
    params?: API.MetaList.Params
  ): Promise<API.MetaList.Response> {
    return await this.get<API.MetaList.Data[]>(
      "/cms/op/channel/template/meta/list",
      params
    );
  }

  // 删除
  public async delRes(
    params?: API.DelRes.Params
  ): Promise<API.DelRes.Response> {
    return await this.post<API.DelRes.Data>("/cms/op/channel/delete", params);
  }

  // 新增
  public async addRes(
    params?: API.AddRes.Params
  ): Promise<API.AddRes.Response> {
    return await this.post<API.AddRes.Data>("/cms/op/channel/add", params);
  }

  // 修改
  public async getRes(
    params?: API.GetRes.Params
  ): Promise<API.GetRes.Response> {
    return await this.get<API.GetRes.Data>(
      "/cms/op/channel/metaData/list",
      params
    );
  }

  // 修改
  public async setRes(
    params?: API.SetRes.Params
  ): Promise<API.SetRes.Response> {
    return await this.post<API.SetRes.Data>("/cms/op/channel/edit", params);
  }
}
