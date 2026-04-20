import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";
import axios from "@/api";

import { Api } from "../api";
import { API } from "../types/api";

export class AuthStore extends Store<Api> {
  public params: API.Login.Params = {
    account: "",
    password: "",
    captchaKey: "",
    captchaCode: "",
    autoLoginFlag: true,
  };

  public captchaImage = "";

  constructor() {
    super(new Api(axios));
    makeObservable(this, {
      params: observable,
      captchaImage: observable,
      $setParams: action,
      $setCaptchaImage: action,
    });
  }

  public $setParams(params: Partial<API.Login.Params>): void {
    Object.assign(this.params, {
      ...params,
    });
  }

  public $setCaptchaImage(img: string): void {
    this.captchaImage = img;
  }

  public async login(): Promise<API.Login.Data | undefined> {
    const res = await this.api.login(this.params);
    if (res) {
      return res;
    } else {
      void this.getCaptcha();
    }
  }

  public async getCaptcha(): Promise<void> {
    const res = await this.api.captcha();
    if (res) {
      this.$setParams({
        captchaKey: res.captchaKey,
      });
      this.$setCaptchaImage(res.captchaBase64);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const AuthContext = createContext<AuthStore>({} as AuthStore);

export default AuthContext;
