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
const NotFound = dynamicImport(() => import("@/views/exception/not-found"));
const Forbidden = dynamicImport(() => import("@/views/exception/forbidden"));
const ServerError = dynamicImport(() => import("@/views/exception/server-error"));
const Main = dynamicImport(() => import("@/layout/main"));
const System = dynamicImport(() => import("@/views/system"));
const WelcomeRedirect = dynamicImport(
  () => import("@/views/welcome/pages/welcome-redirect")
);
const UserWork = dynamicImport(() => import("@/views/welcome/pages/work-page"));
const UserLeave = dynamicImport(() => import("@/views/welcome/pages/leave-page"));
const UserAssets = dynamicImport(() => import("@/views/welcome/pages/assets-page"));
const UserCar = dynamicImport(() => import("@/views/welcome/pages/car-page"));
const UserExhibition = dynamicImport(() => import("@/views/welcome/pages/exhibition-page"));
const PersonalInfo = dynamicImport(() => import("@/views/personal-info"));
const Notification = dynamicImport(() => import("@/views/notification"));
const Tms = dynamicImport(() => import("@/views/tms"));
const Sms = dynamicImport(() => import("@/views/sms"));
const Salary = dynamicImport(() => import("@/views/salary"));

export default {
  Login,
  AuthGate,
  NotFound,
  Forbidden,
  ServerError,
  Main,
  System,
  WelcomeRedirect,
  UserWork,
  UserLeave,
  UserAssets,
  UserCar,
  UserExhibition,
  PersonalInfo,
  Notification,
  Tms,
  Sms,
  Salary,
};
