/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { AxiosInstance } from "axios";
import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import Api from "../api";
import { API } from "../types";
export class RoleStore extends Store<Api> {
  public params: API.UserRoleList.Params = {
    userId: 0,
  };

  public data: API.RoleList.Data[] = [];

  public userRoleList: API.UserRoleList.Data[] = [];

  constructor(axios: AxiosInstance) {
    super(new Api(axios));
    makeObservable(this, {
      userRoleList: observable,
      params: observable,
      data: observable,
      $setUserRoleList: action,
      $setParams: action,
      $setData: action,
    });
  }

  public $setUserRoleList(data: API.UserRoleList.Data[]): void {
    this.userRoleList = data;
  }

  public $setData(data: API.RoleList.Data[]): void {
    this.data = data;
  }

  public $setParams(data: Partial<API.UserRoleList.Params>): void {
    Object.assign(this.params, data);
  }

  public async getData(): Promise<void> {
    const [, data] = await this.api.getRoleList();
    if (data) this.$setData(data);
  }

  public async getUserRoleList(): Promise<void> {
    const [, data] = await this.api.getUserRoleList(this.params);
    if (data) this.$setUserRoleList(data);
  }
}

const RoleContext = createContext<RoleStore>({} as RoleStore);

export default RoleContext;
