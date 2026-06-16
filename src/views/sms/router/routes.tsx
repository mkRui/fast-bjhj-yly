import { RouteTypes } from "@/router/routes";
import { SmsFullPath, SmsPath } from "./path";

import AmsCategory from "../modules/ams-category";
import AmsAssets from "../modules/ams-assets";
import AmsConsumables from "../modules/ams-consumables";
import AmsAssetsCheck from "../modules/ams-assets-check";
import AmsConsumablesCheck from "../modules/ams-consumables-check";
import Car from "../modules/car";
import CarApply from "../modules/car-apply";

const Routes: RouteTypes[] = [
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
  {
    path: SmsPath.AMS_ASSETS_CHECK,
    component: AmsAssetsCheck,
    title: "固定资产审批",
    fullPath: SmsFullPath.AMS_ASSETS_CHECK,
  },
  {
    path: SmsPath.AMS_CONSUMABLES_CHECK,
    component: AmsConsumablesCheck,
    title: "易耗品审批",
    fullPath: SmsFullPath.AMS_CONSUMABLES_CHECK,
  },
  {
    path: SmsPath.CAR,
    component: Car,
    title: "车型管理",
    fullPath: SmsFullPath.CAR,
  },
  {
    path: SmsPath.CAR_APPLY,
    component: CarApply,
    title: "用车审核",
    fullPath: SmsFullPath.CAR_APPLY,
  },
];

export default Routes;
