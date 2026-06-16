import HocUtils from "@/utils/react/hoc-utils";

import Context, { AssetsCheckStore } from "./store";
import Main from "./views/main";

export default HocUtils<AssetsCheckStore, object>(Context, AssetsCheckStore)(Main);
