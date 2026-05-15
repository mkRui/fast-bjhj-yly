import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  public async getPeriod(): Promise<API.Period.Response> {
    return await this.get<API.Period.Data>("/user/submit/period");
  }

  public async submitWork(params: API.SubmitWork.Params): Promise<API.SubmitWork.Response> {
    return await this.post<API.SubmitWork.Data>("/user/submit/work", params);
  }

  public async getWorkStatistics(
    params?: API.WorkStatistics.Params
  ): Promise<API.WorkStatistics.Response> {
    return await this.get<API.WorkStatistics.Data[]>("/user/submit/work/statistics", params);
  }

  public async getWorkPage(params: API.WorkPage.Params): Promise<API.WorkPage.Response> {
    return await this.get<API.WorkPage.Data>("/user/submit/work/page", params);
  }

  public async getLeavePeriodList(): Promise<API.LeavePeriodList.Response> {
    return await this.get<API.LeavePeriodList.Data>("/user/leave/period/List");
  }

  public async getLeavePeriodSetting(
    params: API.LeavePeriodSetting.Params
  ): Promise<API.LeavePeriodSetting.Response> {
    return await this.get<API.LeavePeriodSetting.Data>("/user/leave/period/setting", params);
  }

  public async submitLeave(params: API.LeaveSubmit.Params): Promise<API.LeaveSubmit.Response> {
    return await this.post<API.LeaveSubmit.Data>("/user/leave/submit", params);
  }

  public async getLeavePage(params: API.LeavePage.Params): Promise<API.LeavePage.Response> {
    return await this.get<API.LeavePage.Data>("/user/leave/page", params);
  }

  public async getAssetsCategoryList(): Promise<API.AssetsCategoryList.Response> {
    return await this.get<API.AssetsCategoryList.Data>("/user/assets/category/list");
  }

  public async getConsumablesPage(params: API.ConsumablesPage.Params): Promise<API.ConsumablesPage.Response> {
    return await this.get<API.ConsumablesPage.Data>("/user/assets/consumables/page", params);
  }

  public async getConsumablesApplyPage(
    params: API.ConsumablesApplyPage.Params
  ): Promise<API.ConsumablesApplyPage.Response> {
    return await this.get<API.ConsumablesApplyPage.Data>("/user/assets/consumables/apply/page", params);
  }

  public async applyConsumables(params: API.ConsumablesApply.Params): Promise<API.ConsumablesApply.Response> {
    return await this.post<API.ConsumablesApply.Data>("/user/assets/consumables/apply", params);
  }

  public async getAssetsPage(params: API.AssetsPage.Params): Promise<API.AssetsPage.Response> {
    return await this.get<API.AssetsPage.Data>("/user/assets/assets/page", params);
  }

  public async getAssetsItemPage(params: API.AssetsItemPage.Params): Promise<API.AssetsItemPage.Response> {
    return await this.get<API.AssetsItemPage.Data>("/user/assets/assets/item/page", params);
  }

  public async getAssetsItemApplyPage(
    params: API.AssetsItemApplyPage.Params
  ): Promise<API.AssetsItemApplyPage.Response> {
    return await this.get<API.AssetsItemApplyPage.Data>("/user/assets/assets/item/apply/page", params);
  }

  public async applyAssetsItem(params: API.AssetsItemApply.Params): Promise<API.AssetsItemApply.Response> {
    return await this.post<API.AssetsItemApply.Data>("/user/assets/assets/item/apply", params);
  }

  public async disposeAssetsItem(params: API.AssetsItemDispose.Params): Promise<API.AssetsItemDispose.Response> {
    return await this.post<API.AssetsItemDispose.Data>("/user/assets/assets/item/dispose", params);
  }

  public async getCarList(): Promise<API.CarList.Response> {
    return await this.get<API.CarList.Data>("/user/car/list");
  }

  public async getCarPurposeList(params: API.CarPurposeList.Params): Promise<API.CarPurposeList.Response> {
    return await this.get<API.CarPurposeList.Data>("/user/car/purpose/list", params);
  }

  public async applyCar(params: API.CarApply.Params): Promise<API.CarApply.Response> {
    return await this.post<API.CarApply.Data>("/user/car/apply", params);
  }

  public async getCarApplyPage(params: API.CarApplyPage.Params): Promise<API.CarApplyPage.Response> {
    return await this.get<API.CarApplyPage.Data>("/user/car/apply/page", params);
  }
}
