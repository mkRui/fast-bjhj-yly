import { RouteTypes } from "@/router/routes";
import { TmsFullPath, TmsPath } from "./path";

import Teacher from "../modules/teacher";
import Work from "../modules/work";
import Leave from "../modules/leave";

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
  {
    path: TmsPath.LEAVE,
    component: Leave,
    title: "请假管理",
    fullPath: TmsFullPath.LEAVE,
  },
];

export default Routes;
