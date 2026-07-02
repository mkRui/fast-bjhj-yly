import HocUtils from "@/utils/react/hoc-utils";

import Context, { CompetitionStore } from "./store";
import Main from "./views/main";

export default HocUtils<CompetitionStore, object>(Context, CompetitionStore)(Main);
