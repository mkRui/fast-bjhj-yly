/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace PeriodList {
    export interface Data {
      id: number;
      name: string;
      currentFlag: boolean;
    }

    export type Response = BaseRequest.Response<Data[]>;
  }
}

