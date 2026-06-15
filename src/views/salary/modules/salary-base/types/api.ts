/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace Teacher {
    export interface Data {
      id: string;
      name: string;
      gender: number;
      ethnicity: string;
      idPhoto: string;
    }
  }

  export namespace SalaryBase {
    export interface Data {
      id: string;
      salaryBase: number;
      salaryPosition: number;
      salaryBonus: number;
      salarySeniority: number;
      salaryHousing: number;
      salaryTransportation: number;
      salaryCrossing: number;
    }
  }

  export namespace Page {
    export interface Params {
      current?: string;
      size?: string;
    }

    export interface RecordItem {
      teacher: Teacher.Data;
      salaryBase: SalaryBase.Data;
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

  export namespace Edit {
    export interface Params {
      id: string;
      salaryBase: number;
      salaryPosition: number;
      salaryBonus: number;
      salarySeniority: number;
      salaryHousing: number;
      salaryTransportation: number;
      salaryCrossing: number;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }
}
