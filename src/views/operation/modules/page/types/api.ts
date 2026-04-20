/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace Pages {
    export interface Params {
      query: {
        channelId?: string;
        current: number;
        size: number;
        keyword?: string;
      };
    }

    export interface Data {
      current: number;
      size: number;
      pages: number;
      total: number;
      records: Records[];
    }

    export interface Records {
      /*文章id */
      id: string;

      /*模板id */
      templateId: number;

      /*是否置顶 */
      topFlag: boolean;

      /*页面名称 */
      name: string;

      /*是否发布 */
      publishFlag: boolean;

      /*发布时间 */
      publishTime: Record<string, unknown>;

      /*发布编辑id */
      publishEditorId: number;

      /*发布编辑名称 */
      publishEditorName: string;

      /*是否显示来源 */
      showSourceFlag: boolean;

      /*来源 */
      source: string;

      /*来源链接 */
      sourceLink: string;
    }

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace DelItem {
    export interface Params {
      id: string;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace AddItem {
    export interface Params {
      name: string;
      code: string;
      parentId?: string | null;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace SetItem {
    export interface Params {
      id: string;
      page: API.AddItem.Params;
    }

    export type Data = null;

    export type Response = BaseRequest.Response<Data>;
  }

  export namespace MetaList {
    export interface Params {
      templateId: string;
    }

    export interface Data {
      id: number;
      templateId: number;
      name: string;
      keyName: string;
      type: number;
      requiredFlag: boolean;
    }

    export type Response = BaseRequest.Response<Data[]>;
  }

  export namespace GetRes {
    export interface Params {
      pageId: string;
      language?: string;
    }

    export interface Data {
      id: number;
      templateId: number;
      name: string;
      keyName: string;
      type: number;
      requiredFlag: boolean;
    }

    export type Response = BaseRequest.Response<Data>;
  }
}
