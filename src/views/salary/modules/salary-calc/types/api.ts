/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace Page {
    export interface Params {
      year: number;
      month: number;
      current?: string;
      size?: string;
    }

    export interface RecordItem {
      id: number;
      year: number;
      month: number;
      teacherId: number;
      teacherUserName: string;
      amount: number;
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

  export namespace SubjectList {
    export interface Params {
      year: number;
      month: number;
      teacherId: number;
    }

    export interface Data {
      id: number;
      salaryId: number;
      subject: string;
      amount: number;
    }

    export type Response = BaseRequest.Response<Data[]>;
  }

  export namespace SubjectAdd {
    export interface Params {
      salaryId: number;
      subject: string;
      amount: number;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace SubjectDel {
    export interface Params {
      id: number;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }
}
