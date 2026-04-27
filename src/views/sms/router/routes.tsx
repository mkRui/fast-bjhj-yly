import { RouteTypes } from "@/router/routes";
import { SmsFullPath, SmsPath } from "./path";

import Period from "../modules/period";

const Routes: RouteTypes[] = [
  {
    path: SmsPath.PERIOD,
    component: Period,
    title: "周期管理",
    fullPath: SmsFullPath.PERIOD,
  },
];

export default Routes;

