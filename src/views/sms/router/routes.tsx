import { RouteTypes } from "@/router/routes";
import { SmsFullPath, SmsPath } from "./path";

import Period from "../modules/period";
import AmsCategory from "../modules/ams-category";
import AmsAssets from "../modules/ams-assets";
import AmsConsumables from "../modules/ams-consumables";

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
  {
    path: SmsPath.AMS_CONSUMABLES,
    component: AmsConsumables,
    title: "易耗品管理",
    fullPath: SmsFullPath.AMS_CONSUMABLES,
  },
];

export default Routes;
