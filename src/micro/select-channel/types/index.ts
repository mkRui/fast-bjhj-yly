/* eslint-disable @typescript-eslint/no-namespace */

import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace ChannelList {
    export interface Data {
      id: number;
      parentId: number;
      name: string;
      order: string;
      data: {
        /*频道id */
        id: number;

        /*父id */
        parentId: number;

        /*模板id */
        templateId: number;

        /*频道名称 */
        name: string;

        /*每页数据量 */
        pageSize: number;

        /*排序 */
        sort: number;

        /*是否新窗口打开 */
        newWindowFlag: boolean;

        /*是否隐藏 */
        hiddenFlag: boolean;

        /*备注 */
        remark: string;

        /*是否为链接 */
        linkFlag: boolean;

        /*链接地址 */
        linkUrl: string;

        /*访问路径 */
        path: string;

        /*是否可访问 */
        accessibleFlag: boolean;
      };
    }

    export type Response = BaseRequest.Response<Data[]>;
  }
}
