import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import axios from "@/api";
import { resolveMutation } from "@/utils/common/mutation-success";
import { Api } from "../api";
import { API } from "../types/api";

export class AmsAssetsStore extends Store<Api> {
  public loading = false;

  public params: API.Page.Params = {
    categoryId: undefined,
    current: 1,
    size: 10,
    keyword: undefined,
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
    if (!this.params.categoryId) return;
    this.$setLoading(true);
    const [err, data] = await this.api.getPage(this.params);
    this.$setLoading(false);
    if (!err) this.$setData(data);
  }

  public async addItem(params: API.Add.Params) {
    this.$setLoading(true);
    const [err] = await this.api.add(params);
    this.$setLoading(false);
    return resolveMutation(err, () => this.getList());
  }

  public async editItem(params: API.Edit.Params) {
    this.$setLoading(true);
    const [err] = await this.api.edit(params);
    this.$setLoading(false);
    return resolveMutation(err, () => this.getList());
  }

  public async delItem(id: string) {
    this.$setLoading(true);
    const [err] = await this.api.del({ id });
    this.$setLoading(false);
    return resolveMutation(err, () => this.getList());
  }

  public async stockIn(params: API.StockIn.Params) {
    this.$setLoading(true);
    const [err] = await this.api.stockIn(params);
    this.$setLoading(false);
    return resolveMutation(err, () => this.getList());
  }
}

const StoreContext = createContext<AmsAssetsStore>({} as AmsAssetsStore);

export default StoreContext;

