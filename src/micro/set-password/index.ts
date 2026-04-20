import HocUtils from "@/utils/react/hoc-utils";

import RoleContext, { ChangPasswordStore } from "./store";
import AccountUser, { ModalContainer } from "./view/main";

export default HocUtils<ChangPasswordStore, ModalContainer>(
  RoleContext,
  ChangPasswordStore
)(AccountUser);
