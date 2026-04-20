import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  // 获取列表
  public async getList(
    params?: API.List.Params
  ): Promise<API.List.Response> {
    return await this.get<API.List.Data[]>("/biz/product/attr/list", params);
  }

  // 删除
  public async delItem(
    params?: API.DelItem.Params
  ): Promise<API.DelItem.Response> {
    return await this.post<API.DelItem.Data>("/biz/product/attr/del", params);
  }

  // 新增
  public async addItem(
    params?: API.AddItem.Params
  ): Promise<API.AddItem.Response> {
    return await this.post<API.AddItem.Data>("/biz/product/attr/add", params);
  }

  // 修改
  public async editItem(
    params?: API.EditItem.Params
  ): Promise<API.EditItem.Response> {
    return await this.post<API.EditItem.Data>("/biz/product/attr/edit", params);
  }
}
