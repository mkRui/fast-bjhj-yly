import HocUtils from "@/utils/react/hoc-utils";

import Context, { NotificationStore } from "./store";
import Main from "./view/main";

export default HocUtils<NotificationStore, object>(
  Context,
  NotificationStore
)(Main);
