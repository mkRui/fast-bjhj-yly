import HocUtils from "@/utils/react/hoc-utils";

import RoleContext, { RoleStore } from "./store";
import AccountUser, { ModalContainer } from "./view/main";

export default HocUtils<RoleStore, ModalContainer>(
  RoleContext,
  RoleStore
)(AccountUser);
