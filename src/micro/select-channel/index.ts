import HocUtils from "@/utils/react/hoc-utils";

import Context, { ChannelListStore } from "./store";
import Main, { SelectChannelProp } from "./view/main";

export default HocUtils<ChannelListStore, SelectChannelProp>(
  Context,
  ChannelListStore
)(Main);
