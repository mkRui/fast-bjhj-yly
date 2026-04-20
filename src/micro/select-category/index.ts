import HocUtils from "@/utils/react/hoc-utils";

import Context, { TemplateListStore } from "./store";
import Main, { SelectTemplateProp } from "./view/main";

export default HocUtils<TemplateListStore, SelectTemplateProp>(
  Context,
  TemplateListStore
)(Main);
