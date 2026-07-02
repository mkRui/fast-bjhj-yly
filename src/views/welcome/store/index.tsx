import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import axios from "@/api";
import { resolveMutation } from "@/utils/common/mutation-success";
import { Api } from "../api";
import { API } from "../types/api";

export interface FilterParams {
  year: number;
  month: number;
  current: number;
  size: number;
}

export interface LeaveFilterParams {
  current: number;
  size: number;
  checkedFlag?: string;
}

export class WelcomeStore extends Store<Api> {
  public loading = false;
  public leaveLoading = false;
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
      statistics: observable,
      page: observable,
      filter: observable,
      leaveFilter: observable,
      leavePage: observable,
      $setLoading: action,
      $setLeaveLoading: action,
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
    await Promise.all([this.fetchStatistics(), this.fetchPage()]);
  }

  public async refreshAll(): Promise<void> {
    await Promise.all([this.refreshWork(), this.fetchLeavePage()]);
  }

  public async submitWork(params: API.SubmitWork.Params) {
    this.$setLoading(true);
    const [err] = await this.api.submitWork(params);
    this.$setLoading(false);
    return resolveMutation(err, () => this.refreshWork());
  }

  public async editWork(params: API.WorkEdit.Params) {
    this.$setLoading(true);
    const [err] = await this.api.editWork(params);
    this.$setLoading(false);
    return resolveMutation(err, () => this.refreshWork());
  }

  public async delWork(params: API.WorkDel.Params) {
    this.$setLoading(true);
    const [err] = await this.api.delWork(params);
    this.$setLoading(false);
    return resolveMutation(err, () => this.refreshWork());
  }

  public async fetchLeavePage(): Promise<void> {
    this.$setLeaveLoading(true);
    const [err, data] = await this.api.getLeavePage({
      current: this.leaveFilter.current,
      size: this.leaveFilter.size,
      checkedFlag: this.leaveFilter.checkedFlag,
    });
    this.$setLeaveLoading(false);
    if (!err) {
      this.$setLeavePage(data);
    }
  }

  public async submitLeave(params: API.LeaveSubmit.Params) {
    this.$setLeaveLoading(true);
    const [err] = await this.api.submitLeave(params);
    this.$setLeaveLoading(false);
    return resolveMutation(err, () => this.fetchLeavePage());
  }
}

const WelcomeContext = createContext<WelcomeStore>({} as WelcomeStore);

export default WelcomeContext;
