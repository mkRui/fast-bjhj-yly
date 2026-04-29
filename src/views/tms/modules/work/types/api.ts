/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";
import type { Teacher } from "@/views/personal-info/types/api";

export declare namespace API {
  export namespace TeacherList {
    export interface Params {
      keyword?: string;
      current: number;
      size: number;
    }

    export interface Data {
      size: number;
      pages: number;
      total: number;
      records: Teacher[];
      current: number;
    }

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace WorkPage {
    export interface Params {
      teacherId: string;
      keyword?: string;
      year?: number;
      month?: number;
      current: number;
      size: number;
    }

    export interface RecordItem {
      id: string;
      teacherId: string;
      periodId: string;
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

