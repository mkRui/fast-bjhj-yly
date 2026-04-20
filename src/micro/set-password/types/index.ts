/* eslint-disable @typescript-eslint/no-namespace */

import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace ChangePassword {
    export interface Params {
      newPassword: string;
      oldPassword: string;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }
}
