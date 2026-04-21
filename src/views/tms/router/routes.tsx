import { RouteTypes } from "@/router/routes";
import { TmsFullPath, TmsPath } from "./path";

import Teacher from "../modules/teacher";
import Work from "../modules/work";

const Routes: RouteTypes[] = [
  {
    path: TmsPath.TEACHER,
    component: Teacher,
    title: "教师管理",
    fullPath: TmsFullPath.TEACHER,
  },
  {
    path: TmsPath.WORK,
    component: Work,
    title: "课时管理",
    fullPath: TmsFullPath.WORK,
  },
];

export default Routes;

