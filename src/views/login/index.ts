import HocUtils from "@/utils/react/hoc-utils";

import context, { AuthStore } from "./store";
import Main from "./view/main";

export default HocUtils<AuthStore, object>(context, AuthStore)(Main);
