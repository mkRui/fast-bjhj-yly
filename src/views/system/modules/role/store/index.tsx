import { makeObservable, observable, action } from "mobx";
import { createContext } from "react";
import axios from "@/api";
import { Store } from "mor-request";

import { Api } from "../api";
import { API } from "../types/api";

export class RoleStore extends Store<Api> {
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
    const [err, data] = await this.api.getRolePage(params);
    this.$setLoading(false);
    if (!err) {
      this.$setList(data);
      return data;
    }
  }

  // 删除
  public async delItem(
    params?: API.DelRole.Params
  ): Promise<boolean | undefined> {
    const [err] = await this.api.delRole(params);
    if (!err) {
      this.getList();
      return true;
    }
  }

  // 删除
  public async setItem(
    params?: API.SetRole.Params
  ): Promise<boolean | undefined> {
    const [err] = await this.api.setRole(params);
    if (!err) {
      this.getList();
      return true;
    }
  }

  // 删除
  public async addItem(
    params?: API.AddRole.Params
  ): Promise<boolean | undefined> {
    const [err] = await this.api.addRole(params);
    if (!err) {
      this.getList();
      return true;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const RoleStoreContext = createContext<RoleStore>({} as RoleStore);

export default RoleStoreContext;
