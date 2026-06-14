import { FC, ReactNode } from "react";

import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";

interface UserPageLayoutProps {
  title: string;
  children: ReactNode;
}

const UserPageLayout: FC<UserPageLayoutProps> = ({ title, children }) => (
  <Content style={{ flex: 1 }}>
    <Content.Layout style={{ height: "100%" }}>
      <Content.Header>
        <HeaderTitle>{title}</HeaderTitle>
      </Content.Header>
      <Content.Main style={{ overflow: "unset" }}>{children}</Content.Main>
    </Content.Layout>
  </Content>
);

export default UserPageLayout;
