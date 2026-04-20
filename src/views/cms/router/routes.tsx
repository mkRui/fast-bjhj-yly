import { CmsPath, CmsFullPath } from "./path";
import { RouteTypes } from "@/router/routes";

import Template from "../modules/template";

const Routes: RouteTypes[] = [
  {
    path: CmsPath.CMS_TEMPLATE,
    component: Template,
    title: "模版管理",
    fullPath: CmsFullPath.CMS_TEMPLATE,
  },
];

export default Routes;
