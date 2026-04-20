import HocUtils from "@/utils/react/hoc-utils";

import Context, { ChannelStore } from "./store";
import Main from "./views/main";

export default HocUtils<ChannelStore, object>(Context, ChannelStore)(Main);
