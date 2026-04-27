/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace PeriodSetting {
    export interface Params {
      periodId: number;
    }

    export interface Data {
      id: number;
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
}

