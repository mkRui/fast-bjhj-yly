/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";
import type { Teacher } from "@/views/personal-info/types/api";

export declare namespace API {
  export namespace StatisticsPage {
    export interface Params {
      year: number;
      month: number;
      keyword?: string;
      current: number;
      size: number;
    }

    export interface RecordItem {
      teacher: Teacher;
      morningReadNum?: number;
      eveningStudyNum?: number;
      classHour?: number;
      oralPracticeNum?: number;
      collegeCounselingNum?: number;
      overtimeNum?: number;
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

  export namespace WorkEdit {
    export interface Params {
      id: string;
      num: number;
      remark?: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace WorkDel {
    export interface Params {
      id: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace WorkPage {
    export interface Params {
      selectedTeacherId: string;
      year: number;
      month: number;
      current: number;
      size: number;
    }

    export interface RecordItem {
      id: string;
      teacherId: string;
      subject: string;
      date: string;
      year: number;
      month: number;
      num: number;
      remark?: string;
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
