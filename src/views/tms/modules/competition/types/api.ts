/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";
import type { Teacher } from "@/views/personal-info/types/api";

export declare namespace API {
  export namespace Page {
    export interface Params {
      current?: string;
      size?: string;
    }

    export interface RecordItem {
      id: string;
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

  export namespace Add {
    export interface Params {
      date: string;
      name: string;
      location: string;
      teacherList?: string[];
      studentList?: string[];
      distList?: string[];
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace Edit {
    export interface Params {
      id: string;
      date: string;
      name: string;
      location: string;
      teacherList?: string[];
      studentList?: string[];
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

  export namespace TeacherList {
    export interface Params {
      keyword: string;
    }

    export type Data = Teacher[];
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace CompetitionTeacher {
    export interface Params {
      competitionId: string;
    }

    export type Data = Teacher[];
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace CompetitionStudent {
    export interface Params {
      competitionId: string;
    }

    export interface Data {
      id: string;
      competitionId: string;
      studentName: string;
    }

    export type Response = BaseRequest.Response<Data[]>;
  }

  export namespace AttachmentList {
    export interface Params {
      competitionId: string;
    }

    export interface Data {
      id: string;
      competitionId: string;
      filename: string;
      filepath: string;
      suffix: string;
    }

    export type Response = BaseRequest.Response<Data[]>;
  }

  export namespace AttachmentAdd {
    export interface Params {
      competitionId: string;
      dist: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace AttachmentDel {
    export interface Params {
      id: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }
}
