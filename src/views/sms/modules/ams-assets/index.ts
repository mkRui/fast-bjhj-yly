import HocUtils from "@/utils/react/hoc-utils";

import Context, { AmsAssetsStore } from "./store";
import Main from "./views/main";

export default HocUtils<AmsAssetsStore, object>(Context, AmsAssetsStore)(Main);

