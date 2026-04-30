import HocUtils from "@/utils/react/hoc-utils";

import Context, { AmsCategoryStore } from "./store";
import Main from "./views/main";

export default HocUtils<AmsCategoryStore, object>(Context, AmsCategoryStore)(Main);

