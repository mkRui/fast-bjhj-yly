import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import axios from "@/api";
import { Api } from "../api";
import { API } from "../types/api";

export class SalaryBaseStore extends Store<Api> {
  public loading = false;

  public params: API.Page.Params = {
    current: "0",
    size: "10",
  };

  public page: API.Page.Data = {
    size: 10,
    pages: 0,
    total: 0,
    records: [],
    current: 0,
  };

  constructor() {
    super(new Api(axios));
    makeObservable(this, {
      loading: observable,
      params: observable,
      page: observable,
      $setLoading: action,
      $setParams: action,
      $setPage: action,
    });
  }

  public $setLoading(loading: boolean): void {
    this.loading = loading;
  }

  public $setParams(params: Partial<API.Page.Params>): void {
    Object.assign(this.params, params);
  }

  public $setPage(data: API.Page.Data): void {
    this.page = data;
  }

  public async fetchPage(): Promise<void> {
    this.$setLoading(true);
    const [err, data] = await this.api.getPage(this.params);
    this.$setLoading(false);
    if (!err) this.$setPage(data);
  }

  public async editItem(params: API.Edit.Params): Promise<boolean> {
    this.$setLoading(true);
    const [err] = await this.api.edit(params);
    this.$setLoading(false);
    if (!err) {
      await this.fetchPage();
      return true;
    }
    return false;
  }
}

const SalaryBaseContext = createContext<SalaryBaseStore>({} as SalaryBaseStore);

export default SalaryBaseContext;
