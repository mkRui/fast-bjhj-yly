import HocUtils from "@/utils/react/hoc-utils";

import Context, { IntentionStore } from "./store/index";
import Main from "./views/main";

export default HocUtils<IntentionStore, object>(Context, IntentionStore)(Main);
