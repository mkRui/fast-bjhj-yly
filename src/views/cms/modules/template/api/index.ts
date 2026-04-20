import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  // 获取用户列表
  public async getTemplateList(
    params?: API.Template.Params
  ): Promise<API.Template.Response> {
    return await this.get<API.Template.Data[]>(
      "/cms/mgmt/template/list",
      params
    );
  }

  // 新增模版
  public async addTemplate(
    params: API.AddTemplate.Params
  ): Promise<API.AddTemplate.Response> {
    return await this.post<API.AddTemplate.Data>(
      "/cms/mgmt/template/add",
      params
    );
  }

  // 删除模版
  public async delTemplate(
    params: API.DelTemplate.Params
  ): Promise<API.DelTemplate.Response> {
    return await this.post<API.DelTemplate.Data>(
      "/cms/mgmt/template/delete",
      params
    );
  }

  // 编辑模版
  public async setTemplate(
    params: API.SetTemplate.Params
  ): Promise<API.SetTemplate.Response> {
    return await this.post<API.SetTemplate.Data>(
      "/cms/mgmt/template/edit",
      params
    );
  }

  // 获取模版信息
  public async getTemplate(
    params: API.GetTemplateInfo.Params
  ): Promise<API.GetTemplateInfo.Response> {
    return await this.get<API.GetTemplateInfo.Data>(
      "/cms/mgmt/template/info",
      params
    );
  }

  // 编辑模版内容
  public async setTemplateContent(
    params: API.SetTemplateContent.Params
  ): Promise<API.SetTemplateContent.Response> {
    return await this.post<API.SetTemplateContent.Data>(
      "/cms/mgmt/template/content/edit",
      params
    );
  }
}
