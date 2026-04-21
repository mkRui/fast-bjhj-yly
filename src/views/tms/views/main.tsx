import { createModuleConfig, createModuleRoute } from "@/utils/react/route-factory";
import { TmsPath } from "../router/path";
import Routes from "../router/routes";

const config = createModuleConfig("Tms", TmsPath.LINE, Routes, "/tms/teacher");

const Main = createModuleRoute(config);

export default Main;

