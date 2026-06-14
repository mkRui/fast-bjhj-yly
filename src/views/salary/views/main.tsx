import { createModuleConfig, createModuleRoute } from "@/utils/react/route-factory";
import { SalaryPath } from "../router/path";
import Routes from "../router/routes";

const config = createModuleConfig("Salary", SalaryPath.LINE, Routes, "/salary/base");

const Main = createModuleRoute(config);

export default Main;
