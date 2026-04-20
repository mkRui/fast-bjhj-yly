/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace Account {
    export interface Params {
      keyword?: string;
    }

    export interface Data {
      /*编辑id */
      id: string;

      /*昵称 */
      nickname: string;

      /*头像 */
      avatar: string;

      /*手机号 */
      phone: string;

      /*电子邮箱 */
      email: string;

      /*描述 */
      description: string;
    }

    export type Response = BaseRequest.Response<Data[]>;
  }

  export namespace AddAccount {
    export interface Params {
      /*昵称 */
      nickname?: string;

      /*头像 */
      avatar?: string;

      /*手机号 */
      phone?: string;

      /*电子邮箱 */
      email?: string;

      /*描述 */
      description?: string;

      /*账号 */
      account?: string;

      /*管理的频道id */
      channelList?: Record<string, unknown>[];
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace DelAccount {
    export interface Params {
      id: string;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace setAccountPassword {
    export interface Params {
      id: string;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }
}
