import { SortPath, SortFullPath } from "./path";
import { RouteTypes } from "@/router/routes";

import Category from "../modules/category";
import CategoryParam from "../modules/category-param";
import CategoryParamItem from "../modules/category-param-item";

const Routes: RouteTypes[] = [
  {
    path: SortPath.SORT_CATEGORY,
    component: Category,
    title: "产品分类",
    fullPath: SortFullPath.SORT_CATEGORY,
  },
  {
    path: SortPath.SORT_CATEGORY_PARAM,
    component: CategoryParam,
    title: "产品分类参数",
    fullPath: SortFullPath.SORT_CATEGORY_PARAM,
  },
  {
    path: SortPath.SORT_CATEGORY_PARAM_ITEM,
    component: CategoryParamItem,
    title: "产品分类参数项",
    fullPath: SortFullPath.SORT_CATEGORY_PARAM_ITEM,
  },
];

export default Routes;
