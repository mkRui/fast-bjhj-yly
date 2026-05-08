import HocUtils from "@/utils/react/hoc-utils";

import Context, { AmsConsumablesStore } from "./store";
import Main from "./views/main";

export default HocUtils<AmsConsumablesStore, object>(Context, AmsConsumablesStore)(Main);

