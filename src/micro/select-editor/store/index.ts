/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { AxiosInstance } from "axios";
import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import Api from "../api";
import { API } from "../types";
export class SelectEditorStore extends Store<Api> {
  public data: API.RoleList.Data[] = [];

  constructor(axios: AxiosInstance) {
    super(new Api(axios));
    makeObservable(this, {
      data: observable,
      $setData: action,
    });
  }

  public $setData(data: API.RoleList.Data[]): void {
    this.data = data;
  }

  public async getData(): Promise<void> {
    const [, data] = await this.api.getEditorList();
    if (data) this.$setData(data);
  }
}

const Context = createContext<SelectEditorStore>({} as SelectEditorStore);

export default Context;
