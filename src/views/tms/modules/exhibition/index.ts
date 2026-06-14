import HocUtils from "@/utils/react/hoc-utils";

import Context, { ExhibitionStore } from "./store";
import Main from "./views/main";

export default HocUtils<ExhibitionStore, object>(Context, ExhibitionStore)(Main);
