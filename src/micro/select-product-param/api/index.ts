/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-12-23 15:57:46
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-25 15:57:17
 * @FilePath: /fast-bjhj-website-admin/src/micro/select-product-param/api/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Request } from "mor-request";
import { API } from "../types";

export default class Api extends Request {
  // 获取规格参数列表
  public async getParamList(
    params?: API.ParamList.Params
  ): Promise<API.ParamList.Response> {
    return await this.get<API.ParamList.Data[]>("/biz/product/param/paramList", params);
  }
}
