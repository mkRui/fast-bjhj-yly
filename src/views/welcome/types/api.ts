/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace Period {
    export interface Data {
      id: number;
      name: string;
      currentFlag: boolean;
    }

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace SubmitWork {
    export interface Params {
      date: string;
      year: number;
      month: number;
      subject: number;
      num: number;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace WorkStatistics {
    export interface Params {
      year?: number;
      month?: number;
    }

    export interface Data {
      subject: string;
      num: number;
    }

    export type Response = BaseRequest.Response<Data[]>;
  }

  export namespace WorkPage {
    export interface Params {
      year: number;
      month: number;
      current: number;
      size: number;
    }

    export interface RecordItem {
      id: number;
      teacherId: number;
      periodId: number;
      subject: number;
      date: string;
      year: number;
      month: number;
      num: number;
    }

    export interface Data {
      size: number;
      pages: number;
      total: number;
      records: RecordItem[];
      current: number;
    }

    export type Response = BaseRequest.Response<Data>;
  }
}

