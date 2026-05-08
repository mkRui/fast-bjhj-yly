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
      name?: string;
      remark?: string;
      selfCode?: string;
      fullCode?: string;
      totalNum?: number;
      availableNum?: number;
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
      consumablesDTO: {
        categoryId: string;
        name: string;
        remark?: string;
        selfCode?: string;
      };
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace Edit {
    export interface Params {
      id: string;
      consumables: {
        categoryId: string;
        name: string;
        remark?: string;
        selfCode?: string;
      };
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

  export namespace StockIn {
    export interface Params {
      consumablesId: string;
      num: number;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace ApplyPage {
    export interface Params {
      consumablesId: string;
      current: number;
      size: number;
    }

    export interface RecordItem {
      id: string;
      consumablesId?: string;
      applyTime?: string;
      applyReason?: string;
      applyUserId?: string;
      applyUserName?: string;
      checkedFlag?: boolean;
      checkedUserId?: string;
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

