/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { AxiosInstance } from "axios";
import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import Api from "../api";
import { API } from "../types";
export class MetaListStore extends Store<Api> {
  public data: API.MetaList.Data[] = [];

  constructor(axios: AxiosInstance) {
    super(new Api(axios));
    makeObservable(this, {
      data: observable,
      $setData: action,
    });
  }

  public $setData(data: API.MetaList.Data[]): void {
    this.data = data;
  }

  public async getData(params: API.MetaList.Params): Promise<void> {
    const [, data] = await this.api.getMetaList(params);
    if (data) this.$setData(data);
  }
}

const MetaListContext = createContext<MetaListStore>({} as MetaListStore);

export default MetaListContext;
