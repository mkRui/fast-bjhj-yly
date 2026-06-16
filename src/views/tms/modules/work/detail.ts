import HocUtils from "@/utils/react/hoc-utils";

import Context, { WorkStore } from "./store";
import Detail from "./views/detail";

export default HocUtils<WorkStore, object>(Context, WorkStore)(Detail);
