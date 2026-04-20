/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-04-28 15:03:08
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-23 18:30:51
 * @FilePath: /fast-bjhj-website-admin/src/router/page-all.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { dynamicImport } from "@/utils/react/lazy-load";

// 使用动态导入实现代码分割
const Login = dynamicImport(() => import("@/views/login"));
const AuthGate = dynamicImport(() => import("@/views/auth-gate"));
const Main = dynamicImport(() => import("@/layout/main"));
const System = dynamicImport(() => import("@/views/system"));
const Cms = dynamicImport(() => import("@/views/cms"));
const Operation = dynamicImport(() => import("@/views/operation"));
const Business = dynamicImport(() => import("@/views/business"));
const Sort = dynamicImport(() => import("@/views/sort"));
const Product = dynamicImport(() => import("@/views/product"));
const Welcome = dynamicImport(() => import("@/views/welcome"));

export default {
  Login,
  AuthGate,
  Main,
  System,
  Cms,
  Operation,
  Business,
  Sort,
  Product,
  Welcome,
};
