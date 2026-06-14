import { FC } from "react";
import { observer } from "mobx-react";

import HocUtils from "@/utils/react/hoc-utils";

import Context, { WelcomeStore } from "../store";
import UserPageLayout from "./user-page-layout";
import AssetsTab from "../components/assets-tab";

const AssetsPage: FC = () => (
  <UserPageLayout title="资产管理">
    <AssetsTab />
  </UserPageLayout>
);

export default HocUtils<WelcomeStore, object>(Context, WelcomeStore)(
  observer(AssetsPage)
);
