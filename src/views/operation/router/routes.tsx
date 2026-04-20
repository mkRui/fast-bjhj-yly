import { OperationFullPath, OperationPath } from "./path";
import { RouteTypes } from "@/router/routes";

import Channel from "../modules/channel";
import Editor from "../modules/editor";
import Page from "../modules/page";

const Routes: RouteTypes[] = [
  {
    path: OperationPath.OPERATION_CHANNEL,
    component: Channel,
    title: "频道管理",
    fullPath: OperationFullPath.OPERATION_CHANNEL,
  },
  {
    path: OperationPath.OPERATION_EDITOR,
    component: Editor,
    title: "编辑管理",
    fullPath: OperationFullPath.OPERATION_EDITOR,
  },
  {
    path: OperationPath.OPERATION_PAGE,
    component: Page,
    title: "页面管理",
    fullPath: OperationFullPath.OPERATION_PAGE,
  },
];

export default Routes;
