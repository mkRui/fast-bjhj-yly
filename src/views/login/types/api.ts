/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace Login {
    export interface Params {
      account: string;
      password: string;
      captchaKey: string;
      captchaCode: string;
      autoLoginFlag: boolean;
    }

    export interface Data {
      tokenName: string;
      tokenValue: string;
      isLogin: boolean;
      loginId: string;
      loginType: string;
      tokenTimeout: number;
      sessionTimeout: number;
      tokenSessionTimeout: number;
      tokenActivityTimeout: number;
      loginDevice: string;
      tag: string;
    }

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace Captcha {
    export interface Data {
      captchaKey: string;
      captchaBase64: string;
    }

    export type Response = BaseRequest.Response<Data>;
  }
}
