/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace List {
    export interface Params {
      keyword?: string;
    }

    export interface Data {
      id: number;
      name: string;
      sname: string;
    }

    export type Response = BaseRequest.Response<Data[]>;
  }

  export namespace DelCategory {
    export interface Params {
      id: number;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace AddCategory {
    export interface Params {
      name: string;
      sname: string;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace EditCategory {
    export interface Params {
      id: number;
      category: API.AddCategory.Params;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }
}
