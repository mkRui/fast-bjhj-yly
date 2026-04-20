/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-06-12 13:38:12
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-23 15:57:46
 * @FilePath: /fast-bjhj-website-admin/src/micro/select-category/api/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Request } from "mor-request";
import { API } from "../types";
export default class Api extends Request {
  // 获取分类列表
  public async getCategoryList(): Promise<API.CategoryList.Response> {
    return await this.get<API.CategoryList.Data[]>("/biz/category/list");
  }
}
