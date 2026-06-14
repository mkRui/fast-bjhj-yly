import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import axios from "@/api";
import { resolveMutation } from "@/utils/common/mutation-success";
import { Api } from "../api";
import { API } from "../types/api";

export class PeriodStore extends Store<Api> {
  public loading = false;

  public params: API.Page.Params = {
    current: 1,
    size: 10,
  };

  public data: API.Page.Data = {
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

  public $setParams(params: Partial<API.Page.Params>): void {
    Object.assign(this.params, params);
  }

  public $setData(data: API.Page.Data): void {
    Object.assign(this.data, data);
  }

  public get list() {
    return this.data.records;
  }

  public async getList(): Promise<void> {
    this.$setLoading(true);
    const [err, data] = await this.api.getPage(this.params);
    this.$setLoading(false);
    if (!err) {
      this.$setData(data);
    }
  }

  public async getSetting(periodId: string): Promise<API.Setting.Data | null> {
    this.$setLoading(true);
    const [err, data] = await this.api.getSetting({ periodId });
    this.$setLoading(false);
    if (!err) return data;
    return null;
  }

  public async delItem(id: string) {
    this.$setLoading(true);
    const [err] = await this.api.del({ id });
    this.$setLoading(false);
    return resolveMutation(err, () => this.getList());
  }

  public async addItem(params: API.Add.Params) {
    this.$setLoading(true);
    const [err] = await this.api.add(params);
    this.$setLoading(false);
    return resolveMutation(err, () => this.getList());
  }

  public async settingEdit(params: API.SettingEdit.Params) {
    this.$setLoading(true);
    const [err] = await this.api.settingEdit(params);
    this.$setLoading(false);
    return resolveMutation(err, () => this.getList());
  }
}

const PeriodContext = createContext<PeriodStore>({} as PeriodStore);

export default PeriodContext;
