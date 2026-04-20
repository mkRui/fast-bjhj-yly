/*
 * @Author: mkRui
 * @Date: 2021-10-26 23:40:41
 * @LastEditTime: 2021-10-26 23:41:45
 */
import { BaseRequest } from "mor-request";
// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace API {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace UploadData {
    export interface Data {
      filePath: string;
      fileUrl: string;
    }

    export type Response = BaseRequest.Response<Data>;
  }
}
