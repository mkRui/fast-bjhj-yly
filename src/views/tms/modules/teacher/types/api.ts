/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";
import type {
  Teacher,
  TeacherInfo,
  FamilyMember,
  ProfessionalTitle,
  TeachingExperience,
  WorkExperience,
  EditFamilyMember,
  EditProfessionalTitle,
  EditTeachingExperience,
  EditWorkExperience,
  EditTeacherInfoBody,
} from "@/views/personal-info/types/api";

export declare namespace API {
  export namespace List {
    export interface Params {
      keyword?: string;
      current: number;
      size: number;
    }

    export interface Data {
      size: number;
      pages: number;
      total: number;
      records: Teacher[];
      current: number;
    }

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace Info {
    export interface Params {
      id: number;
    }

    export interface Data {
      teacher: Teacher;
      teacherInfo: TeacherInfo;
      familyMemberList: FamilyMember[];
      professionalTitleList: ProfessionalTitle[];
      teachingExperienceList: TeachingExperience[];
      workExperienceList: WorkExperience[];
    }

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace Edit {
    export interface Params {
      id: number;
      teacher: Omit<Teacher, "id">;
      teacherInfo: EditTeacherInfoBody;
      familyMember: EditFamilyMember[];
      professionalTitle: EditProfessionalTitle[];
      teachingExperience: EditTeachingExperience[];
      workExperience: EditWorkExperience[];
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace Del {
    export interface Params {
      id: number;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }
}

