/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-06-21 19:04:11
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-23 16:25:58
 * @FilePath: /fast-bjhj-website-admin/src/views/sort/modules/category-param/api/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  // 获取分类参数列表
  public async getList(
    params?: API.List.Params
  ): Promise<API.List.Response> {
    return await this.get<API.List.Data[]>("/biz/category/param/list", params);
  }

  // 新增分类参数
  public async addItem(
    params: API.AddItem.Params
  ): Promise<API.AddItem.Response> {
    return await this.post<API.AddItem.Data>("/biz/category/param/add", params);
  }

  // 编辑分类参数
  public async setItem(
    params: API.EditItem.Params
  ): Promise<API.EditItem.Response> {
    return await this.post<API.EditItem.Data>("/biz/category/param/edit", params);
  }

  // 删除分类参数
  public async delItem(
    params: API.DelItem.Params
  ): Promise<API.DelItem.Response> {
    return await this.post<API.DelItem.Data>("/biz/category/param/del", params);
  }
}
