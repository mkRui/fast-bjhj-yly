import { FC } from "react";
import { observer } from "mobx-react";

import HocUtils from "@/utils/react/hoc-utils";

import Context, { WelcomeStore } from "../store";
import UserPageLayout from "./user-page-layout";
import CarTab from "../components/car-tab";

const CarPage: FC = () => (
  <UserPageLayout title="用车申请">
    <CarTab />
  </UserPageLayout>
);

export default HocUtils<WelcomeStore, object>(Context, WelcomeStore)(
  observer(CarPage)
);
