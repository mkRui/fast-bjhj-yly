import { FC } from "react";
import { observer } from "mobx-react";

import HocUtils from "@/utils/react/hoc-utils";

import Context, { WelcomeStore } from "../store";
import UserPageLayout from "./user-page-layout";
import ExhibitionTab from "../components/exhibition-tab";

const ExhibitionPage: FC = () => (
  <UserPageLayout title="展会上报">
    <ExhibitionTab />
  </UserPageLayout>
);

export default HocUtils<WelcomeStore, object>(Context, WelcomeStore)(
  observer(ExhibitionPage)
);
