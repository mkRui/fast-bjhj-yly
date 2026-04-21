import { Request } from "mor-request";

import { API } from "../types/api";

export class Api extends Request {
  // 登录
  public async login(
    params: API.Login.Params
  ): Promise<API.Login.Data | undefined> {
    const [err, data] = await this.post<API.Login.Data>(`/auth/login`, params);
    if (!err) return data;
  }

  // 获取验证码图片
  public async captcha(): Promise<API.Captcha.Data | undefined> {
    const [err, data] = await this.get<API.Captcha.Data>("/auth/captcha");
    console.log(data);
    if (!err) return data;
  }
}
