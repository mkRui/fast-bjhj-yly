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
  /** false=未读列表，true=已读列表 */
  public readFlag = false;
  public list: API.List.RecordItem[] = [];

  constructor() {
    super(new Api(axios));
    makeObservable(this, {
      loading: observable,
      unreadCount: observable,
      readFlag: observable,
      list: observable,
      $setLoading: action,
      $setUnreadCount: action,
      $setReadFlag: action,
      $setList: action,
    });
  }

  public $setLoading(loading: boolean): void {
    this.loading = loading;
  }

  public $setUnreadCount(count: number): void {
    this.unreadCount = count;
  }

  public $setReadFlag(readFlag: boolean): void {
    this.readFlag = readFlag;
  }

  public $setList(list: API.List.RecordItem[]): void {
    this.list = list;
  }

  public async fetchUnreadCount(): Promise<void> {
    const [err, data] = await this.api.getUnreadCount();
    if (!err && typeof data === "number") {
      this.$setUnreadCount(data);
    }
  }

  public async fetchList(): Promise<void> {
    this.$setLoading(true);
    const [err, data] = await this.api.getList({ readFlag: this.readFlag });
    this.$setLoading(false);
    if (!err) this.$setList(Array.isArray(data) ? data : []);
  }

  public async markRead(id: string) {
    this.$setLoading(true);
    const [err] = await this.api.read({ id });
    this.$setLoading(false);
    return resolveMutation(err, async () => {
      await this.fetchList();
      await this.fetchUnreadCount();
    });
  }

  public async markAllRead() {
    this.$setLoading(true);
    const [err] = await this.api.readAll();
    this.$setLoading(false);
    return resolveMutation(err, async () => {
      await this.fetchList();
      await this.fetchUnreadCount();
    });
  }
}

const NotificationContext = createContext<NotificationStore>(
  {} as NotificationStore
);

export default NotificationContext;
