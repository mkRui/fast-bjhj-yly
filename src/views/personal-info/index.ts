import HocUtils from "@/utils/react/hoc-utils";

import Context, { PersonalInfoStore } from "./store";
import Main from "./view/main";

export default HocUtils<PersonalInfoStore, object>(
  Context,
  PersonalInfoStore
)(Main);

