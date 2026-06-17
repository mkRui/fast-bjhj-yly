/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace ApplyPage {
    export interface Params {
      checkedFlag?: string;
      current: number;
      size: number;
    }

    export interface RecordItem {
      id: string;
      consumableId?: string;
      consumablesName?: string;
      applyNum?: number;
      applyTime?: string;
      applyReason?: string;
      applyUserId?: string;
      applyUserName?: string;
      checkedFlag?: boolean;
      checkedUserId?: string;
      checkedUserName?: string;
      checkedComment?: string;
      applyCheckedFlag?: boolean;
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

  export namespace ApplyCheck {
    export interface Params {
      applyId: string;
      checkedFlag: boolean;
      comment?: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }
}
