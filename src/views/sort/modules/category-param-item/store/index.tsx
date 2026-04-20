/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-12-23 16:33:07
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-24 20:25:16
 * @FilePath: /fast-bjhj-website-admin/src/views/sort/modules/category-param-item/store/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { makeObservable, observable, action } from "mobx";
import { createContext } from "react";
import axios from "@/api";
import { Store } from "mor-request";

import { Api } from "../api";
import { API } from "../types/api";

export class AccountStore extends Store<Api> {
  public loading: boolean = false;
  public list: API.List.Data[] = [];
  public params: API.List.Params = {
    categoryId: "",
    paramId: "",
  };

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

  public $setParams(params: Partial<API.List.Params>) {
    this.params = { ...this.params, ...params };
  }

  // 获取列表
  public async getList(params?: API.List.Params): Promise<void> {
    if (params) {
      this.$setParams(params);
    }
    // 只有当两个ID都有值时才请求
    if (!this.params.categoryId || !this.params.paramId) {
      this.$setList([]);
      return;
    }

    this.$setLoading(true);
    const [err, data] = await this.api.getList(this.params);
    this.$setLoading(false);
    if (!err) {
      this.$setList(data);
    }
  }

  // 删除
  public async delItem(id: number): Promise<API.DelItem.Data | undefined> {
    const [err, data] = await this.api.delItem({ id });
    if (!err) {
      this.getList();
      return data;
    }
  }

  // 新增
  public async addItem(params: API.AddItem.Params): Promise<true | undefined> {
    const [err] = await this.api.addItem(params);
    if (!err) {
      this.getList();
      return true;
    }
  }

  // 编辑
  public async setItem(
    params: API.EditItem.Params
  ): Promise<boolean | undefined> {
    const [err] = await this.api.setItem(params);
    if (!err) {
      this.getList();
      return true;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const AccountStoreContext = createContext<AccountStore>({} as AccountStore);

export default AccountStoreContext;
