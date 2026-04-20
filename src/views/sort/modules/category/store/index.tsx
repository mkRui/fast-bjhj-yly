/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-06-06 17:00:11
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-23 15:53:36
 * @FilePath: /fast-bjhj-website-admin/src/views/sort/modules/category/store/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { makeObservable, observable, action } from "mobx";
import { createContext } from "react";
import axios from "@/api";
import { Store } from "mor-request";

import { Api } from "../api";
import { API } from "../types/api";

export class CategoryStore extends Store<Api> {
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
    const [err, data] = await this.api.getCategoryList(params);
    this.$setLoading(false);
    if (!err) {
      this.$setList(data);
      return data;
    }
  }

  // 删除
  public async delItem(
    params?: API.DelCategory.Params
  ): Promise<boolean | undefined> {
    const [err] = await this.api.delCategory(params);
    if (!err) {
      this.getList();
      return true;
    }
  }

  // 删除
  public async setItem(
    params?: API.EditCategory.Params
  ): Promise<boolean | undefined> {
    const [err] = await this.api.editCategory(params);
    if (!err) {
      this.getList();
      return true;
    }
  }

  // 删除
  public async addItem(
    params?: API.AddCategory.Params
  ): Promise<boolean | undefined> {
    const [err] = await this.api.addCategory(params);
    if (!err) {
      this.getList();
      return true;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const Context = createContext<CategoryStore>({} as CategoryStore);

export default Context;
