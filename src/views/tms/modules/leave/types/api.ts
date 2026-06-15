/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace Page {
    export interface Params {
      checkedFlag?: string;
      current?: string;
      size?: string;
    }

    export interface RecordItem {
      id: number;
      teacherId: number;
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
