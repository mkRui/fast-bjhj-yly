import HocUtils from "@/utils/react/hoc-utils";

import Context, { ProductStore } from "./store/index";
import Main from "./views/main";

export default HocUtils<ProductStore, object>(Context, ProductStore)(Main);
