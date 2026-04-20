import {
  createModuleRoute,
  createModuleConfig,
} from "@/utils/react/route-factory";
import { ProductPath } from "../router/path";
import Routes from "../router/routes";

// 使用路由工厂创建System模块路由
const config = createModuleConfig(
  "Product",
  ProductPath.LINE,
  Routes,
  ProductPath.PRODUCT_MAIN
);

const Main = createModuleRoute(config);

export default Main;
