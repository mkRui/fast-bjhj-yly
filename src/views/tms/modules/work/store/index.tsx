import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import axios from "@/api";
import { Api } from "../api";
import { API } from "../types/api";

export class WorkStore extends Store<Api> {
  public loading = false;

  public teacherParams: API.TeacherList.Params = {
    current: 1,
    size: 10,
    keyword: undefined,
  };

  public teacherData: API.TeacherList.Data = {
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
      teacherParams: observable,
      teacherData: observable,
      $setLoading: action,
      $setTeacherParams: action,
      $setTeacherData: action,
    });
  }

  public $setLoading(loading: boolean): void {
    this.loading = loading;
  }

  public $setTeacherParams(params: Partial<API.TeacherList.Params>): void {
    Object.assign(this.teacherParams, params);
  }

  public $setTeacherData(data: API.TeacherList.Data): void {
    Object.assign(this.teacherData, data);
  }

  public get teacherList() {
    return this.teacherData.records;
  }

  public async getTeacherList(): Promise<void> {
    this.$setLoading(true);
    const [err, data] = await this.api.getTeacherList(this.teacherParams);
    this.$setLoading(false);
    if (!err) {
      this.$setTeacherData(data);
    }
  }

  public async getWorkPage(params: API.WorkPage.Params): Promise<API.WorkPage.Data | null> {
    this.$setLoading(true);
    const [err, data] = await this.api.getWorkPage(params);
    this.$setLoading(false);
    if (!err) {
      return data;
    }
    return null;
  }
}

const WorkContext = createContext<WorkStore>({} as WorkStore);

export default WorkContext;

