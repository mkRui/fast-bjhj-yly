import { BusinessPath, BusinessFullPath } from "./path";
import { RouteTypes } from "@/router/routes";

import Cooperate from "../modules/cooperate";

const Routes: RouteTypes[] = [
  {
    path: BusinessPath.BUSINESS_TEMPLATE,
    component: Cooperate,
    title: "意向收集",
    fullPath: BusinessFullPath.BUSINESS_TEMPLATE,
  },
];

export default Routes;
