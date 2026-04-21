import HocUtils from "@/utils/react/hoc-utils";

import Context, { TeacherStore } from "./store";
import Main from "./views/main";

export default HocUtils<TeacherStore, object>(Context, TeacherStore)(Main);

