import HocUtils from "@/utils/react/hoc-utils";

import Context, { SalaryCalcStore } from "./store";
import Main from "./views/main";

export default HocUtils<SalaryCalcStore, object>(Context, SalaryCalcStore)(Main);
