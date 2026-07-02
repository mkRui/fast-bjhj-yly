import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import axios from "@/api";
import { resolveMutation } from "@/utils/common/mutation-success";
import { Api } from "../api";
import { API } from "../types/api";

export class WorkStore extends Store<Api> {
  public loading = false;

  public params: API.StatisticsPage.Params = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    keyword: undefined,
    current: 1,
    size: 10,
  };

  public data: API.StatisticsPage.Data = {
    size: 10,
    pages: 0,
    total: 0,
    records: [],
    current: 1,
  };

  public detailParams: API.WorkPage.Params = {
    selectedTeacherId: "",
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    current: 1,
    size: 10,
  };

  public detailData: API.WorkPage.Data = {
    size: 10,
    pages: 0,
    total: 0,
    records: [],
    current: 1,
  };

  public detailLoading = false;

  public detailChartRecords: API.WorkPage.RecordItem[] = [];

  constructor() {
    super(new Api(axios));
    makeObservable(this, {
      loading: observable,
      params: observable,
      data: observable,
      detailParams: observable,
      detailData: observable,
      detailLoading: observable,
      detailChartRecords: observable,
      $setLoading: action,
      $setParams: action,
      $setData: action,
      $setDetailParams: action,
      $setDetailData: action,
      $setDetailLoading: action,
      $setDetailChartRecords: action,
    });
  }

  public $setLoading(loading: boolean): void {
    this.loading = loading;
  }

  public $setParams(params: Partial<API.StatisticsPage.Params>): void {
    Object.assign(this.params, params);
  }

  public $setData(data: API.StatisticsPage.Data): void {
    this.data = data;
  }

  public $setDetailParams(params: Partial<API.WorkPage.Params>): void {
    Object.assign(this.detailParams, params);
  }

  public $setDetailData(data: API.WorkPage.Data): void {
    this.detailData = data;
  }

  public $setDetailLoading(loading: boolean): void {
    this.detailLoading = loading;
  }

  public $setDetailChartRecords(records: API.WorkPage.RecordItem[]): void {
    this.detailChartRecords = records;
  }

  public get list() {
    return this.data.records;
  }

  public async getList(): Promise<void> {
    this.$setLoading(true);
    const [err, data] = await this.api.getStatisticsPage(this.params);
    this.$setLoading(false);
    if (!err) {
      this.$setData(data);
    }
  }

  public async getDetailChart(): Promise<void> {
    if (!this.detailParams.selectedTeacherId) return;
    const [err, data] = await this.api.getWorkPage({
      ...this.detailParams,
      current: 1,
      size: 999,
    });
    if (!err) {
      this.$setDetailChartRecords(data?.records || []);
    }
  }

  public async getDetailList(): Promise<void> {
    if (!this.detailParams.selectedTeacherId) return;
    this.$setDetailLoading(true);
    const [err, data] = await this.api.getWorkPage(this.detailParams);
    this.$setDetailLoading(false);
    if (!err) {
      this.$setDetailData(data);
    }
  }

  public async editWork(params: API.WorkEdit.Params) {
    this.$setDetailLoading(true);
    const [err] = await this.api.editWork(params);
    this.$setDetailLoading(false);
    return resolveMutation(err, () =>
      Promise.all([this.getDetailChart(), this.getDetailList()])
    );
  }

  public async delWork(params: API.WorkDel.Params) {
    this.$setDetailLoading(true);
    const [err] = await this.api.delWork(params);
    this.$setDetailLoading(false);
    return resolveMutation(err, () =>
      Promise.all([this.getDetailChart(), this.getDetailList()])
    );
  }
}

const WorkContext = createContext<WorkStore>({} as WorkStore);

export default WorkContext;
