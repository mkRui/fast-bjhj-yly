import HocUtils from "@/utils/react/hoc-utils";

import Context, { LeavePeriodSettingStore } from "./store";
import Main, { LeavePeriodSettingProps } from "./view/main";

export default HocUtils<LeavePeriodSettingStore, LeavePeriodSettingProps>(
  Context,
  LeavePeriodSettingStore
)(Main);

