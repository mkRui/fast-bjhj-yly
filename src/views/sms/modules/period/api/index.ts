import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  public async getPage(params: API.Page.Params): Promise<API.Page.Response> {
    return await this.get<API.Page.Data>("/sms/period/page", params);
  }

  public async del(params: API.Del.Params): Promise<API.Del.Response> {
    return await this.post<API.Del.Data>("/sms/period/del", params);
  }

  public async add(params: API.Add.Params): Promise<API.Add.Response> {
    return await this.post<API.Add.Data>("/sms/period/add", params);
  }

  public async settingEdit(params: API.SettingEdit.Params): Promise<API.SettingEdit.Response> {
    return await this.post<API.SettingEdit.Data>("/sms/period/setting/edit", params);
  }
}

