import HocUtils from "@/utils/react/hoc-utils";

import Context, { MetaListStore } from "./store";
import Main, { SelectMetaProp } from "./view/main";

export default HocUtils<MetaListStore, SelectMetaProp>(
  Context,
  MetaListStore
)(Main);
