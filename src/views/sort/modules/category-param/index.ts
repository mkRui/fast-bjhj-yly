import HocUtils from "@/utils/react/hoc-utils";

import Context, { AccountStore } from "./store/index";
import Main from "./views/main";

export default HocUtils<AccountStore, object>(Context, AccountStore)(Main);
