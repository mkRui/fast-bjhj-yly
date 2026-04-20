import HocUtils from "@/utils/react/hoc-utils";

import Context, { TemplateStore } from "./store/index";
import Main from "./views/main";

export default HocUtils<TemplateStore, object>(Context, TemplateStore)(Main);
