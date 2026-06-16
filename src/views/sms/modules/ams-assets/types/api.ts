/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace Page {
    export interface Params {
      categoryId?: string;
      current: number;
      size: number;
      keyword?: string;
    }

    export interface RecordItem {
      id: string;
      categoryId?: string;
      categoryName?: string;
      name?: string;
      remark?: string;
      selfCode?: string;
      stockNum?: number;
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

  export namespace Add {
    export interface Params {
      categoryId: string;
      name: string;
      remark?: string;
      selfCode?: string;
    }

    export interface Payload {
      categoryId: string;
      name: string;
      remark?: string;
      selfCode?: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace Del {
    export interface Params {
      id: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace Edit {
    export interface Params {
      id: string;
      categoryId: string;
      name: string;
      remark?: string;
      selfCode?: string;
    }

    export interface Payload {
      categoryId: string;
      name: string;
      remark?: string;
      selfCode?: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace StockIn {
    export interface Params {
      assetId: string;
      num: number;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace ItemPage {
    export interface Params {
      assetId: string;
      keyword?: string;
      current: number;
      size: number;
    }

    export interface RecordItem {
      id: string;
      categoryId?: string;
      categoryName?: string;
      assetId?: string;
      assetName?: string;
      fullCode?: string;
      status?: number;
      remark?: string;
      stockInTime?: string;
      currentApplyId?: string;
      lastApplyId?: string;
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

  export namespace ItemApplyPage {
    export interface Params {
      itemId?: string;
      current: number;
      size: number;
    }

    export interface RecordItem {
      id: string;
      categoryId?: string;
      assetId?: string;
      itemId?: string;
      applyTime?: string;
      applyReason?: string;
      applyUserId?: string;
      applyUserName?: string;
      applyCheckedFlag?: boolean;
      applyCheckedUserId?: string;
      applyCheckedUserName?: string;
      applyCheckedComment?: string;
      disposeType?: number;
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
