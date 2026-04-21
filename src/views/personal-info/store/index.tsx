import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import axios from "@/api";
import { Api } from "../api";
import { API } from "../types/api";

export class PersonalInfoStore extends Store<Api> {
  public loading = false;
  public data: API.TeacherInfo.Data | null = null;

  constructor() {
    super(new Api(axios));
    makeObservable(this, {
      loading: observable,
      data: observable,
      $setLoading: action,
      $setData: action,
    });
  }

  public $setLoading(loading: boolean): void {
    this.loading = loading;
  }

  public $setData(data: API.TeacherInfo.Data | null): void {
    this.data = data;
  }

  public async getInfo(): Promise<API.TeacherInfo.Data | null> {
    this.$setLoading(true);
    const [err, data] = await this.api.getTeacherInfo();
    this.$setLoading(false);
    if (!err) {
      this.$setData(data);
      return data;
    }
    return null;
  }

  public async editInfo(params: API.EditTeacherInfo.Params): Promise<boolean> {
    this.$setLoading(true);
    const [err] = await this.api.editTeacherInfo(params);
    this.$setLoading(false);
    if (!err) {
      await this.getInfo();
      return true;
    }
    return false;
  }
}

const PersonalInfoContext = createContext<PersonalInfoStore>(
  {} as PersonalInfoStore
);

export default PersonalInfoContext;
