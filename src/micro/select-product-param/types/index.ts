/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-12-23 15:57:28
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-23 20:13:47
 * @FilePath: /fast-bjhj-website-admin/src/micro/select-product-param/types/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace ParamList {
    export interface Params {
      productId?: string;
    }

    export interface CategoryParamItem {
      id: string;
      categoryId: string;
      paramId: string;
      name: string;
      value: string;
      attr1: string;
      attr2: string;
      attr3: string;
    }

    export interface CategoryParam {
      id: string;
      categoryId: string;
      name: string;
      sname: string;
      attr1Desc: string;
      attr2Desc: string;
      attr3Desc: string;
    }

    export interface Data {
      categoryParam: CategoryParam;
      categoryParamItemList: CategoryParamItem[];
    }

    export type Response = BaseRequest.Response<Data[]>;
  }
}
