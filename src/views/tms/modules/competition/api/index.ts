import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  public async getPage(params: API.Page.Params): Promise<API.Page.Response> {
    return await this.get<API.Page.Data>("/tms/competition/page", params);
  }

  public async addCompetition(params: API.Add.Params): Promise<API.Add.Response> {
    const { teacherList, ...rest } = params;
    return await this.post<API.Add.Data>("/tms/competition/add", {
      ...rest,
      teacherList: (teacherList || []).map((item) => Number(item)),
    });
  }

  public async editCompetition(params: API.Edit.Params): Promise<API.Edit.Response> {
    const { id, date, name, location, teacherList, studentList } = params;
    return await this.post<API.Edit.Data>("/tms/competition/edit", {
      id,
      competition: {
        date,
        name,
        location,
        teacherList: (teacherList || []).map((item) => Number(item)),
        studentList: studentList || [],
      },
    });
  }

  public async delCompetition(params: API.Del.Params): Promise<API.Del.Response> {
    return await this.post<API.Del.Data>("/tms/competition/del", params);
  }

  public async searchTeacherList(
    params: API.TeacherList.Params
  ): Promise<API.TeacherList.Response> {
    return await this.get<API.TeacherList.Data>("/tms/competition/teacher/list", params);
  }

  public async getCompetitionTeachers(
    params: API.CompetitionTeacher.Params
  ): Promise<API.CompetitionTeacher.Response> {
    return await this.get<API.CompetitionTeacher.Data>("/tms/competition/teacher", params);
  }

  public async getCompetitionStudents(
    params: API.CompetitionStudent.Params
  ): Promise<API.CompetitionStudent.Response> {
    return await this.get<API.CompetitionStudent.Data[]>(
      "/tms/competition/student",
      params
    );
  }

  public async getAttachmentList(
    params: API.AttachmentList.Params
  ): Promise<API.AttachmentList.Response> {
    return await this.get<API.AttachmentList.Data[]>(
      "/tms/competition/attachment/list",
      params
    );
  }

  public async addAttachment(
    params: API.AttachmentAdd.Params
  ): Promise<API.AttachmentAdd.Response> {
    return await this.post<API.AttachmentAdd.Data>("/tms/competition/attachment/add", params);
  }

  public async delAttachment(
    params: API.AttachmentDel.Params
  ): Promise<API.AttachmentDel.Response> {
    return await this.post<API.AttachmentDel.Data>("/tms/competition/attachment/del", params);
  }
}
