import HocUtils from "@/utils/react/hoc-utils";

import Context, { ResourcesStore } from "./store";
import Main from "./views/main";

export default HocUtils<ResourcesStore, object>(Context, ResourcesStore)(Main);
