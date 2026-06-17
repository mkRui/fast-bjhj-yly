import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import axios from "@/api";
import { resolveMutation } from "@/utils/common/mutation-success";
import { Api } from "../api";
import { API } from "../types/api";

export class NotificationStore extends Store<Api> {
  public loading = false;
  public unreadCount = 0;

  public params: API.Page.Params = {
    state: undefined,
    current: "0",
    size: "10",
  };

  public page: API.Page.Data = {
    size: 10,
    pages: 0,
    total: 0,
    records: [],
    current: 0,
  };

  constructor() {
    super(new Api(axios));
    makeObservable(this, {
      loading: observable,
      unreadCount: observable,
      params: observable,
      page: observable,
      $setLoading: action,
      $setUnreadCount: action,
      $setParams: action,
      $setPage: action,
    });
  }

  public $setLoading(loading: boolean): void {
    this.loading = loading;
  }

  public $setUnreadCount(count: number): void {
    this.unreadCount = count;
  }

  public $setParams(params: Partial<API.Page.Params>): void {
    Object.assign(this.params, params);
  }

  public $setPage(data: API.Page.Data): void {
    this.page = data;
  }

  public async fetchUnreadCount(): Promise<void> {
    const [err, data] = await this.api.getUnreadCount();
    if (!err && typeof data === "number") {
      this.$setUnreadCount(data);
    }
  }

  public async fetchPage(): Promise<void> {
    this.$setLoading(true);
    const [err, data] = await this.api.getPage(this.params);
    this.$setLoading(false);
    if (!err) this.$setPage(data);
  }

  public async markRead(id: string) {
    this.$setLoading(true);
    const [err] = await this.api.read({ id });
    this.$setLoading(false);
    return resolveMutation(err, async () => {
      await this.fetchPage();
      await this.fetchUnreadCount();
    });
  }

  public async markAllRead() {
    this.$setLoading(true);
    const [err] = await this.api.readAll();
    this.$setLoading(false);
    return resolveMutation(err, async () => {
      await this.fetchPage();
      await this.fetchUnreadCount();
    });
  }
}

const NotificationContext = createContext<NotificationStore>(
  {} as NotificationStore
);

export default NotificationContext;
