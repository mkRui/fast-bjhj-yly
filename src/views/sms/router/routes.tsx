import { RouteTypes } from "@/router/routes";
import { SmsFullPath, SmsPath } from "./path";

import Period from "../modules/period";
import AmsCategory from "../modules/ams-category";
import AmsAssets from "../modules/ams-assets";

const Routes: RouteTypes[] = [
  {
    path: SmsPath.PERIOD,
    component: Period,
    title: "周期管理",
    fullPath: SmsFullPath.PERIOD,
  },
  {
    path: SmsPath.AMS_CATEGORY,
    component: AmsCategory,
    title: "资产分类",
    fullPath: SmsFullPath.AMS_CATEGORY,
  },
  {
    path: SmsPath.AMS_ASSETS,
    component: AmsAssets,
    title: "固定资产",
    fullPath: SmsFullPath.AMS_ASSETS,
  },
];

export default Routes;
