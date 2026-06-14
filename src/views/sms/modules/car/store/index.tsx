import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import axios from "@/api";
import { resolveMutation } from "@/utils/common/mutation-success";
import { Api } from "../api";
import { API } from "../types/api";

export class CarStore extends Store<Api> {
  public loading = false;
  public list: API.List.Data[] = [];

  constructor() {
    super(new Api(axios));
    makeObservable(this, {
      loading: observable,
      list: observable,
      $setLoading: action,
      $setList: action,
    });
  }

  public $setLoading(loading: boolean): void {
    this.loading = loading;
  }

  public $setList(list: API.List.Data[]): void {
    this.list = Array.isArray(list) ? list : [];
  }

  public async getList(): Promise<void> {
    this.$setLoading(true);
    const [err, data] = await this.api.getList();
    this.$setLoading(false);
    if (!err) this.$setList(data);
  }

  public async addItem(params: API.Add.Params) {
    this.$setLoading(true);
    const [err] = await this.api.add(params);
    this.$setLoading(false);
    return resolveMutation(err, () => this.getList());
  }

  public async editItem(params: API.Edit.Params) {
    this.$setLoading(true);
    const [err] = await this.api.edit(params);
    this.$setLoading(false);
    return resolveMutation(err, () => this.getList());
  }

  public async delItem(id: string) {
    this.$setLoading(true);
    const [err] = await this.api.del({ id });
    this.$setLoading(false);
    return resolveMutation(err, () => this.getList());
  }
}

const StoreContext = createContext<CarStore>({} as CarStore);

export default StoreContext;

