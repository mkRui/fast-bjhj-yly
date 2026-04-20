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
      data: any;
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
      parentId?: string | null;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace SetRes {
    export interface Params {
      id: string;
      channel: API.AddRes.Params;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace GetRes {
    export interface Params {
      channelId: string;
      language?: string;
    }

    export interface Data {
      id: number;
      templateId: number;
      name: string;
      keyName: string;
      type: number;
      requiredFlag: boolean;
    }

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace MetaList {
    export interface Params {
      templateId: string;
    }

    export interface Data {
      id: number;
      templateId: number;
      name: string;
      keyName: string;
      type: number;
      requiredFlag: boolean;
    }

    export type Response = BaseRequest.Response<Data[]>;
  }
}
