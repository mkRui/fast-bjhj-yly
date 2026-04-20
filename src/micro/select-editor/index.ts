import HocUtils from "@/utils/react/hoc-utils";

import Context, { SelectEditorStore } from "./store";
import AccountUser, { SelectBranchProp } from "./view/main";

export default HocUtils<SelectEditorStore, SelectBranchProp>(
  Context,
  SelectEditorStore
)(AccountUser);
