/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { AxiosInstance } from "axios";
import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import Api from "../api";
import { API } from "../types";
export class RoleStore extends Store<Api> {
  public params: API.RoleResourceList.Params = {
    roleId: 0,
  };

  public data: API.RoleResourceList.Data[] = [];

  constructor(axios: AxiosInstance) {
    super(new Api(axios));
    makeObservable(this, {
      data: observable,
      params: observable,
      $setData: action,
      $resetData: action,
      $setParams: action,
    });
  }

  public $resetData(): void {
    this.data = [];
  }

  public $setData(data: API.RoleResourceList.DataChildren[]): void {
    for (let i = 0; i < data.length; i++) {
      const elem = data[i];
      if (elem.childrenList?.length) {
        this.$setData(elem.childrenList);
      }
      this.data.push({
        id: elem.id,
        parentId: elem.parentId,
        name: elem.name,
        code: elem.code,
        type: elem.type,
        outlinkUrl: elem.outlinkUrl,
        outlinkFlag: elem.outlinkFlag,
        selected: elem.selected,
      });
    }
  }

  public $setParams(data: Partial<API.RoleResourceList.Params>): void {
    Object.assign(this.params, data);
  }

  public async getData(): Promise<void> {
    const [,data] = await this.api.getRoleList(this.params);
    if (data) {
      this.$resetData();
      this.$setData(data);
    }
  }

  public async setData(
    params: API.SetRoleResource.Params
  ): Promise<API.SetRoleResource.Response | undefined> {
    const [,data] = await this.api.setRoleRes(params);
    if (data) {
      return data;
    }
  }
}

const RoleContext = createContext<RoleStore>({} as RoleStore);

export default RoleContext;
