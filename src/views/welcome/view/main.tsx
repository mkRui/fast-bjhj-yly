import { FC, useEffect, useMemo } from "react";
import { observer } from "mobx-react";
import { useSearchParams } from "react-router-dom";
import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import { Tabs } from "antd";

import WorkTab from "../components/work-tab";
import LeaveTab from "../components/leave-tab";
import AssetsTab from "../components/assets-tab";
import CarTab from "../components/car-tab";

const USER_TABS = ["work", "leave", "assets", "car"] as const;
type UserTabKey = (typeof USER_TABS)[number];

const isUserTabKey = (value: string | null): value is UserTabKey =>
  value !== null && USER_TABS.includes(value as UserTabKey);

const WelcomeMain: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");

  useEffect(() => {
    if (!isUserTabKey(tabParam)) {
      setSearchParams({ tab: "work" }, { replace: true });
    }
  }, [tabParam, setSearchParams]);

  const activeTab: UserTabKey = isUserTabKey(tabParam) ? tabParam : "work";

  const tabItems = useMemo(
    () => [
      { key: "work", label: "课时上报", children: <WorkTab /> },
      { key: "leave", label: "请假申请", children: <LeaveTab /> },
      { key: "assets", label: "资产管理", children: <AssetsTab /> },
      { key: "car", label: "用车申请", children: <CarTab /> },
    ],
    []
  );

  return (
    <Content style={{ flex: 1 }}>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle>用户功能</HeaderTitle>
        </Content.Header>
        <Content.Main style={{ overflow: "unset" }}>
          <Tabs
            activeKey={activeTab}
            onChange={(key) => setSearchParams({ tab: key })}
            items={tabItems}
          />
        </Content.Main>
      </Content.Layout>
    </Content>
  );
};

export default observer(WelcomeMain);
