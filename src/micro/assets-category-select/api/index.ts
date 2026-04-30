import { Request } from "mor-request";
import { API } from "../types";

export class Api extends Request {
  public async getList(): Promise<API.CategoryList.Response> {
    return await this.get<API.CategoryList.Data>("/ams/assets/category/list");
  }
}

