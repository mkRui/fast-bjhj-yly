/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-04-28 15:03:08
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-26 14:41:18
 * @FilePath: /fast-bjhj-website-admin/src/api/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CreateAxios } from "mor-request";
import morStorage from "@/utils/common/local-storage";
import eventDispatch from "@/utils/common/event-dispatch";
const IS_DEV = process.env.NODE_ENV !== "production";

export const baseURL = IS_DEV
  ? "/webapi"
  : (document.getElementById("base") as any).defaultValue;

const axios = CreateAxios(
  {
    baseURL,
    timeout: 1000 * 60 * 5,
    withCredentials: true,
    headers: {
      requestPayload: true,
    },
  },
  (config: any) => {
    const token = morStorage.getItem("token");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  ({ type, msg, code }) => {
    console.log(type, msg, code);
    if (code === 2) {
      eventDispatch.emit("login");
    }
  }
);

export default axios;

// 导出原有的API类
export { Api } from "./api";

// 导出新的API服务管理功能
export * from "./service-manager";
export * from "./services";
export * from "./api-config";
