/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-12-23 15:57:37
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-25 10:39:44
 * @FilePath: /fast-bjhj-website-admin/src/micro/select-category-param/store/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { AxiosInstance } from "axios";
import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import Api from "../api";
import { API } from "../types";
export class TemplateListStore extends Store<Api> {
  public data: API.CategoryParamList.Data[] = [];

  constructor(axios: AxiosInstance) {
    super(new Api(axios));
    makeObservable(this, {
      data: observable,
      $setData: action,
    });
  }

  public $setData(data: API.CategoryParamList.Data[]): void {
    this.data = data;
  }
 
  public async getData(categoryId: string | number): Promise<void> {
    const [, data] = await this.api.getCategoryParamList({ categoryId });
    if (data) this.$setData(data);
  }
}

const TemplateListContext = createContext<TemplateListStore>(
  {} as TemplateListStore
);

export default TemplateListContext;
