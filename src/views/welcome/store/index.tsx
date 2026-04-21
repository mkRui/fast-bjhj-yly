import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import axios from "@/api";
import { Api } from "../api";
import { API } from "../types/api";

export interface FilterParams {
  year: number;
  month: number;
  current: number;
  size: number;
}

export class WelcomeStore extends Store<Api> {
  public loading = false;
  public period: API.Period.Data | null = null;
  public statistics: API.WorkStatistics.Data[] = [];
  public page: API.WorkPage.Data = {
    size: 10,
    pages: 0,
    total: 0,
    records: [],
    current: 1,
  };
  public filter: FilterParams = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    current: 1,
    size: 10,
  };

  constructor() {
    super(new Api(axios));
    makeObservable(this, {
      loading: observable,
      period: observable,
      statistics: observable,
      page: observable,
      filter: observable,
      $setLoading: action,
      $setPeriod: action,
      $setStatistics: action,
      $setPage: action,
      $setFilter: action,
    });
  }

  public $setLoading(loading: boolean): void {
    this.loading = loading;
  }

  public $setPeriod(period: API.Period.Data | null): void {
    this.period = period;
  }

  public $setStatistics(list: API.WorkStatistics.Data[]): void {
    this.statistics = Array.isArray(list) ? list : [];
  }

  public $setPage(data: API.WorkPage.Data): void {
    this.page = data;
  }

  public $setFilter(params: Partial<FilterParams>): void {
    Object.assign(this.filter, params);
  }

  public async fetchPeriod(): Promise<void> {
    const [err, data] = await this.api.getPeriod();
    if (!err) {
      this.$setPeriod(data);
    }
  }

  public async fetchStatistics(): Promise<void> {
    const [err, data] = await this.api.getWorkStatistics({
      year: this.filter.year,
      month: this.filter.month,
    });
    if (!err) {
      this.$setStatistics(data);
    }
  }

  public async fetchPage(): Promise<void> {
    this.$setLoading(true);
    const [err, data] = await this.api.getWorkPage({
      year: this.filter.year,
      month: this.filter.month,
      current: this.filter.current,
      size: this.filter.size,
    });
    this.$setLoading(false);
    if (!err) {
      this.$setPage(data);
    }
  }

  public async refreshAll(): Promise<void> {
    await Promise.all([this.fetchPeriod(), this.fetchStatistics(), this.fetchPage()]);
  }

  public async submitWork(params: API.SubmitWork.Params): Promise<boolean> {
    this.$setLoading(true);
    const [err] = await this.api.submitWork(params);
    this.$setLoading(false);
    if (!err) {
      await this.refreshAll();
      return true;
    }
    return false;
  }
}

const WelcomeContext = createContext<WelcomeStore>({} as WelcomeStore);

export default WelcomeContext;
