import { RouteTypes } from "@/router/routes";
import { TmsFullPath, TmsPath } from "./path";

import Teacher from "../modules/teacher";
import Work from "../modules/work";
import WorkDetail from "../modules/work/detail";
import Leave from "../modules/leave";
import Exhibition from "../modules/exhibition";

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
    path: TmsPath.WORK_DETAIL,
    component: WorkDetail,
    title: "课时详情",
    fullPath: TmsFullPath.WORK_DETAIL,
  },
  {
    path: TmsPath.LEAVE,
    component: Leave,
    title: "请假管理",
    fullPath: TmsFullPath.LEAVE,
  },
  {
    path: TmsPath.EXHIBITION,
    component: Exhibition,
    title: "展会信息",
    fullPath: TmsFullPath.EXHIBITION,
  },
];

export default Routes;
