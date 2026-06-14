/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace ApplyPage {
    export interface Params {
      current: number;
      size: number;
      carId?: string;
    }

    export interface RecordItem {
      id: string;
      periodId?: string;
      carId?: string;
      carName?: string;
      purposeId?: string;
      purpose?: string;
      reason?: string;
      rentalTime?: string;
      origin?: string;
      destination?: string;
      passengerNum?: number;
      price?: number;
      num?: number;
      amountPrice?: number;
      remark?: string;
      applyUserId?: string;
      applyUserName?: string;
      applyTime?: string;
      checkedUserId?: string;
      checkedUserName?: string;
      checkedTime?: string;
      checkedFlag?: boolean;
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

  export namespace ApplyCheck {
    export interface Params {
      applyId: string;
      checkedFlag: boolean;
      comment: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }
}
