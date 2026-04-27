/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { AxiosInstance } from "axios";
import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import Api from "../api";
import { API } from "../types";

export class LeavePeriodSettingStore extends Store<Api> {
  public data: API.PeriodSetting.Data | null = null;

  constructor(axios: AxiosInstance) {
    super(new Api(axios));
    makeObservable(this, {
      data: observable,
      $setData: action,
    });
  }

  public $setData(data: API.PeriodSetting.Data | null): void {
    this.data = data;
  }

  public async getData(periodId: number): Promise<void> {
    const [, data] = await this.api.getSetting({ periodId });
    if (data) this.$setData(data);
  }
}

const LeavePeriodSettingContext = createContext<LeavePeriodSettingStore>(
  {} as LeavePeriodSettingStore
);

export default LeavePeriodSettingContext;

