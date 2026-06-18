/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace List {
    export interface Params {
      readFlag: boolean;
    }

    export interface RecordItem {
      id: string;
      alertTime?: string;
      title?: string;
      content?: string;
      target?: string;
      targetId?: string;
    }

    export type Data = RecordItem[];
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
