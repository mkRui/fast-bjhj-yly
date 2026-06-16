import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  public async getPage(params: API.Page.Params): Promise<API.Page.Response> {
    return await this.get<API.Page.Data>("/tms/exhibition/page", params);
  }

  public async getAttachmentList(
    params: API.AttachmentList.Params
  ): Promise<API.AttachmentList.Response> {
    return await this.get<API.AttachmentList.Data[]>(
      "/tms/exhibition/attachment/list",
      params
    );
  }

  public async getTeacherList(
    params: API.TeacherList.Params
  ): Promise<API.TeacherList.Response> {
    return await this.get<API.TeacherList.Data>("/tms/teacher/page", params);
  }
}
