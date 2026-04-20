import { makeObservable, observable, action } from "mobx";
import { createContext } from "react";
import axios from "@/api";
import { Store } from "mor-request";

import { Api } from "../api";
import { API } from "../types/api";

export class IntentionStore extends Store<Api> {
  public loading: boolean = false;

  public params: API.Intention.Params = {
    current: 1,
    size: 10,
  };

  public data: API.Intention.Data = {
    size: 0,
    pages: 0,
    total: 0,
    current: 0,
    records: [],
  };

  constructor() {
    super(new Api(axios));
    makeObservable(this, {
      data: observable,
      $setData: action,
      loading: observable,
      $setLoading: action,
      params: observable,
      $setParams: action,
    });
  }

  public get list() {
    return this.data.records;
  }

  public $setData(data: API.Intention.Data) {
    Object.assign(this.data, data);
  }

  public $setLoading(loading: boolean) {
    this.loading = loading;
  }

  public $setParams(params: Partial<API.Intention.Params>) {
    Object.assign(this.params, params);
  }

  // 获取列表
  public async getList(): Promise<API.Intention.Data | undefined> {
    this.$setLoading(true);
    const [err, data] = await this.api.getIntentionList(this.params);
    this.$setLoading(false);
    if (!err) {
      this.$setData(data as API.Intention.Data);

      return data as API.Intention.Data;
    }
  }

  // 编辑
  public async setItem(
    params: API.SetIntention.Params
  ): Promise<boolean | undefined> {
    const [err] = await this.api.setIntention(params);
    if (!err) {
      return true;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const IntentionStoreContext = createContext<IntentionStore>(
  {} as IntentionStore
);

export default IntentionStoreContext;
