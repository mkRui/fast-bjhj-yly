import { FC } from "react";
import { observer } from "mobx-react";

import HocUtils from "@/utils/react/hoc-utils";

import Context, { WelcomeStore } from "../store";
import UserPageLayout from "./user-page-layout";
import WorkTab from "../components/work-tab";

const WorkPage: FC = () => (
  <UserPageLayout title="课时上报">
    <WorkTab />
  </UserPageLayout>
);

export default HocUtils<WelcomeStore, object>(Context, WelcomeStore)(
  observer(WorkPage)
);
