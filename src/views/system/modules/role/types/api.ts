/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace List {
    export interface Params {
      keyword?: string;
    }

    export interface Data {
      id: string;
      name: string;
      code: string;
    }

    export type Response = BaseRequest.Response<Data[]>;
  }

  export namespace DelRole {
    export interface Params {
      id: string;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace AddRole {
    export interface Params {
      name: string;
      code: string;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace SetRole {
    export interface Params extends API.AddRole.Params {
      roleId: string;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }
}
