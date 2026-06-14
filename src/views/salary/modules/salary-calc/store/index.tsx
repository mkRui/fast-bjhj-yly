import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import axios from "@/api";
import { resolveMutation } from "@/utils/common/mutation-success";
import { Api } from "../api";
import { API } from "../types/api";

export class SalaryCalcStore extends Store<Api> {
  public loading = false;

  public params: API.Page.Params = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
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

  public async fetchSubjectList(
    params: API.SubjectList.Params
  ): Promise<API.SubjectList.Data[]> {
    const [err, data] = await this.api.getSubjectList(params);
    if (err) return [];
    return data || [];
  }

  public async addSubject(params: API.SubjectAdd.Params) {
    const [err] = await this.api.addSubject(params);
    return resolveMutation(err, () => this.fetchPage());
  }

  public async delSubject(id: number) {
    const [err] = await this.api.delSubject({ id });
    return resolveMutation(err, () => this.fetchPage());
  }
}

const SalaryCalcContext = createContext<SalaryCalcStore>({} as SalaryCalcStore);

export default SalaryCalcContext;
