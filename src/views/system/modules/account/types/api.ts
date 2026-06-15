/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace Account {
    export interface Params {
      keyword?: string;
      current: number;
      size: number;
    }

    export interface Records {
      /*用户id */
      id: string;

      /*密码 */
      password: string;

      /*是否启用 */
      enableFlag: boolean;

      /*是否锁定 */
      lockFlag: boolean;

      /*账号 */
      account: string;

      /*上次登录时间 */
      lastLoginTime: Record<string, unknown>;

      /*上次登录ip */
      lastLoginAt: string;
    }

    export interface Data {
      size: number;
      pages: number;
      total: number;
      current: number;
      records: Records[];
    }
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace AddAccount {
    export interface Params {
      enableFlag?: boolean;
      lockFlag?: boolean;
      account?: string;
      phone?: string;
      email?: string;
      nickname?: string;
      avatar?: string;
      description?: string;
      roleList?: unknown[];
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

  export namespace EditAccount {
    export interface Params extends API.AddAccount.Params {
      id: string;
      enableFlag?: boolean;
      lockFlag?: boolean;
      roleList?: unknown[];
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
