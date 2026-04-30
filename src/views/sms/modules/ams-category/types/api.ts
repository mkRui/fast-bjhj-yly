/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace Page {
    export interface Params {
      current: number;
      size: number;
      keyword?: string;
    }

    export interface RecordItem {
      id: string;
      name: string;
      code: string;
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
      name: string;
      code: string;
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
      category: {
        name: string;
        code: string;
      };
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }
}

