import { makeObservable, observable, action } from "mobx";
import { createContext } from "react";
import axios from "@/api";
import { Store } from "mor-request";

import { Api } from "../api";
import { API } from "../types/api";

export class ProductStore extends Store<Api> {
  public loading: boolean = false;

  public params: API.List.Params = {
    current: 1,
    size: 10,
    categoryId: undefined,
    keyword: undefined,
  };

  public paramList: API.ParamList.Data[] = [];

  public data: API.List.Data = {
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
      paramList: observable,
      $setParamList: action,
    });
  }

  public $setParamList(list: API.ParamList.Data[]) {
    this.paramList = list;
  }

  public $setParams(params: Partial<API.List.Params>) {
    Object.assign(this.params, params);
  }

  public $setData(data: API.List.Data) {
    Object.assign(this.data, data);
  }

  public get list() {
    return this.data.records;
  }

  public $setLoading(loading: boolean) {
    this.loading = loading;
  }

  // 获取规格参数列表
  public async getParamList(
    params?: API.ParamList.Params
  ): Promise<API.ParamList.Data[] | undefined> {
    const [err, data] = await this.api.getParamList(params);
    if (!err) {
      this.$setParamList(data);
      return data;
    }
  }

  // 获取列表
  public async getList(): Promise<void> {
    this.$setLoading(true);
    const [err, data] = await this.api.getPage(this.params);
    this.$setLoading(false);
    if (!err) {
      this.$setData(data);
    }
  }

  // 删除
  public async delItem(
    id: number | string
  ): Promise<API.DelItem.Data | undefined> {
    const [err, data] = await this.api.delItem({ id });
    if (!err) {
      this.getList();
      return data;
    }
  }

  // 新增
  public async addItem(
    params: API.AddItem.Params
  ): Promise<API.AddItem.Data | undefined | true> {
    const [err, data] = await this.api.addItem(params);
    if (!err) {
      this.getList();
      return data || true;
    }
  }

  // 编辑
  public async setItem(
    params: API.EditItem.Params
  ): Promise<API.EditItem.Data | undefined | true> {
    const [err, data] = await this.api.editItem(params);
    if (!err) {
      this.getList();
      return data || true;
    }
  }

   // 编辑产品属性
  public async setProductAttr(
    params: API.EditProductAttr.Params
  ): Promise<API.EditProductAttr.Data | undefined | true> {
    const [err, data] = await this.api.editProductAttr(params);
    if (!err) {
      return data || true;
    }
  }

  // 修改
  public async setProductParam(
    params: API.SetProductParam.Params
  ): Promise<boolean | undefined> {
    const [err] = await this.api.setProductParam(params);
    if (!err) {
      this.getList();
      return true;
    }
  }

  // 获取规格参数列表
  public async getProductParam(
    productId: string
  ): Promise<API.GetProductParam.Data[] | undefined> {
    const [err, data] = await this.api.getProductParam({ productId });
    if (!err) {
      return data;
       }
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const ProductStoreContext = createContext<ProductStore>({} as ProductStore);

export default ProductStoreContext;
