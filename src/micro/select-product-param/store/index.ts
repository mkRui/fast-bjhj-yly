/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { AxiosInstance } from "axios";
import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import Api from "../api";
import { API } from "../types";

export class ProductParamListStore extends Store<Api> {
  public data: API.ParamList.Data[] = [];

  constructor(axios: AxiosInstance) {
    super(new Api(axios));
    makeObservable(this, {
      data: observable,
      $setData: action,
    });
  }

  public $setData(data: API.ParamList.Data[]): void {
    this.data = data;
  }

  public async getData(params?: API.ParamList.Params): Promise<void> {
    const [, data] = await this.api.getParamList(params);
    if (data) this.$setData(data);
  }
}

const ProductParamListContext = createContext<ProductParamListStore>(
  {} as ProductParamListStore
);

export default ProductParamListContext;
