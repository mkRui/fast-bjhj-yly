/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { AxiosInstance } from "axios";
import { makeObservable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import Api from "../api";
import { API } from "../types";

export class ChangPasswordStore extends Store<Api> {
  constructor(axios: AxiosInstance) {
    super(new Api(axios));
    makeObservable(this, {});
  }

  public async changePassword(
    params: API.ChangePassword.Params
  ): Promise<boolean | undefined> {
    const [err] = await this.api.changePassword(params);
    if (!err) {
      return true;
    }
  }
}

const ChangPasswordContext = createContext<ChangPasswordStore>(
  {} as ChangPasswordStore
);

export default ChangPasswordContext;
