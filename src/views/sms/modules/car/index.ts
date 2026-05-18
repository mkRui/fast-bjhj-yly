import HocUtils from "@/utils/react/hoc-utils";

import Context, { CarStore } from "./store";
import Main from "./views/main";

export default HocUtils<CarStore, object>(Context, CarStore)(Main);

