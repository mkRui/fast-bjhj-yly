import HocUtils from "@/utils/react/hoc-utils";

import RoleContext, { RoleStore } from "./store";
import AccountUser, { SelectBranchProp } from "./view/main";

export default HocUtils<RoleStore, SelectBranchProp>(
  RoleContext,
  RoleStore
)(AccountUser);
