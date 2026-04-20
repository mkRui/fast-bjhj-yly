import { createModuleRoute, createModuleConfig } from "@/utils/react/route-factory";
import { OperationPath } from "../router/path";
import Routes from "../router/routes";

// 使用路由工厂创建Operation模块路由
const config = createModuleConfig(
  "Operation",
  OperationPath.LINE,
  Routes,
  OperationPath.OPERATION_CHANNEL
);

const Main = createModuleRoute(config);

export default Main;
