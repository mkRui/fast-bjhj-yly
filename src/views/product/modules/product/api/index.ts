/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-06-21 19:04:11
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-25 15:56:36
 * @FilePath: /fast-bjhj-website-admin/src/views/product/modules/product/api/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  // 获取产品分页列表
  public async getPage(params?: API.List.Params): Promise<API.List.Response> {
    return await this.get<API.List.Data>("/biz/product/page", params);
  }

  // 新增产品
  public async addItem(
    params: API.AddItem.Params
  ): Promise<API.AddItem.Response> {
    return await this.post<API.AddItem.Data>("/biz/product/add", params);
  }

  // 编辑产品
  public async editItem(
    params: API.EditItem.Params
  ): Promise<API.EditItem.Response> {
    return await this.post<API.EditItem.Data>("/biz/product/edit", params);
  }

  // 删除产品
  public async delItem(
    params: API.DelItem.Params
  ): Promise<API.DelItem.Response> {
    return await this.post<API.DelItem.Data>("/biz/product/del", params);
  }

  // 获取规格参数列表
  public async getParamList(
    params?: API.ParamList.Params
  ): Promise<API.ParamList.Response> {
    return await this.get<API.ParamList.Data[]>(
      "/biz/product/param/paramList",
      params
    );
  }

  public async setProductParam(
    params: API.SetProductParam.Params
  ): Promise<API.SetProductParam.Response> {
    return await this.post<API.SetProductParam.Data>(
      "/biz/product/param/set",
      params
    );
  }

  public async getProductParam(
    params: API.GetProductParam.Params
  ): Promise<API.GetProductParam.Response> {
    return await this.get<API.GetProductParam.Data[]>(
      "/biz/product/param/list",
      params
    );
  }


  // 修改产品属性
  public async editProductAttr(
    params?: API.EditProductAttr.Params
  ): Promise<API.EditProductAttr.Response> {
    return await this.post<API.EditProductAttr.Data>("/biz/product/attr/edit", params);
  }
}
