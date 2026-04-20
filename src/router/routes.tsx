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

import SystemRouter from "@/views/system/router/routes";
import CmsRouter from "@/views/cms/router/routes";
import OperationRouter from "@/views/operation/router/routes";
import BusinessRouter from "@/views/business/router/routes";
import SortRouter from "@/views/sort/router/routes";
import ProductRouter from "@/views/product/router/routes";

export interface RouteTypes {
  path: string;
  fullPath?: string;
  children?: RouteTypes[];
  component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const mainRoutes: RouteTypes[] = [
  { path: BasePath.SYSTEM, component: Pages.System, children: SystemRouter },
  { path: BasePath.CMS, component: Pages.Cms, children: CmsRouter },
  {
    path: BasePath.OPERATION,
    component: Pages.Operation,
    children: OperationRouter,
  },
  {
    path: BasePath.BUSINESS,
    component: Pages.Business,
    children: BusinessRouter,
  },
  { path: BasePath.SORT, component: Pages.Sort, children: SortRouter },
  { path: BasePath.PRODUCT, component: Pages.Product, children: ProductRouter },
  {
    path: BasePath.WELCOME,
    component: Pages.Welcome,
    title: "欢迎",
    fullPath: BasePath.WELCOME,
  },
];

export const rootRoutes: RouteTypes[] = [
  { path: "/", component: Pages.AuthGate },
  { path: Path.LOGIN, component: Pages.Login },
  { path: BasePath.BASE, component: Pages.Main, children: mainRoutes },
];
