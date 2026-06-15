import HocUtils from "@/utils/react/hoc-utils";

import Context, { LeaveSettingStore } from "./store";
import Main, { LeaveSettingProps } from "./view/main";

export default HocUtils<LeaveSettingStore, LeaveSettingProps>(Context, LeaveSettingStore)(Main);
