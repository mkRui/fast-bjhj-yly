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

  export namespace Page {
    export interface Params {
      periodId?: string;
      checkedFlag?: string;
      current?: string;
      size?: string;
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
      checkedFlag: boolean | null;
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

  export namespace Check {
    export interface Params {
      id: number;
      checkedFlag: boolean;
      checkedComment?: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }
}
