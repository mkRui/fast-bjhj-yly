import HocUtils from "@/utils/react/hoc-utils";

import Context, { CarApplyStore } from "./store";
import Main from "./views/main";

export default HocUtils<CarApplyStore, object>(Context, CarApplyStore)(Main);
