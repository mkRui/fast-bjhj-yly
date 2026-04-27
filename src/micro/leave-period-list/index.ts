import HocUtils from "@/utils/react/hoc-utils";

import Context, { LeavePeriodListStore } from "./store";
import Main, { LeavePeriodSelectProps } from "./view/main";

export default HocUtils<LeavePeriodListStore, LeavePeriodSelectProps>(
  Context,
  LeavePeriodListStore
)(Main);

