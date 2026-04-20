/* eslint-disable @typescript-eslint/no-namespace */

import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace CategoryList {
    export interface Data {
      id: number;
      name: string;
      sname: string;
    }
    export type Response = BaseRequest.Response<Data[]>;
  }
}
