/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace ApplyPage {
    export interface Params {
      applyCheckedFlag?: string;
      current: number;
      size: number;
    }

    export interface RecordItem {
      id: string;
      categoryId?: string;
      categoryName?: string;
      consumableId?: string;
      consumableName?: string;
      applyNum?: number;
      applyTime?: string;
      applyReason?: string;
      applyUserId?: string;
      applyUserName?: string;
      applyCheckedFlag?: boolean;
      applyCheckedUserId?: string;
      applyCheckedUserName?: string;
      applyCheckedComment?: string;
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
