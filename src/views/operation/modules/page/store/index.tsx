import { makeObservable, observable, action } from "mobx";
import { createContext } from "react";
import axios from "@/api";
import { Store } from "mor-request";

import { Api } from "../api";
import { API } from "../types/api";

export class PagesStore extends Store<Api> {
  public loading: boolean = false;

  public data: API.Pages.Data = {
    current: 0,
    size: 0,
    pages: 0,
    total: 0,
    records: [],
  };

  public params: API.Pages.Params = {
    query: {
      channelId: "",
      current: 1,
      size: 10,
      keyword: "",
    },
  };

  public get list() {
    return this.data.records;
  }

  public metaList: API.MetaList.Data[] = [];

  constructor() {
    super(new Api(axios));
    makeObservable(this, {
      data: observable,
      $setData: action,
      loading: observable,
      $setLoading: action,
      params: observable,
      $setParams: action,
      metaList: observable,
    });
  }

  public $setData(data: API.Pages.Data) {
    Object.assign(this.data, data);
  }

  public $setLoading(loading: boolean) {
    this.loading = loading;
  }

  public $setParams(params: Partial<API.Pages.Params>) {
    Object.assign(this.params, params);
  }

  public $setMetaList(list: API.MetaList.Data[]) {
    this.metaList = list;
  }

  // 获取列表
  public async getMeta(
    params?: API.MetaList.Params,
  ): Promise<API.MetaList.Data[] | undefined> {
    const [err, data] = await this.api.getMetaList(params);
    if (!err) {
      this.$setMetaList(data);
      return data;
    }
  }

  // 获取数据
  public async getItem(
    params?: API.GetRes.Params,
  ): Promise<API.GetRes.Data | undefined> {
    const [err, data] = await this.api.getMetaData(params);
    if (!err) {
      return data;
    }
  }

  // 获取列表
  public async getList(): Promise<void> {
    this.$setLoading(true);
    const [err, data] = await this.api.getPages(this.params);
    this.$setLoading(false);
    if (!err) {
      this.$setData(data);
    }
  }

  // 删除
  public async delItem(
    params?: API.DelItem.Params,
  ): Promise<boolean | undefined> {
    const [err] = await this.api.delItem(params);
    if (!err) {
      this.getList();
      return true;
    }
  }

  // 编辑
  public async setItem(
    params?: API.SetItem.Params,
  ): Promise<boolean | undefined> {
    const [err] = await this.api.setItem(params);
    if (!err) {
      this.getList();
      return true;
    }
  }

  // 新增
  public async addItem(
    params?: API.AddItem.Params,
  ): Promise<boolean | undefined> {
    const [err] = await this.api.addItem(params);
    if (!err) {
      this.getList();
      return true;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const PagesContext = createContext<PagesStore>({} as PagesStore);

export default PagesContext;
