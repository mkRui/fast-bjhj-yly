import { makeObservable, observable, action } from "mobx";
import { createContext } from "react";
import axios from "@/api";
import { resolveMutation } from "@/utils/common/mutation-success";
import { Store } from "mor-request";

import { Api } from "../api";
import { API } from "../types/api";

export class ResourcesStore extends Store<Api> {
  public loading: boolean = false;

  public list: API.List.Data[] = [];
  constructor() {
    super(new Api(axios));
    makeObservable(this, {
      list: observable,
      $setList: action,
      loading: observable,
      $setLoading: action,
    });
  }

  public $setList(list: API.List.Data[]) {
    this.list = list;
  }

  public $setLoading(loading: boolean) {
    this.loading = loading;
  }

  // 获取列表
  public async getList(
    params?: API.List.Params
  ): Promise<API.List.Data[] | undefined> {
    this.$setLoading(true);
    const [err, data] = await this.api.getResPage(params);
    this.$setLoading(false);
    if (!err) {
      this.$setList(data);
      return data;
    }
  }

  // 删除
  public async delItem(params?: API.DelRes.Params) {
    const [err] = await this.api.delRes(params);
    return resolveMutation(err, () => this.getList());
  }

  public async setItem(params?: API.SetRes.Params) {
    const [err] = await this.api.setRes(params);
    return resolveMutation(err, () => this.getList());
  }

  public async addItem(params?: API.AddRes.Params) {
    const [err] = await this.api.addRes(params);
    return resolveMutation(err, () => this.getList());
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const ResourcesStoreContext = createContext<ResourcesStore>(
  {} as ResourcesStore
);

export default ResourcesStoreContext;
