import HocUtils from "@/utils/react/hoc-utils";

import Context, { RoleStore } from "./store";
import Main from "./views/main";

export default HocUtils<RoleStore, object>(Context, RoleStore)(Main);
