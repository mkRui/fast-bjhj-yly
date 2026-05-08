import { FC } from "react";
import { observer } from "mobx-react";
import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import { Tabs } from "antd";

import WorkTab from "../components/work-tab";
import LeaveTab from "../components/leave-tab";
import AssetsTab from "../components/assets-tab";

const WelcomeMain: FC = () => {
  return (
    <Content style={{ flex: 1 }}>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle>欢迎</HeaderTitle>
        </Content.Header>
        <Content.Main style={{ overflow: "unset" }}>
          <Tabs
            items={[
              { key: "work", label: "工时", children: <WorkTab /> },
              { key: "leave", label: "请假", children: <LeaveTab /> },
              { key: "assets", label: "资产", children: <AssetsTab /> },
            ]}
          />
        </Content.Main>
      </Content.Layout>
    </Content>
  );
};

export default observer(WelcomeMain);
