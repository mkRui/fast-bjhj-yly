/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-04-28 15:03:08
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-26 14:45:27
 * @FilePath: /fast-bjhj-website-admin/src/router/routes.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { ComponentType, JSX } from "react";
import { Path, BasePath } from "./path";
import Pages from "./page-all";
import { UserFullPath } from "@/views/user/router/path";

import SystemRouter from "@/views/system/router/routes";
import TmsRouter from "@/views/tms/router/routes";
import SmsRouter from "@/views/sms/router/routes";
import SalaryRouter from "@/views/salary/router/routes";

export interface RouteTypes {
  path: string;
  fullPath?: string;
  children?: RouteTypes[];
  component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const mainRoutes: RouteTypes[] = [
  {
    path: BasePath.WELCOME,
    component: Pages.WelcomeRedirect,
    title: "课时上报",
    fullPath: UserFullPath.SUBMIT,
  },
  {
    path: UserFullPath.SUBMIT,
    component: Pages.UserWork,
    title: "课时上报",
    fullPath: UserFullPath.SUBMIT,
  },
  {
    path: UserFullPath.LEAVE,
    component: Pages.UserLeave,
    title: "请假申请",
    fullPath: UserFullPath.LEAVE,
  },
  {
    path: UserFullPath.ASSETS,
    component: Pages.UserAssets,
    title: "资产管理",
    fullPath: UserFullPath.ASSETS,
  },
  {
    path: UserFullPath.CAR,
    component: Pages.UserCar,
    title: "用车申请",
    fullPath: UserFullPath.CAR,
  },
  {
    path: UserFullPath.EXHIBITION,
    component: Pages.UserExhibition,
    title: "展会上报",
    fullPath: UserFullPath.EXHIBITION,
  },
  {
    path: "/personal-info",
    component: Pages.PersonalInfo,
    title: "教师信息",
    fullPath: "/personal-info",
  },
  { path: BasePath.SYSTEM, component: Pages.System, children: SystemRouter },
  { path: BasePath.TMS, component: Pages.Tms, children: TmsRouter },
  { path: BasePath.SMS, component: Pages.Sms, children: SmsRouter },
  { path: BasePath.SALARY, component: Pages.Salary, children: SalaryRouter },
];

export const rootRoutes: RouteTypes[] = [
  { path: "/", component: Pages.AuthGate },
  { path: Path.LOGIN, component: Pages.Login, title: "登录", fullPath: Path.LOGIN },
  {
    path: Path.FORBIDDEN,
    component: Pages.Forbidden,
    title: "无权限",
    fullPath: Path.FORBIDDEN,
  },
  {
    path: Path.NOT_FOUND,
    component: Pages.NotFound,
    title: "页面不存在",
    fullPath: Path.NOT_FOUND,
  },
  {
    path: Path.SERVER_ERROR,
    component: Pages.ServerError,
    title: "服务器错误",
    fullPath: Path.SERVER_ERROR,
  },
  { path: BasePath.BASE, component: Pages.Main, children: mainRoutes },
  { path: "*", component: Pages.NotFound, title: "页面不存在", fullPath: Path.NOT_FOUND },
];
