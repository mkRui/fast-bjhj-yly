/* eslint-disable @typescript-eslint/no-namespace */

import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace TemplateList {
    export interface Params {
      userId: number;
    }

    export interface TemplateData {
      id: number;
      name: string;
      type: number;
      enableFlag: boolean;
    }

    export interface Data {
      code: number;
      desc: string;
      entityList: TemplateData[];
    }

    export type Response = BaseRequest.Response<Data[]>;
  }
}
