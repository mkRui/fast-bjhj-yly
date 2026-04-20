import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  // 获取用户列表
  public async getPages(
    params?: API.Pages.Params,
  ): Promise<API.Pages.Response> {
    return await this.get<API.Pages.Data>(`/cms/op/page/page`, params?.query);
  }

  // 删除
  public async delItem(
    params?: API.DelItem.Params,
  ): Promise<API.DelItem.Response> {
    return await this.post<API.DelItem.Data>("/cms/op/page/delete", params);
  }

  // 新增
  public async addItem(
    params?: API.AddItem.Params,
  ): Promise<API.AddItem.Response> {
    return await this.post<API.AddItem.Data>("/cms/op/page/add", params);
  }

  // 修改
  public async setItem(
    params?: API.SetItem.Params,
  ): Promise<API.SetItem.Response> {
    return await this.post<API.SetItem.Data>("/cms/op/page/edit", params);
  }

  // 获取频道元数据
  public async getMetaList(
    params?: API.MetaList.Params,
  ): Promise<API.MetaList.Response> {
    return await this.get<API.MetaList.Data[]>(
      "/cms/op/page/template/meta/list",
      params,
    );
  }

  // 修改
  public async getMetaData(
    params?: API.GetRes.Params,
  ): Promise<API.GetRes.Response> {
    return await this.get<API.GetRes.Data>(
      "/cms/op/page/metaData/list",
      params,
    );
  }
}
