/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export interface SmsPeriodEntity {
  id: string;
  name: string;
  currentFlag?: boolean;
}

export interface SmsPeriodSettingEntity {
  id: string;
  leaveMinUnit?: number;
  leaveMinNum?: number;
  leaveMaxNum?: number;
  bonusPerUnit?: number;
  bonusMaxLimitPerYear?: number;
  bonusMaxLimitPerMonth?: number;
  salaryMorningReading?: number;
  salaryEveningStudy?: number;
  salaryClassHour?: number;
  salaryChalkbox?: number;
  salaryOralPractice?: number;
  salaryCollegeCounseling?: number;
  salaryOvertime?: number;
  salaryExhibition?: number;
}

export declare namespace API {
  export namespace Page {
    export interface Params {
      current: number;
      size: number;
    }

    export interface Data {
      size: number;
      pages: number;
      total: number;
      records: SmsPeriodEntity[];
      current: number;
    }

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace Del {
    export interface Params {
      id: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace Add {
    export interface Params {
      name: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace Setting {
    export interface Params {
      periodId: string;
    }

    export type Data = SmsPeriodSettingEntity;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace SettingEdit {
    export interface Params {
      id: string;
      leaveMinUnit: number;
      leaveMinNum: number;
      leaveMaxNum: number;
      bonusPerUnit?: number;
      bonusMaxLimitPerYear?: number;
      bonusMaxLimitPerMonth?: number;
      salaryMorningReading?: number;
      salaryEveningStudy?: number;
      salaryClassHour?: number;
      salaryChalkbox?: number;
      salaryOralPractice?: number;
      salaryCollegeCounseling?: number;
      salaryOvertime?: number;
      salaryExhibition?: number;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }
}
