import { SystemPath, SystemFullPath } from "./path";
import { RouteTypes } from "@/router/routes";

import Account from "../modules/account";
import Resources from "../modules/resources";
import Role from "../modules/role";

const Routes: RouteTypes[] = [
  {
    path: SystemPath.SYSTEM_ACCOUNT,
    component: Account,
    title: "用户管理",
    fullPath: SystemFullPath.SYSTEM_ACCOUNT,
  },
  {
    path: SystemPath.SYSTEM_RESOURCES,
    component: Resources,
    title: "资源管理",
    fullPath: SystemFullPath.SYSTEM_RESOURCES,
  },
  {
    path: SystemPath.SYSTEM_ROLE,
    component: Role,
    title: "角色管理",
    fullPath: SystemFullPath.SYSTEM_ROLE,
  },
];

export default Routes;
