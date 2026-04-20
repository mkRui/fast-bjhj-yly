/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace List {
    export interface Params {
      keyword?: string;
    }

    export interface Data {
      id: number;
      parentId: number;
      name: string;
      code: string;
      selfCode: string;
      type: string;
      childrenList: [];
    }

    export type Response = BaseRequest.Response<Data[]>;
  }

  export namespace DelRes {
    export interface Params {
      id: number;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace AddRes {
    export interface Params {
      name: string;
      code: string;
      parentId?: number;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace SetRes {
    export interface Params extends API.AddRes.Params {
      name: string;
      code: string;
      parentId: number;
      resId: number;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }
}
