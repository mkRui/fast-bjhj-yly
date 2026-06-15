import { Request } from "mor-request";
import { API } from "../types/api";

export class Api extends Request {
  public async getList(): Promise<API.List.Response> {
    return await this.get<API.List.Data[]>("/crms/car/list");
  }

  public async add(params: API.Add.Params): Promise<API.Add.Response> {
    const body: API.Add.RequestBody = {
      car: {
        name: params.name,
        minPassengerNum: params.minPassengerNum,
        maxPassengerNum: params.maxPassengerNum,
      },
    };
    return await this.post<API.Add.Data>("/crms/car/add", body);
  }

  public async edit(params: API.Edit.Params): Promise<API.Edit.Response> {
    const body: API.Edit.RequestBody = {
      id: params.id,
      car: {
        name: params.name,
        minPassengerNum: params.minPassengerNum,
        maxPassengerNum: params.maxPassengerNum,
      },
    };
    return await this.post<API.Edit.Data>("/crms/car/edit", body);
  }

  public async del(params: API.Del.Params): Promise<API.Del.Response> {
    return await this.post<API.Del.Data>("/crms/car/del", params);
  }

  public async getPurposeList(params: API.PurposeList.Params): Promise<API.PurposeList.Response> {
    return await this.get<API.PurposeList.Data>("/crms/car/purpose/list", params);
  }

  public async addPurpose(params: API.PurposeAdd.Params): Promise<API.PurposeAdd.Response> {
    const body: API.PurposeAdd.RequestBody = {
      purpose: {
        carId: params.carId,
        purpose: params.purpose,
        price: params.price,
      },
    };
    return await this.post<API.PurposeAdd.Data>("/crms/car/purpose/add", body);
  }

  public async editPurpose(params: API.PurposeEdit.Params): Promise<API.PurposeEdit.Response> {
    const body: API.PurposeEdit.RequestBody = {
      id: params.id,
      purpose: {
        carId: params.carId,
        purpose: params.purpose,
        price: params.price,
      },
    };
    return await this.post<API.PurposeEdit.Data>("/crms/car/purpose/edit", body);
  }

  public async delPurpose(params: API.PurposeDel.Params): Promise<API.PurposeDel.Response> {
    return await this.post<API.PurposeDel.Data>("/crms/car/purpose/del", params);
  }
}
