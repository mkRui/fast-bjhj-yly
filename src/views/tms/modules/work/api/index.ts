import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  public async getTeacherList(
    params: API.TeacherList.Params
  ): Promise<API.TeacherList.Response> {
    return await this.get<API.TeacherList.Data>("/tms/work/teacher/list", params);
  }

  public async getWorkPage(params: API.WorkPage.Params): Promise<API.WorkPage.Response> {
    return await this.get<API.WorkPage.Data>("/tms/work/teacher/page", params);
  }
}

