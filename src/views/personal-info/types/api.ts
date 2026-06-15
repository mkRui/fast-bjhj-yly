/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export interface Teacher {
  id: string;
  name: string;
  gender: number;
  ethnicity: string;
  idPhoto: string;
}

export interface TeacherInfo {
  id: string;
  dateOfBirth: Record<string, unknown>;
  idNo: string;
  registeredAddress: string;
  currentResidentialAddress: string;
  politicalStatus: number;
  phone: string;
  emergencyContact: string;
  emergencyContactPhone: string;
  firstDegreeGraduationInstitution: string;
  firstDegreeMajor: string;
  firstDegreeDuration: number;
  firstDegree: number;
  firstDegreeGraduationDate: string;
  highestDegreeGraduationInstitution: string;
  highestDegreeMajor: string;
  highestDegreeDuration: number;
  highestDegree: number;
  highestDegreeGraduationDate: string;
  teachingLicense: boolean;
  teachingLicenseType: number;
  teachingLicenseSubject: string;
  teachingLicenseCertificateNumber: string;
  teachingLicenseIssuingAuthority: string;
  awards: string;
  honors: string;
  trainingExperience: string;
  financialBankAccount: string;
  financialBankName: string;
}

export interface FamilyMember {
  id: string;
  teacherId: string;
  relation: number;
  name: string;
  employer: string;
}

export interface ProfessionalTitle {
  id: string;
  teacherId: string;
  title: string;
  evaluationDate: Record<string, unknown>;
}

export interface TeachingExperience {
  id: string;
  teacherId: string;
  years: number;
  grade: string;
  subject: string;
}

export interface WorkExperience {
  id: string;
  teacherId: string;
  startDate: Record<string, unknown>;
  endDate: Record<string, unknown>;
  employer: string;
  position: string;
  job: string;
}

export interface InfoRes {
  code: number;
  msg: string;
  data: {
    teacher: Teacher | null;
    teacherInfo: TeacherInfo | null;
    familyMemberList: FamilyMember[];
    professionalTitleList: ProfessionalTitle[];
    teachingExperienceList: TeachingExperience[];
    workExperienceList: WorkExperience[];
  };
}

export interface EditFamilyMember {
  relation: number;
  name: string;
  employer: string;
}

export interface EditProfessionalTitle {
  title: string;
  evaluationDate: string;
}

export interface EditTeachingExperience {
  years: number;
  grade: string;
  subject: string;
}

export interface EditWorkExperience {
  employer: string;
  startDate: string;
  endDate: string;
  position: string;
  job: string;
}

export interface EditTeacherInfoBody {
  dateOfBirth: string;
  idNo: string;
  registeredAddress: string;
  currentResidentialAddress: string;
  politicalStatus: number;
  phone: string;
  emergencyContact: string;
  emergencyContactPhone: string;
  firstDegreeGraduationInstitution: string;
  firstDegreeMajor: string;
  firstDegreeDuration: number;
  firstDegree: number;
  firstDegreeGraduationDate: string;
  highestDegreeGraduationInstitution: string;
  highestDegreeMajor: string;
  highestDegreeDuration: number;
  highestDegree: number;
  highestDegreeGraduationDate: string;
  teachingLicense: boolean;
  teachingLicenseType: number;
  teachingLicenseSubject: string;
  teachingLicenseCertificateNumber: string;
  teachingLicenseIssuingAuthority: string;
  awards: string;
  honors: string;
  trainingExperience: string;
  financialBankAccount: string;
  financialBankName: string;
}

export declare namespace API {
  export namespace TeacherInfo {
    export type Data = InfoRes["data"];
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace EditTeacherInfo {
    export interface Params {
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
}

