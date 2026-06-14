import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import axios from "@/api";
import { resolveMutation } from "@/utils/common/mutation-success";
import { Api } from "../api";
import { API } from "../types/api";

export class CarApplyStore extends Store<Api> {
  public loading = false;

  public params: API.ApplyPage.Params = {
    current: 1,
    size: 10,
    carId: undefined,
  };

  public data: API.ApplyPage.Data = {
    size: 10,
    pages: 0,
    total: 0,
    records: [],
    current: 1,
  };

  constructor() {
    super(new Api(axios));
    makeObservable(this, {
      loading: observable,
      params: observable,
      data: observable,
      $setLoading: action,
      $setParams: action,
      $setData: action,
    });
  }

  public $setLoading(loading: boolean): void {
    this.loading = loading;
  }

  public $setParams(params: Partial<API.ApplyPage.Params>): void {
    Object.assign(this.params, params);
  }

  public $setData(data: API.ApplyPage.Data): void {
    Object.assign(this.data, data);
  }

  public get list() {
    return this.data.records;
  }

  public async getList(): Promise<void> {
    this.$setLoading(true);
    const [err, data] = await this.api.getApplyPage(this.params);
    this.$setLoading(false);
    if (!err) this.$setData(data);
  }

  public async applyCheck(params: API.ApplyCheck.Params) {
    const [err] = await this.api.applyCheck(params);
    return resolveMutation(err, () => this.getList());
  }
}

const StoreContext = createContext<CarApplyStore>({} as CarApplyStore);

export default StoreContext;
