import HocUtils from "@/utils/react/hoc-utils";

import Context, { WelcomeStore } from "./store";
import Main from "./view/main";

export default HocUtils<WelcomeStore, object>(Context, WelcomeStore)(Main);
