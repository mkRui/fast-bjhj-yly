import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import axios from "@/api";
import { Api } from "../api";
import { API } from "../types/api";

export class TeacherStore extends Store<Api> {
  public loading = false;

  public params: API.List.Params = {
    current: 1,
    size: 10,
    keyword: undefined,
  };

  public data: API.List.Data = {
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

  public $setParams(params: Partial<API.List.Params>): void {
    Object.assign(this.params, params);
  }

  public $setData(data: API.List.Data): void {
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

  public async getInfo(id: number): Promise<API.Info.Data | null> {
    const [err, data] = await this.api.getInfo({ id });
    if (!err) {
      return data;
    }
    return null;
  }

  public async edit(params: API.Edit.Params): Promise<boolean> {
    this.$setLoading(true);
    const [err] = await this.api.edit(params);
    this.$setLoading(false);
    if (!err) {
      await this.getList();
      return true;
    }
    return false;
  }

  public async del(id: number): Promise<boolean> {
    this.$setLoading(true);
    const [err] = await this.api.del({ id });
    this.$setLoading(false);
    if (!err) {
      await this.getList();
      return true;
    }
    return false;
  }
}

const TeacherContext = createContext<TeacherStore>({} as TeacherStore);

export default TeacherContext;

