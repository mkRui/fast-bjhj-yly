import HocUtils from "@/utils/react/hoc-utils";

import Context, { LeaveStore } from "./store";
import Main from "./views/main";

export default HocUtils<LeaveStore, object>(Context, LeaveStore)(Main);

