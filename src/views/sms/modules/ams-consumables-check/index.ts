import HocUtils from "@/utils/react/hoc-utils";

import Context, { ConsumablesCheckStore } from "./store";
import Main from "./views/main";

export default HocUtils<ConsumablesCheckStore, object>(Context, ConsumablesCheckStore)(Main);
