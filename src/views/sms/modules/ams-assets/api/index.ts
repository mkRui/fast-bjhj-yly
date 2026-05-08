import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  public async getPage(params: API.Page.Params): Promise<API.Page.Response> {
    return await this.get<API.Page.Data>("/ams/assets/page", params);
  }

  public async getItemPage(params: API.ItemPage.Params): Promise<API.ItemPage.Response> {
    return await this.get<API.ItemPage.Data>("/ams/assets/item/page", params);
  }

  public async getItemApplyPage(params: API.ItemApplyPage.Params): Promise<API.ItemApplyPage.Response> {
    return await this.get<API.ItemApplyPage.Data>("/ams/assets/item/apply/page", params);
  }

  public async add(params: API.Add.Params): Promise<API.Add.Response> {
    return await this.post<API.Add.Data>("/ams/assets/add", params);
  }

  public async del(params: API.Del.Params): Promise<API.Del.Response> {
    return await this.post<API.Del.Data>("/ams/assets/del", params);
  }

  public async edit(params: API.Edit.Params): Promise<API.Edit.Response> {
    return await this.post<API.Edit.Data>("/ams/assets/edit", params);
  }

  public async stockIn(params: API.StockIn.Params): Promise<API.StockIn.Response> {
    return await this.post<API.StockIn.Data>("/ams/assets/stockIn", params);
  }

  public async applyCheck(params: API.ApplyCheck.Params): Promise<API.ApplyCheck.Response> {
    return await this.post<API.ApplyCheck.Data>("/ams/assets/apply/check", params);
  }

  public async disposeCheck(params: API.DisposeCheck.Params): Promise<API.DisposeCheck.Response> {
    return await this.post<API.DisposeCheck.Data>("/ams/assets/dispose/check", params);
  }
}
