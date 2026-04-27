import { createModuleConfig, createModuleRoute } from "@/utils/react/route-factory";
import { SmsPath } from "../router/path";
import Routes from "../router/routes";

const config = createModuleConfig("Sms", SmsPath.LINE, Routes, "/sms/period");

const Main = createModuleRoute(config);

export default Main;

