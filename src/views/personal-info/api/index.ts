import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  public async getTeacherInfo(): Promise<API.TeacherInfo.Response> {
    return await this.get<API.TeacherInfo.Data>("/user/teacher/info");
  }

  public async editTeacherInfo(
    params: API.EditTeacherInfo.Params
  ): Promise<API.EditTeacherInfo.Response> {
    return await this.post<API.EditTeacherInfo.Data>("/i/user/teacher/edit", params);
  }
}

