import { Request } from "mor-request";
import { API } from "./type";

/**
 * 主要API服务类
 * 继承于mor-request的Request类，提供标准的API请求方法
 */
export class Api extends Request {
  /**
   * 初始化接口
   * 获取系统初始化信息
   */
  public async init(): Promise<API.Init.Response> {
    return await this.get<API.Init.Data>(`/sso/init`);
  }

  /**
   * 退出登录接口
   * 用户登出系统
   */
  public async logout(): Promise<API.Logout.Response> {
    return await this.post<API.Logout.Data>(`/sso/logout`, {});
  }

  /**
   * 获取枚举数据接口
   * 获取系统所有枚举配置
   */
  public async getEnum(): Promise<API.GetEnum.Response> {
    return await this.get<API.GetEnum.Data[]>(`/common/dict`);
  }
}
