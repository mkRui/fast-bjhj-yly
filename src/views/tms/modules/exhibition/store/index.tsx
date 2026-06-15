import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import axios from "@/api";
import { Api } from "../api";
import { API } from "../types/api";

export class ExhibitionStore extends Store<Api> {
  public loading = false;

  public teacherMap: Record<string, string> = {};

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
      teacherMap: observable,
      params: observable,
      page: observable,
      $setLoading: action,
      $setTeacherMap: action,
      $setParams: action,
      $setPage: action,
    });
  }

  public $setLoading(loading: boolean): void {
    this.loading = loading;
  }

  public $setTeacherMap(map: Record<string, string>): void {
    this.teacherMap = map;
  }

  public $setParams(params: Partial<API.Page.Params>): void {
    Object.assign(this.params, params);
  }

  public $setPage(data: API.Page.Data): void {
    this.page = data;
  }

  public async fetchTeacherMap(): Promise<void> {
    const [err, data] = await this.api.getTeacherList({ current: 1, size: 999 });
    if (err) return;
    const map: Record<string, string> = {};
    const list = Array.isArray(data) ? data : [];
    list.forEach((item) => {
      map[item.id] = item.name;
    });
    this.$setTeacherMap(map);
  }

  public async fetchPage(): Promise<void> {
    this.$setLoading(true);
    const [err, data] = await this.api.getPage(this.params);
    this.$setLoading(false);
    if (!err) this.$setPage(data);
  }

  public async fetchAttachmentList(
    exhibitionId: string
  ): Promise<API.AttachmentList.Data[]> {
    const [err, data] = await this.api.getAttachmentList({ exhibitionId });
    if (err) return [];
    return data || [];
  }
}

const ExhibitionContext = createContext<ExhibitionStore>({} as ExhibitionStore);

export default ExhibitionContext;
