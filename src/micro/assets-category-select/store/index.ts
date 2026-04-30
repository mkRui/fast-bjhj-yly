/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { AxiosInstance } from "axios";
import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import { Api } from "../api";
import { API } from "../types";

export class AssetsCategorySelectStore extends Store<Api> {
  public data: API.CategoryList.Item[] = [];

  constructor(axios: AxiosInstance) {
    super(new Api(axios));
    makeObservable(this, {
      data: observable,
      $setData: action,
    });
  }

  public $setData(data: API.CategoryList.Item[]): void {
    this.data = Array.isArray(data) ? data : [];
  }

  public async getData(): Promise<void> {
    const [err, data] = await this.api.getList();
    if (!err) this.$setData(data);
  }
}

const AssetsCategorySelectContext = createContext<AssetsCategorySelectStore>({} as AssetsCategorySelectStore);

export default AssetsCategorySelectContext;

