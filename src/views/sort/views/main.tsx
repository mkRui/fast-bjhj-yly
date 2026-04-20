import {
  createModuleRoute,
  createModuleConfig,
} from "@/utils/react/route-factory";
import { SortPath } from "../router/path";
import Routes from "../router/routes";

// 使用路由工厂创建System模块路由
const config = createModuleConfig(
  "Sort",
  SortPath.LINE,
  Routes,
  SortPath.SORT_CATEGORY
);

const Main = createModuleRoute(config);

export default Main;
