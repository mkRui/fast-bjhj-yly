import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  // 获取列表
  public async getCategoryList(
    params?: API.List.Params
  ): Promise<API.List.Response> {
    return await this.get<API.List.Data[]>("/biz/category/list", params);
  }

  // 删除
  public async delCategory(
    params?: API.DelCategory.Params
  ): Promise<API.DelCategory.Response> {
    return await this.post<API.DelCategory.Data>("/biz/category/del", params);
  }

  // 新增
  public async addCategory(
    params?: API.AddCategory.Params
  ): Promise<API.AddCategory.Response> {
    return await this.post<API.AddCategory.Data>("/biz/category/add", params);
  }

  // 修改
  public async editCategory(
    params?: API.EditCategory.Params
  ): Promise<API.EditCategory.Response> {
    return await this.post<API.EditCategory.Data>("/biz/category/edit", params);
  }
}
