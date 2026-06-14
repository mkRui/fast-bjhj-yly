import { makeObservable, observable, action } from "mobx";
import { createContext } from "react";
import axios from "@/api";
import { resolveMutation } from "@/utils/common/mutation-success";
import { Store } from "mor-request";

import { Api } from "../api";
import { API } from "../types/api";

export class AccountStore extends Store<Api> {
  public loading: boolean = false;

  public params: API.Account.Params = {
    current: 1,
    size: 10,
  };

  public data: API.Account.Data = {
    size: 0,
    pages: 0,
    total: 0,
    current: 0,
    records: [],
  };
  constructor() {
    super(new Api(axios));
    makeObservable(this, {
      data: observable,
      $setData: action,
      loading: observable,
      $setLoading: action,
      params: observable,
      $setParams: action,
    });
  }

  public $setParams(params: Partial<API.Account.Params>) {
    Object.assign(this.params, params);
  }

  public $setData(data: API.Account.Data) {
    Object.assign(this.data, data);
  }

  public get list() {
    return this.data.records;
  }

  public $setLoading(loading: boolean) {
    this.loading = loading;
  }

  // 获取列表
  public async getList(): Promise<void> {
    this.$setLoading(true);
    const [err, data] = await this.api.getAccount(this.params);
    this.$setLoading(false);
    if (!err) {
      this.$setData(data);
    }
  }

  // 删除
  public async delItem(id: string) {
    const [err] = await this.api.delAccount({ id });
    return resolveMutation(err, () => this.getList());
  }

  public async addItem(params: API.AddAccount.Params) {
    const [err] = await this.api.addAccount(params);
    return resolveMutation(err, () => this.getList());
  }

  public async setItem(params: API.EditAccount.Params) {
    const [err] = await this.api.editAccount(params);
    return resolveMutation(err, () => this.getList());
  }

  public async resetPassword(params: API.setAccountPassword.Params) {
    const [err] = await this.api.setAccountPassword(params);
    return resolveMutation(err, () => this.getList());
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const AccountStoreContext = createContext<AccountStore>({} as AccountStore);

export default AccountStoreContext;
