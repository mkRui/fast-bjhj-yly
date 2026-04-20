/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-06-10 19:10:06
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2026-01-06 17:29:26
 * @FilePath: /fast-bjhj-website-admin/src/views/operation/modules/channel/store/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { makeObservable, observable, action } from "mobx";
import { createContext } from "react";
import axios from "@/api";
import { Store } from "mor-request";

import { Api } from "../api";
import { API } from "../types/api";

export class ChannelStore extends Store<Api> {
  public loading: boolean = false;

  public list: API.List.Data[] = [];

  public metaList: API.MetaList.Data[] = [];
  constructor() {
    super(new Api(axios));
    makeObservable(this, {
      list: observable,
      $setList: action,
      loading: observable,
      $setLoading: action,
      metaList: observable,
    });
  }

  public $setList(list: API.List.Data[]) {
    this.list = list;
  }

  public $setMetaList(list: API.MetaList.Data[]) {
    this.metaList = list;
  }

  public $setLoading(loading: boolean) {
    this.loading = loading;
  }

  // 获取列表
  public async getList(
    params?: API.List.Params,
  ): Promise<API.List.Data[] | undefined> {
    this.$setLoading(true);
    const [err, data] = await this.api.getResPage(params);
    this.$setLoading(false);
    if (!err) {
      this.$setList(data);
      return data;
    }
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
    const [err, data] = await this.api.getRes(params);
    if (!err) {
      return data;
    }
  }

  // 删除
  public async delItem(
    params?: API.DelRes.Params,
  ): Promise<boolean | undefined> {
    const [err] = await this.api.delRes(params);
    if (!err) {
      this.getList();
      return true;
    }
  }

  // 编辑
  public async setItem(
    params?: API.SetRes.Params,
  ): Promise<boolean | undefined> {
    const [err] = await this.api.setRes(params);
    if (!err) {
      this.getList();
      return true;
    }
  }

  // 新增
  public async addItem(
    params?: API.AddRes.Params,
  ): Promise<boolean | undefined> {
    const [err] = await this.api.addRes(params);
    if (!err) {
      this.getList();
      return true;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const ChannelStoreContext = createContext<ChannelStore>({} as ChannelStore);

export default ChannelStoreContext;
