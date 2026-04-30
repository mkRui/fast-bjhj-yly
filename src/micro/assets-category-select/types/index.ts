/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace CategoryList {
    export interface Item {
      id: string;
      name: string;
      code: string;
    }

    export type Data = Item[];
    export type Response = BaseRequest.Response<Data>;
  }
}

