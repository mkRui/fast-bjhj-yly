import HocUtils from "@/utils/react/hoc-utils";

import Context, { NotificationStore } from "./store";
import Main from "./view/main";

export { useRefreshOnMessageList } from "./hooks/use-refresh-on-message-list";
export { NoticeEvents } from "./constants/events";

export default HocUtils<NotificationStore, object>(
  Context,
  NotificationStore
)(Main);
