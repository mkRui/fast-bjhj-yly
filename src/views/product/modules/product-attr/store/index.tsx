import { makeObservable, observable, action } from "mobx";
import { createContext } from "react";
import axios from "@/api";
import { Store } from "mor-request";

import { Api } from "../api";
import { API } from "../types/api";

export class ProductAttrStore extends Store<Api> {
  public loading: boolean = false;

  public list: API.List.Data[] = [];
  public params: API.List.Params = {};

  constructor() {
    super(new Api(axios));
    makeObservable(this, {
      list: observable,
      $setList: action,
      loading: observable,
      $setLoading: action,
      params: observable,
      $setParams: action,
    });
  }

  public $setList(list: API.List.Data[]) {
    this.list = list;
  }

  public $setLoading(loading: boolean) {
    this.loading = loading;
  }

  public $setParams(params: API.List.Params) {
    this.params = { ...this.params, ...params };
  }

  // 获取列表
  public async getList(
    params?: API.List.Params
  ): Promise<API.List.Data[] | undefined> {
    if (params) {
      this.$setParams(params);
    }
    this.$setLoading(true);
    const [err, data] = await this.api.getList(this.params);
    this.$setLoading(false);
    if (!err) {
      this.$setList(data);
      return data;
    }
  }

  // 删除
  public async delItem(
    params?: API.DelItem.Params
  ): Promise<boolean | undefined> {
    const [err] = await this.api.delItem(params);
    if (!err) {
      this.getList();
      return true;
    }
  }

  // 修改
  public async setItem(
    params?: API.EditItem.Params
  ): Promise<boolean | undefined> {
    const [err] = await this.api.editItem(params);
    if (!err) {
      this.getList();
      return true;
    }
  }

  // 新增
  public async addItem(
    params?: API.AddItem.Params
  ): Promise<boolean | undefined> {
    const [err] = await this.api.addItem(params);
    if (!err) {
      this.getList();
      return true;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const Context = createContext<ProductAttrStore>({} as ProductAttrStore);

export default Context;
