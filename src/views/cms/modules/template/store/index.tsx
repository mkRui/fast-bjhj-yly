import { makeObservable, observable, action } from "mobx";
import { createContext } from "react";
import axios from "@/api";
import { Store } from "mor-request";

import { Api } from "../api";
import { API } from "../types/api";

export class TemplateStore extends Store<Api> {
  public loading: boolean = false;

  public list: API.Template.Data[] = [];

  constructor() {
    super(new Api(axios));
    makeObservable(this, {
      list: observable,
      $setList: action,
      loading: observable,
      $setLoading: action,
    });
  }

  public $setList(list: API.Template.Data[]) {
    this.list = list;
  }

  public $setLoading(loading: boolean) {
    this.loading = loading;
  }

  // 获取列表
  public async getList(
    params?: API.Template.Params
  ): Promise<API.Template.Data[] | undefined> {
    this.$setLoading(true);
    const [err, data] = await this.api.getTemplateList(params);
    this.$setLoading(false);
    if (!err) {
      this.$setList(data);
      return data;
    }
  }

  // 获取内容
  public async getContent(
    params: API.GetTemplateInfo.Params
  ): Promise<API.GetTemplateInfo.Data | undefined> {
    const [err, data] = await this.api.getTemplate(params);
    if (!err) {
      return data;
    }
  }

  // 获取内容
  public async setContent(
    params: API.SetTemplateContent.Params
  ): Promise<boolean | undefined> {
    const [err] = await this.api.setTemplateContent(params);
    if (!err) {
      return true;
    }
  }

  // 删除
  public async delItem(id: string): Promise<boolean | undefined> {
    const [err] = await this.api.delTemplate({ id });
    if (!err) {
      return true;
    }
  }

  // 新增
  public async addItem(
    params: API.AddTemplate.Params
  ): Promise<boolean | undefined> {
    const [err] = await this.api.addTemplate(params);
    if (!err) {
      return true;
    }
  }

  // 编辑
  public async setItem(
    params: API.SetTemplate.Params
  ): Promise<boolean | undefined> {
    const [err] = await this.api.setTemplate(params);
    if (!err) {
      return true;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const TemplateStoreContext = createContext<TemplateStore>({} as TemplateStore);

export default TemplateStoreContext;
