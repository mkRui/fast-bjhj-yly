/* eslint-disable @typescript-eslint/no-namespace */

import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace UserRoleList {
    export interface Params {
      userId: number;
    }

    export interface Data {
      id: number;
      userId: number;
      roleId: number;
    }

    export type Response = BaseRequest.Response<Data[]>;
  }

  export namespace RoleList {
    export interface Data {
      id: number;
      name: string;
      code: string;
    }

    export type Response = BaseRequest.Response<Data[]>;
  }
}
