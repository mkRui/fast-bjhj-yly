/* eslint-disable @typescript-eslint/no-namespace */

import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace RoleList {
    export interface Data {
      id: number;
      nickname: string;
    }

    export type Response = BaseRequest.Response<Data[]>;
  }
}
