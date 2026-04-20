/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace Intention {
    export interface Params {
      current: number;
      size: number;
    }

    export interface Records {
      id: string;

      /*合作区域(枚举) */
      area: number;

      /*合作类型(枚举) */
      mode: number;

      /*联系人 */
      contacts: string;

      /*电子邮箱 */
      email: string;

      /*联系电话 */
      phone: string;

      /*公司名称 */
      companyName: string;

      /*是否已回复 */
      repliedFlag: boolean;
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

  export namespace SetIntention {
    export interface Params {
      id: string;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }
}
