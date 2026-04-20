/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-06-12 13:38:12
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-25 10:39:42
 * @FilePath: /fast-bjhj-website-admin/src/micro/select-category/api/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Request } from "mor-request";
import { API } from "../types";
export default class Api extends Request {
  // 获取分类参数列表
  public async getCategoryParamList(
    params: API.CategoryParamList.Params
  ): Promise<API.CategoryParamList.Response> {
    return await this.get<API.CategoryParamList.Data[]>(
      "/biz/category/param/list",
      params
    );
  }
}
