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

  public teacherList: API.TeacherList.Data = [];

  constructor() {
    super(new Api(axios));
    makeObservable(this, {
      loading: observable,
      teacherParams: observable,
      teacherList: observable,
      $setLoading: action,
      $setTeacherParams: action,
      $setTeacherList: action,
    });
  }

  public $setLoading(loading: boolean): void {
    this.loading = loading;
  }

  public $setTeacherParams(params: Partial<API.TeacherList.Params>): void {
    Object.assign(this.teacherParams, params);
  }

  public $setTeacherList(data: API.TeacherList.Data): void {
    this.teacherList = data;
  }

  public async getTeacherList(): Promise<void> {
    this.$setLoading(true);
    const [err, data] = await this.api.getTeacherList(this.teacherParams);
    this.$setLoading(false);
    if (!err) {
      this.$setTeacherList(Array.isArray(data) ? data : []);
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

