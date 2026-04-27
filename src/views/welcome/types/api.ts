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

  export namespace LeavePeriodList {
    export interface Item {
      id: number;
      name: string;
      currentFlag: boolean;
    }

    export type Data = Item[];
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace LeavePeriodSetting {
    export interface Params {
      periodId: number;
    }

    export interface Data {
      id: number;
      leaveMinUnit: number;
      leaveMinNum: number;
      bonusPerUnit: number;
      bonusMaxLimitPerYear: number;
      bonusMaxLimitPerMonth: number;
      salaryMorningReading: number;
      salaryEveningStudy: number;
      salaryClassHour: number;
      salaryOralPractice: number;
      salaryCollegeCounseling: number;
      salaryOvertime: number;
      salaryExhibition: number;
    }

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace LeaveSubmit {
    export interface Params {
      periodId: number;
      leaveNum: number;
      leaveDate: string;
      leaveStartTime: string;
      leaveEndTime: string;
      leaveType: number;
      leaveReason: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace LeavePage {
    export interface Params {
      periodId: number;
      current: number;
      size: number;
    }

    export interface RecordItem {
      id: number;
      teacherId: number;
      periodId: number;
      leaveDate: string;
      leaveStartTime: string;
      leaveEndTime: string;
      leaveNum: number;
      leaveType: number;
      leaveReason: string;
      checkedFlag: boolean;
      checkedUserId?: number;
      checkedUserName?: string;
      checkedComment?: string;
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
