import { Request } from "mor-request";
import { API } from "../types/api";

function toConsumablesPayload(
  params: API.Add.Params | Omit<API.Edit.Params, "id">
): API.Add.Payload {
  return {
    categoryId: params.categoryId,
    name: params.name,
    remark: params.remark,
    selfCode: params.selfCode,
  };
}

export class Api extends Request {
  public async getPage(params: API.Page.Params): Promise<API.Page.Response> {
    return await this.get<API.Page.Data>("/ams/consumables/page", params);
  }

  public async add(params: API.Add.Params): Promise<API.Add.Response> {
    return await this.post<API.Add.Data>("/ams/consumables/add", toConsumablesPayload(params));
  }

  public async edit(params: API.Edit.Params): Promise<API.Edit.Response> {
    const { id, ...rest } = params;
    return await this.post<API.Edit.Data>("/ams/consumables/edit", {
      id,
      consumables: toConsumablesPayload(rest),
    });
  }

  public async del(params: API.Del.Params): Promise<API.Del.Response> {
    return await this.post<API.Del.Data>("/ams/consumables/del", params);
  }

  public async stockIn(params: API.StockIn.Params): Promise<API.StockIn.Response> {
    return await this.post<API.StockIn.Data>("/ams/consumables/stockIn", params);
  }

  public async getApplyPage(params: API.ApplyPage.Params): Promise<API.ApplyPage.Response> {
    return await this.get<API.ApplyPage.Data>("/ams/consumables/apply/page", params);
  }

  public async applyCheck(params: API.ApplyCheck.Params): Promise<API.ApplyCheck.Response> {
    return await this.post<API.ApplyCheck.Data>("/ams/consumables/apply/check", params);
  }
}

