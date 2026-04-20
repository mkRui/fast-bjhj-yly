import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  // 获取分类参数选项列表
  public async getList(
    params?: API.List.Params
  ): Promise<API.List.Response> {
    return await this.get<API.List.Data[]>("/biz/category/param/item/list", params);
  }

  // 新增分类参数选项
  public async addItem(
    params: API.AddItem.Params
  ): Promise<API.AddItem.Response> {
    return await this.post<API.AddItem.Data>("/biz/category/param/item/add", params);
  }

  // 编辑分类参数选项
  public async setItem(
    params: API.EditItem.Params
  ): Promise<API.EditItem.Response> {
    return await this.post<API.EditItem.Data>("/biz/category/param/item/edit", params);
  }

  // 删除分类参数选项
  public async delItem(
    params: API.DelItem.Params
  ): Promise<API.DelItem.Response> {
    return await this.post<API.DelItem.Data>("/biz/category/param/item/del", params);
  }
}
