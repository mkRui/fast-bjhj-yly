/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace List {
    export interface Params {
      keyword?: string;
    }

    export interface Data {
      id: string;
      parentId: string;
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
      id: string;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace AddRes {
    export interface Params {
      name: string;
      code: string;
      parentId?: string;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace SetRes {
    export interface Params extends API.AddRes.Params {
      name: string;
      code: string;
      parentId: string;
      resId: string;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }
}
