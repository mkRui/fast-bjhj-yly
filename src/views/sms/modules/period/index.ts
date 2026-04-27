import HocUtils from "@/utils/react/hoc-utils";

import Context, { PeriodStore } from "./store";
import Main from "./views/main";

export default HocUtils<PeriodStore, object>(Context, PeriodStore)(Main);

