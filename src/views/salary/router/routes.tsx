import { RouteTypes } from "@/router/routes";
import { SalaryFullPath, SalaryPath } from "./path";

import SalaryBase from "../modules/salary-base";
import SalaryCalc from "../modules/salary-calc";

const Routes: RouteTypes[] = [
  {
    path: SalaryPath.BASE,
    component: SalaryBase,
    title: "基础工资",
    fullPath: SalaryFullPath.BASE,
  },
  {
    path: SalaryPath.CALC,
    component: SalaryCalc,
    title: "工资测算",
    fullPath: SalaryFullPath.CALC,
  },
];

export default Routes;
