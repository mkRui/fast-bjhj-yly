/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace List {
    export interface Data {
      id: string;
      name?: string;
      minPassengerNum?: number;
      maxPassengerNum?: number;
    }

    export type Response = BaseRequest.Response<Data[]>;
  }

  export namespace Add {
    export interface Params {
      name: string;
      minPassengerNum: number;
      maxPassengerNum: number;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace Edit {
    export interface Params {
      id: string;
      name: string;
      minPassengerNum: number;
      maxPassengerNum: number;
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

  export namespace PurposeList {
    export interface Params {
      carId: string;
    }

    export interface Item {
      id: string;
      carId?: string;
      purpose?: string;
      price?: number;
    }

    export type Data = Item[];
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace PurposeAdd {
    export interface Params {
      carId: string;
      purpose: string;
      price: number;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace PurposeEdit {
    export interface Params {
      id: string;
      carId: string;
      purpose: string;
      price: number;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace PurposeDel {
    export interface Params {
      id: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

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
