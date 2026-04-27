/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { AxiosInstance } from "axios";
import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import Api from "../api";
import { API } from "../types";

export class LeavePeriodListStore extends Store<Api> {
  public data: API.PeriodList.Data[] = [];

  constructor(axios: AxiosInstance) {
    super(new Api(axios));
    makeObservable(this, {
      data: observable,
      $setData: action,
    });
  }

  public $setData(data: API.PeriodList.Data[]): void {
    this.data = data;
  }

  public async getData(): Promise<void> {
    const [, data] = await this.api.getList();
    if (data) this.$setData(data);
  }
}

const LeavePeriodListContext = createContext<LeavePeriodListStore>(
  {} as LeavePeriodListStore
);

export default LeavePeriodListContext;

