/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace ApplyPage {
    export interface Params {
      current: number;
      size: number;
      itemId?: string;
      applyCheckedFlag?: string;
      disposeCheckedFlag?: string;
    }

    export interface RecordItem {
      id: string;
      categoryId?: string;
      categoryName?: string;
      assetId?: string;
      assetName?: string;
      itemId?: string;
      fullCode?: string;
      applyTime?: string;
      applyReason?: string;
      applyUserId?: string;
      applyUserName?: string;
      applyCheckedFlag?: boolean;
      applyCheckedUserId?: string;
      applyCheckedUserName?: string;
      applyCheckedComment?: string;
      disposeType?: number;
      dispose?: number;
      disposeCheckedFlag?: boolean;
      disposeCheckedUserId?: string;
      disposeCheckedUserName?: string;
      disposeCheckedComment?: string;
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

  export namespace DisposeCheck {
    export interface Params {
      applyId: string;
      checkedFlag: boolean;
      comment?: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }
}
