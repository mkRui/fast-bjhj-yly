import { createModuleConfig, createModuleRoute } from "@/utils/react/route-factory";
import { SmsPath, SmsFullPath } from "../router/path";
import Routes from "../router/routes";

const config = createModuleConfig("Sms", SmsPath.LINE, Routes, SmsFullPath.AMS_CATEGORY);

const Main = createModuleRoute(config);

export default Main;

