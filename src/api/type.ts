/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace Init {
    export interface Data {
      loginUser: User;
      resList: string[];
      roleList: RoleList[];
    }

    export interface RoleList {
      id: string;
      name: string;
      code: string;
    }

    export interface User {
      /*用户id */
      id: number;
      /*是否启用 */
      enableFlag: boolean;
      /*是否锁定 */
      lockFlag: boolean;
      /*账号 */
      account: string;
      userInfo?: UserInfo;
    }

    export interface UserInfo {
      /*编辑id */
      id: number;

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

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace Logout {
    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace GetEnum {
    export interface Data {
      code: string;
      desc: string;
      dict: Dict[];
    }

    export interface Dict {
      code: string;
      desc: string;
    }

    export type Response = BaseRequest.Response<Data[]>;
  }
}
