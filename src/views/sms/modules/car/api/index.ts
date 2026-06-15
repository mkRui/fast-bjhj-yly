import { Request } from "mor-request";
import { API } from "../types/api";

function toCarPayload(params: API.Add.Params | Omit<API.Edit.Params, "id">): API.Add.Payload {
  return {
    name: params.name,
    minPassengerNum: params.minPassengerNum,
    maxPassengerNum: params.maxPassengerNum,
  };
}

function toPurposePayload(
  params: API.PurposeAdd.Params | Omit<API.PurposeEdit.Params, "id">
): API.PurposeAdd.Payload {
  return {
    carId: params.carId,
    purpose: params.purpose,
    price: params.price,
  };
}

export class Api extends Request {
  public async getList(): Promise<API.List.Response> {
    return await this.get<API.List.Data[]>("/crms/car/list");
  }

  public async add(params: API.Add.Params): Promise<API.Add.Response> {
    return await this.post<API.Add.Data>("/crms/car/add", toCarPayload(params));
  }

  public async edit(params: API.Edit.Params): Promise<API.Edit.Response> {
    const { id, ...rest } = params;
    return await this.post<API.Edit.Data>("/crms/car/edit", {
      id,
      car: toCarPayload(rest),
    });
  }

  public async del(params: API.Del.Params): Promise<API.Del.Response> {
    return await this.post<API.Del.Data>("/crms/car/del", params);
  }

  public async getPurposeList(params: API.PurposeList.Params): Promise<API.PurposeList.Response> {
    return await this.get<API.PurposeList.Data>("/crms/car/purpose/list", params);
  }

  public async addPurpose(params: API.PurposeAdd.Params): Promise<API.PurposeAdd.Response> {
    return await this.post<API.PurposeAdd.Data>(
      "/crms/car/purpose/add",
      toPurposePayload(params)
    );
  }

  public async editPurpose(params: API.PurposeEdit.Params): Promise<API.PurposeEdit.Response> {
    const { id, ...rest } = params;
    return await this.post<API.PurposeEdit.Data>("/crms/car/purpose/edit", {
      id,
      purpose: toPurposePayload(rest),
    });
  }

  public async delPurpose(params: API.PurposeDel.Params): Promise<API.PurposeDel.Response> {
    return await this.post<API.PurposeDel.Data>("/crms/car/purpose/del", params);
  }
}
