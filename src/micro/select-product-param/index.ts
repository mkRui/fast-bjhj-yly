import HocUtils from "@/utils/react/hoc-utils";

import Context, { ProductParamListStore } from "./store";
import Main, { SelectProductParamProp } from "./view/main";

export default HocUtils<ProductParamListStore, SelectProductParamProp>(
  Context,
  ProductParamListStore
)(Main);
