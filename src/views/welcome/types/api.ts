/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace SubmitWork {
    export interface WorkItem {
      subject: string;
      num: number;
    }

    export interface Params {
      date: string;
      year: number;
      month: number;
      workList: WorkItem[];
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
      id: string;
      teacherId: string;
      subject: string;
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

  export namespace LeaveSubmit {
    export interface Params {
      leaveNum: number;
      leaveDate: string;
      leaveStartTime: string;
      leaveEndTime: string;
      leaveType: string;
      leaveReason: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace LeavePage {
    export interface Params {
      current: number;
      size: number;
      checkedFlag?: string;
    }

    export interface RecordItem {
      id: string;
      teacherId: string;
      leaveYear?: number;
      leaveMonth?: number;
      leaveDate: string;
      leaveStartTime: string;
      leaveEndTime: string;
      leaveNum: number;
      leaveType: string;
      leaveReason: string;
      checkedFlag: boolean;
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

  export namespace AssetsCategoryList {
    export interface Item {
      id: string;
      name: string;
      code?: string;
    }

    export type Data = Item[];
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace ConsumablesPage {
    export interface Params {
      categoryId: string;
      keyword?: string;
      current: number;
      size: number;
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

  export namespace ConsumablesApplyPage {
    export interface Params {
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

  export namespace ConsumablesApply {
    export interface Params {
      consumableId: string;
      applyReason: string;
      applyNum: number;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace AssetsPage {
    export interface Params {
      categoryId: string;
      keyword?: string;
      current: number;
      size: number;
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

  export namespace AssetsItemPage {
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
      status?: string;
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

  export namespace AssetsItemApplyPage {
    export interface Params {
      current: number;
      size: number;
    }

    export interface RecordItem {
      id: string;
      categoryId?: string;
      categoryName?: string;
      assetId?: string;
      assetName?: string;
      itemId?: string;
      itemFullCode?: string;
      applyTime?: string;
      applyReason?: string;
      applyUserId?: string;
      applyUserName?: string;
      applyCheckedFlag?: boolean;
      applyCheckedUserId?: string;
      applyCheckedUserName?: string;
      applyCheckedComment?: string;
      dispose?: string;
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

  export namespace AssetsItemApply {
    export interface Params {
      itemId: string;
      applyReason: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace AssetsItemDispose {
    export interface Params {
      applyId: string;
      dispose: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace CarList {
    export interface Item {
      id: string;
      name?: string;
      minPassengerNum?: number;
      maxPassengerNum?: number;
    }

    export type Data = Item[];
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace CarPurposeList {
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

  export namespace CarApply {
    export interface Params {
      carId: string;
      purposeId: string;
      applyReason: string;
      rentalTime: string;
      estimatedReturnTime: string;
      origin: string;
      destination: string;
      passengerNum: number;
      num: number;
      remark?: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace CarApplyPage {
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
      estimatedReturnTime?: string;
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

  export namespace ExhibitionPage {
    export interface Params {
      current?: number;
      size?: number;
    }

    export interface RecordItem {
      id: string;
      teacherId: string;
      year: number;
      month: number;
      date: string;
      name: string;
      location: string;
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

  export namespace ExhibitionAdd {
    export interface Params {
      date: string;
      name: string;
      location: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace ExhibitionEdit {
    export interface Params {
      id: string;
      date: string;
      name: string;
      location: string;
    }

    export interface Payload {
      date: string;
      name: string;
      location: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace ExhibitionDel {
    export interface Params {
      id: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace ExhibitionAttachmentList {
    export interface Params {
      exhibitionId: string;
    }

    export interface Data {
      id: string;
      exhibitionId: string;
      filename: string;
      filepath: string;
      suffix: string;
      type: string;
    }

    export type Response = BaseRequest.Response<Data[]>;
  }

  export namespace ExhibitionAttachmentAdd {
    export interface Params {
      exhibitionId: string;
      dist: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace ExhibitionAttachmentDel {
    export interface Params {
      id: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }
}
