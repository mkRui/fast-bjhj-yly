/* eslint-disable @typescript-eslint/no-namespace */

import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace RoleResourceList {
    export interface Params {
      roleId: number;
    }

    export interface Data {
      id: number;
      parentId: number;
      name: string;
      code: string;
      type: string;
      outlinkUrl: string;
      outlinkFlag: boolean;
      selected: boolean;
    }

    export interface DataChildren extends Data {
      childrenList: DataChildren[];
    }

    export type Response = BaseRequest.Response<DataChildren[]>;
  }

  export namespace SetRoleResource {
    export interface Params {
      roleId: number;
      resId: number | string;
      act: string;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }
}
