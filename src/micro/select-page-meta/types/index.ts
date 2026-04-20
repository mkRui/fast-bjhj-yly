/* eslint-disable @typescript-eslint/no-namespace */

import { BaseRequest } from "mor-request";

export declare namespace API {
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
