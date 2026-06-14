import HocUtils from "@/utils/react/hoc-utils";

import Context, { SalaryBaseStore } from "./store";
import Main from "./views/main";

export default HocUtils<SalaryBaseStore, object>(Context, SalaryBaseStore)(Main);
