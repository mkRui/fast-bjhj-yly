/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-06-21 19:05:22
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-24 17:03:28
 * @FilePath: /fast-bjhj-website-admin/src/views/sort/modules/category-param/types/api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace List {
    export interface Params {
      categoryId: string;
    }
    export interface Data {
      id: number;
      name: string;
      sname: string;
      attr1Desc?: string;
      attr2Desc?: string;
      attr3Desc?: string;
      [key: string]: any;
    }
    export type Response = BaseRequest.Response<Data[]>;
  }

  export namespace AddItem {
    export interface Params {
      name: string;
      sname: string;
      categoryId: number | string;
      attr1Desc?: string;
      attr2Desc?: string;
      attr3Desc?: string;
      [key: string]: any; // 支持 attr{x}Desc 动态参数
    }
    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace EditItem {
    export interface Params {
      id: number;
      categoryParam: API.AddItem.Params;
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
