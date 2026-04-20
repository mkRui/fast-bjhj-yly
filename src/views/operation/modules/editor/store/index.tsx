import { makeObservable, observable, action } from "mobx";
import { createContext } from "react";
import axios from "@/api";
import { Store } from "mor-request";

import { Api } from "../api";
import { API } from "../types/api";

export class AccountStore extends Store<Api> {
  public loading: boolean = false;

  public list: API.Account.Data[] = [];
  constructor() {
    super(new Api(axios));
    makeObservable(this, {
      list: observable,
      $setList: action,
      loading: observable,
      $setLoading: action,
    });
  }

  public $setList(list: API.Account.Data[]) {
    this.list = list;
  }

  public $setLoading(loading: boolean) {
    this.loading = loading;
  }

  // 获取列表
  public async getList(
    params?: API.Account.Params
  ): Promise<API.Account.Data[] | undefined> {
    this.$setLoading(true);
    const [err, data] = await this.api.getAccount(params);
    this.$setLoading(false);
    if (!err) {
      this.$setList(data);
      return data;
    }
  }

  // 删除
  public async delItem(id: string): Promise<API.DelAccount.Data | undefined> {
    const [err, data] = await this.api.delAccount({ id });
    if (!err) {
      this.getList();
      return data;
    }
  }

  // 新增
  public async addItem(
    params: API.AddAccount.Params
  ): Promise<boolean | undefined> {
    const [err] = await this.api.addAccount(params);
    if (!err) {
      this.getList();
      return true;
    }
  }

  // 重置密码
  public async resetPassword(
    params: API.setAccountPassword.Params
  ): Promise<API.setAccountPassword.Data | undefined> {
    const [err, data] = await this.api.setAccountPassword(params);
    if (!err) {
      this.getList();
      return data;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const AccountStoreContext = createContext<AccountStore>({} as AccountStore);

export default AccountStoreContext;
