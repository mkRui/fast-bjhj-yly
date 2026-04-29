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

export interface LeaveFilterParams {
  periodId?: string;
  current: number;
  size: number;
}

export class WelcomeStore extends Store<Api> {
  public loading = false;
  public leaveLoading = false;
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

  public leaveFilter: LeaveFilterParams = {
    periodId: undefined,
    current: 1,
    size: 10,
  };

  public leavePage: API.LeavePage.Data = {
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
      leaveLoading: observable,
      period: observable,
      statistics: observable,
      page: observable,
      filter: observable,
      leaveFilter: observable,
      leavePage: observable,
      $setLoading: action,
      $setLeaveLoading: action,
      $setPeriod: action,
      $setStatistics: action,
      $setPage: action,
      $setFilter: action,
      $setLeaveFilter: action,
      $setLeavePage: action,
    });
  }

  public $setLoading(loading: boolean): void {
    this.loading = loading;
  }

  public $setLeaveLoading(loading: boolean): void {
    this.leaveLoading = loading;
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

  public $setLeaveFilter(params: Partial<LeaveFilterParams>): void {
    Object.assign(this.leaveFilter, params);
  }

  public $setLeavePage(data: API.LeavePage.Data): void {
    this.leavePage = data;
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

  public async refreshWork(): Promise<void> {
    await Promise.all([this.fetchPeriod(), this.fetchStatistics(), this.fetchPage()]);
  }

  public async refreshAll(): Promise<void> {
    await Promise.all([this.refreshWork(), this.fetchLeavePage()]);
  }

  public async submitWork(params: API.SubmitWork.Params): Promise<boolean> {
    this.$setLoading(true);
    const [err] = await this.api.submitWork(params);
    this.$setLoading(false);
    if (!err) {
      await this.refreshWork();
      return true;
    }
    return false;
  }

  public async fetchLeavePage(): Promise<void> {
    const periodId = this.leaveFilter.periodId;
    if (!periodId) return;
    this.$setLeaveLoading(true);
    const [err, data] = await this.api.getLeavePage({
      periodId,
      current: this.leaveFilter.current,
      size: this.leaveFilter.size,
    });
    this.$setLeaveLoading(false);
    if (!err) {
      this.$setLeavePage(data);
    }
  }

  public async submitLeave(params: API.LeaveSubmit.Params): Promise<boolean> {
    this.$setLeaveLoading(true);
    const [err] = await this.api.submitLeave(params);
    this.$setLeaveLoading(false);
    if (!err) {
      await this.fetchLeavePage();
      return true;
    }
    return false;
  }
}

const WelcomeContext = createContext<WelcomeStore>({} as WelcomeStore);

export default WelcomeContext;
