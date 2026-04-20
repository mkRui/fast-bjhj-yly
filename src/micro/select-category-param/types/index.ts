/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-12-23 15:57:28
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-23 17:53:37
 * @FilePath: /fast-bjhj-website-admin/src/micro/select-category-param/types/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* eslint-disable @typescript-eslint/no-namespace */

import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace CategoryParamList {
    export interface Params {
      categoryId: number | string;
    }
    export interface Data {
      id: number;
      name: string;
      sname: string;
      attr1Desc?: string;
      attr2Desc?: string;
      attr3Desc?: string;
    }
    export type Response = BaseRequest.Response<Data[]>;
  }
}
