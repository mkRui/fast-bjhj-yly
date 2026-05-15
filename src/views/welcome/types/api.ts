/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace Period {
    export interface Data {
      id: number;
      name: string;
      currentFlag: boolean;
    }

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace SubmitWork {
    export interface Params {
      date: string;
      year: number;
      month: number;
      subject: number;
      num: number;
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
      periodId: string;
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

  export namespace LeavePeriodList {
    export interface Item {
      id: string;
      name: string;
      currentFlag: boolean;
    }

    export type Data = Item[];
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace LeavePeriodSetting {
    export interface Params {
      periodId: string;
    }

    export interface Data {
      id: string;
      leaveMinUnit: number;
      leaveMinNum: number;
      bonusPerUnit: number;
      bonusMaxLimitPerYear: number;
      bonusMaxLimitPerMonth: number;
      salaryMorningReading: number;
      salaryEveningStudy: number;
      salaryClassHour: number;
      salaryOralPractice: number;
      salaryCollegeCounseling: number;
      salaryOvertime: number;
      salaryExhibition: number;
    }

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace LeaveSubmit {
    export interface Params {
      periodId: string;
      leaveNum: number;
      leaveDate: string;
      leaveStartTime: string;
      leaveEndTime: string;
      leaveType: number;
      leaveReason: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace LeavePage {
    export interface Params {
      periodId: string;
      current: number;
      size: number;
    }

    export interface RecordItem {
      id: string;
      teacherId: string;
      periodId: string;
      leaveDate: string;
      leaveStartTime: string;
      leaveEndTime: string;
      leaveNum: number;
      leaveType: number;
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
      consumablesId: string;
      current: number;
      size: number;
    }

    export interface RecordItem {
      id: string;
      categoryId?: string;
      consumablesId?: string;
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
      consumablesId: string;
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

  export namespace AssetsItemApplyPage {
    export interface Params {
      itemId: string;
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
      dispose: number;
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
}
