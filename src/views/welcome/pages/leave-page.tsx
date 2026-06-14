import { FC } from "react";
import { observer } from "mobx-react";

import HocUtils from "@/utils/react/hoc-utils";

import Context, { WelcomeStore } from "../store";
import UserPageLayout from "./user-page-layout";
import LeaveTab from "../components/leave-tab";

const LeavePage: FC = () => (
  <UserPageLayout title="请假申请">
    <LeaveTab />
  </UserPageLayout>
);

export default HocUtils<WelcomeStore, object>(Context, WelcomeStore)(
  observer(LeavePage)
);
