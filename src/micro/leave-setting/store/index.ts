/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { AxiosInstance } from "axios";
import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import Api from "../api";
import { API } from "../types";

export class LeaveSettingStore extends Store<Api> {
  public data: API.Setting.Data | null = null;

  constructor(axios: AxiosInstance) {
    super(new Api(axios));
    makeObservable(this, {
      data: observable,
      $setData: action,
    });
  }

  public $setData(data: API.Setting.Data | null): void {
    this.data = data;
  }

  public async fetchSetting(): Promise<void> {
    const [, data] = await this.api.getSetting();
    if (data) this.$setData(data);
  }
}

const LeaveSettingContext = createContext<LeaveSettingStore>({} as LeaveSettingStore);

export default LeaveSettingContext;
