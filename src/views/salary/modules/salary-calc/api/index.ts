import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  public async getPage(params: API.Page.Params): Promise<API.Page.Response> {
    return await this.get<API.Page.Data>("/sms/salary/page", params);
  }

  public async getSubjectList(
    params: API.SubjectList.Params
  ): Promise<API.SubjectList.Response> {
    return await this.get<API.SubjectList.Data[]>("/sms/salary/subject/list", params);
  }

  public async addSubject(params: API.SubjectAdd.Params): Promise<API.SubjectAdd.Response> {
    return await this.post<API.SubjectAdd.Data>("/sms/salary/subject/add", params);
  }

  public async delSubject(params: API.SubjectDel.Params): Promise<API.SubjectDel.Response> {
    return await this.post<API.SubjectDel.Data>("/sms/salary/subject/del", params);
  }

  public async calculate(params: API.Calculate.Params): Promise<API.Calculate.Response> {
    return await this.post<API.Calculate.Data>("/sms/salary/calculate", params);
  }
}
