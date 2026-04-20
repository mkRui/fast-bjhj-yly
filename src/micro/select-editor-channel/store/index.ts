/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { AxiosInstance } from "axios";
import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import Api from "../api";
import { API } from "../types";
export class ChannelListStore extends Store<Api> {
  public data: API.ChannelList.Data[] = [];

  constructor(axios: AxiosInstance) {
    super(new Api(axios));
    makeObservable(this, {
      data: observable,
      $setData: action,
    });
  }

  public $setData(data: API.ChannelList.Data[]): void {
    this.data = data;
  }

  public async getData(): Promise<void> {
    const [, data] = await this.api.getChannelList();
    if (data) this.$setData(data);
  }
}

const ChannelListContext = createContext<ChannelListStore>(
  {} as ChannelListStore
);

export default ChannelListContext;
