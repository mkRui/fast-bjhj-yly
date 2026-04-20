import HocUtils from "@/utils/react/hoc-utils";

import Context, { PagesStore } from "./store/index";
import Main from "./views/main";

export default HocUtils<PagesStore, object>(Context, PagesStore)(Main);
