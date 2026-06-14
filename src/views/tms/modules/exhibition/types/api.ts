/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace Page {
    export interface Params {
      current?: string;
      size?: string;
    }

    export interface RecordItem {
      id: number;
      teacherId: number;
      year: number;
      month: number;
      date: string;
      name: string;
      location: string;
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

  export namespace AttachmentList {
    export interface Params {
      exhibitionId: number;
    }

    export interface Data {
      id: number;
      exhibitionId: number;
      filename: string;
      suffix: string;
      type: number;
    }

    export type Response = BaseRequest.Response<Data[]>;
  }

  export namespace TeacherList {
    export interface Params {
      current?: number;
      size?: number;
      keyword?: string;
    }

    export interface RecordItem {
      id: number;
      name: string;
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
