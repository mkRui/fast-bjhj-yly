import HocUtils from "@/utils/react/hoc-utils";

import Context, { ProductAttrStore } from "./store";
import Main from "./views/main";

export default HocUtils<ProductAttrStore, any>(Context, ProductAttrStore)(Main);
