import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import axios from "@/api";
import { Api } from "../api";
import { API } from "../types/api";

export class LeaveStore extends Store<Api> {
  public loading = false;

  public periodList: API.PeriodList.Data[] = [];

  public params: API.Page.Params = {
    periodId: undefined,
    checkedFlag: undefined,
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
      periodList: observable,
      params: observable,
      page: observable,
      $setLoading: action,
      $setPeriodList: action,
      $setParams: action,
      $setPage: action,
    });
  }

  public $setLoading(loading: boolean): void {
    this.loading = loading;
  }

  public $setPeriodList(list: API.PeriodList.Data[]): void {
    this.periodList = Array.isArray(list) ? list : [];
  }

  public $setParams(params: Partial<API.Page.Params>): void {
    Object.assign(this.params, params);
  }

  public $setPage(data: API.Page.Data): void {
    this.page = data;
  }

  public async fetchPeriodList(): Promise<void> {
    const [err, data] = await this.api.getPeriodList();
    if (!err) this.$setPeriodList(data);
  }

  public async fetchPage(): Promise<void> {
    this.$setLoading(true);
    const [err, data] = await this.api.getPage(this.params);
    this.$setLoading(false);
    if (!err) this.$setPage(data);
  }

  public async checkLeave(params: API.Check.Params): Promise<boolean> {
    this.$setLoading(true);
    const [err] = await this.api.check(params);
    this.$setLoading(false);
    if (!err) {
      await this.fetchPage();
      return true;
    }
    return false;
  }
}

const LeaveContext = createContext<LeaveStore>({} as LeaveStore);

export default LeaveContext;
