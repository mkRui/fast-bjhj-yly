import { createModuleRoute, createModuleConfig } from "@/utils/react/route-factory";
import { CmsPath } from "../router/path";
import Routes from "../router/routes";

// 使用路由工厂创建CMS模块路由
const config = createModuleConfig(
  "CMS",
  CmsPath.LINE,
  Routes,
  CmsPath.CMS_TEMPLATE
);

const Main = createModuleRoute(config);

export default Main;
