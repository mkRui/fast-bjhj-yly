/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace Template {
    export interface Params {
      type?: string;
    }

    export interface Data {
      /*编辑id */
      id: string;

      /*昵称 */
      name: string;

      /*头像 */
      type: string;

      /*描述 */
      enableFlag: string;
    }

    export type Response = BaseRequest.Response<Data[]>;
  }

  export namespace AddTemplate {
    export interface Params {
      /*昵称 */
      name: string;

      /*头像 */
      keyName: string;

      /*手机号 */
      type: number;

      /*电子邮箱 */
      requiredFlag: boolean;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace DelTemplate {
    export interface Params {
      id: string;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace SetTemplate {
    export interface Params {
      id: string;
      template: AddTemplate.Params;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace GetTemplateInfo {
    export interface Params {
      templateId: string;
    }

    export interface Content {
      /*模板id */
      id: number;

      /*模板内容 */
      content: string;
    }

    export interface MetaList {
      /*模板元数据id */
      id: number;

      /*模板id */
      templateId: number;

      /*名称 */
      name: string;

      /*key名称 */
      keyName: string;

      /*元数据类型(枚举) */
      type: number;

      /*是否必填 */
      requiredFlag: boolean;
    }

    export interface Data {
      content: Content;
      metaList: MetaList;
    }

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace SetTemplateContent {
    export interface Params {
      id: string;
      content: string;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }
}
