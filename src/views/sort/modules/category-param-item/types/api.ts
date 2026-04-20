/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-12-23 16:33:34
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-23 18:13:43
 * @FilePath: /fast-bjhj-website-admin/src/views/sort/modules/category-param-item/types/api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace List {
    export interface Params {
      categoryId: number | string;
      paramId: number | string;
    }
    export interface Data {
      id: number;
      name: string;
      value: string;
      categoryId: number | string;
      paramId: number | string;
      attr1?: string;
      attr2?: string;
      attr3?: string;
      [key: string]: any;
    }
    export type Response = BaseRequest.Response<Data[]>;
  }

  export namespace AddItem {
    export interface Params {
      name: string;
      value: string;
      categoryId: number | string;
      paramId: number | string;
      attr1?: string;
      attr2?: string;
      attr3?: string;
      [key: string]: any;
    }
    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace EditItem {
    export interface Params {
      id: number;
      categoryParamItem: API.AddItem.Params;
    }
    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace DelItem {
    export interface Params {
      id: number;
    }
    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }
}
