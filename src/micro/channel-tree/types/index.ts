/* eslint-disable @typescript-eslint/no-namespace */

import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace ChannelTree {
    export interface Params {
      roleId: number;
    }

    export interface Data {
      id: string;
      parentId?: any;
      templateId: string;
      name: string;
      pageSize: number;
      sort: number;
      newWindowFlag: boolean;
      hiddenFlag: boolean;
      remark: string;
      linkFlag: boolean;
      linkUrl?: any;
      path: string;
      accessibleFlag: boolean;
    }

    export interface TreeData {
      id: string;
      parentId?: any;
      name: string;
      order: number;
      children: TreeData[];
    }

    export type Response = BaseRequest.Response<TreeData[]>;
  }
}
