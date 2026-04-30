/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace Page {
    export interface Params {
      categoryId?: string;
      current: number;
      size: number;
      keyword?: string;
    }

    export interface RecordItem {
      id: string;
      categoryId?: string;
      categoryName?: string;
      name?: string;
      remark?: string;
      selfCode?: string;
      stockNum?: number;
    }

    export interface Data {
      size: number;
      pages: number;
      total: number;
      records: RecordItem[];
      current: number;
    }

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace Add {
    export interface Params {
      assetsDTO: {
        categoryId: string;
        name: string;
        remark?: string;
        selfCode?: string;
      };
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace Del {
    export interface Params {
      id: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace Edit {
    export interface Params {
      id: string;
      assets: {
        categoryId: string;
        name: string;
        remark?: string;
        selfCode?: string;
      };
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace StockIn {
    export interface Params {
      assetsId: string;
      num: number;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }
}

