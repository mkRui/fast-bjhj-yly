import { createModuleRoute, createModuleConfig } from "@/utils/react/route-factory";
import { BusinessPath } from "../router/path";
import Routes from "../router/routes";

// 使用路由工厂创建Business模块路由
const config = createModuleConfig(
  "Business",
  BusinessPath.LINE,
  Routes,
  BusinessPath.BUSINESS_TEMPLATE
);

const Main = createModuleRoute(config);

export default Main;
