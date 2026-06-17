/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace Page {
    export interface Params {
      state?: string;
      current?: string;
      size?: string;
    }

    export interface RecordItem {
      id: string;
      title: string;
      content: string;
      type: string;
      state: number;
      createTime: string;
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

  export namespace Read {
    export interface Params {
      id: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace UnreadCount {
    export type Data = number;
    export type Response = BaseRequest.Response<Data>;
  }
}
