/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-12-23 18:10:57
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-24 20:23:31
 * @FilePath: /fast-bjhj-website-admin/src/views/product/router/routes.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ProductPath, ProductFullPath } from "./path";
import { RouteTypes } from "@/router/routes";

import Product from "../modules/product";

const Routes: RouteTypes[] = [
  {
    path: ProductPath.PRODUCT_MAIN,
    component: Product,
    title: "产品管理",
    fullPath: ProductFullPath.PRODUCT_MAIN,
  },
];

export default Routes;
