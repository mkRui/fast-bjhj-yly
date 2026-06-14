/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { AxiosInstance } from "axios";
import { makeObservable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import { resolveMutation } from "@/utils/common/mutation-success";

import Api from "../api";
import { API } from "../types";

export class ChangPasswordStore extends Store<Api> {
  constructor(axios: AxiosInstance) {
    super(new Api(axios));
    makeObservable(this, {});
  }

  public async changePassword(params: API.ChangePassword.Params) {
    const [err] = await this.api.changePassword(params);
    return resolveMutation(err);
  }
}

const ChangPasswordContext = createContext<ChangPasswordStore>(
  {} as ChangPasswordStore
);

export default ChangPasswordContext;
