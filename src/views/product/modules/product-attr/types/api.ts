/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace List {
    export interface Params {
      productId?: number | string;
    }

    export interface Data {
      id: number;
      productId: number;
      attr: string;
      type: string;
      value: string;
      sort: number;
    }

    export type Response = BaseRequest.Response<Data[]>;
  }

  export namespace AddItem {
    export interface Params {
      productId: number | string;
      attr: string;
      type: string;
      value: string[];
      sort: number;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace EditItem {
    export interface Params {
      id: number;
      productAttr: API.AddItem.Params;
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
