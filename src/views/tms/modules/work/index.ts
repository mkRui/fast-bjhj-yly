import HocUtils from "@/utils/react/hoc-utils";

import Context, { WorkStore } from "./store";
import Main from "./views/main";

export default HocUtils<WorkStore, object>(Context, WorkStore)(Main);

