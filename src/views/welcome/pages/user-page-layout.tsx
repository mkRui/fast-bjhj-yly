import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";

import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";

interface UserPageLayoutProps {
  title: string;
  toolbar?: ReactNode;
  children: ReactNode;
}

const UserPageToolbarContext = createContext<((toolbar: ReactNode) => void) | null>(null);

export const useRegisterUserPageToolbar = (toolbar: ReactNode): void => {
  const setToolbar = useContext(UserPageToolbarContext);

  useEffect(() => {
    if (!setToolbar) return;
    setToolbar(toolbar);
    return () => setToolbar(null);
  }, [setToolbar, toolbar]);
};

const UserPageLayout: FC<UserPageLayoutProps> = ({ title, toolbar: toolbarProp, children }) => {
  const [toolbarState, setToolbarState] = useState<ReactNode>(null);
  const toolbar = toolbarProp ?? toolbarState;

  return (
    <UserPageToolbarContext.Provider value={setToolbarState}>
      <Content style={{ flex: 1 }}>
        <Content.Layout style={{ height: "100%" }}>
          <Content.Header>
            <HeaderTitle>{title}</HeaderTitle>
          </Content.Header>
          {toolbar ? <Content.Header>{toolbar}</Content.Header> : null}
          <Content.Main style={{ overflow: "unset" }}>{children}</Content.Main>
        </Content.Layout>
      </Content>
    </UserPageToolbarContext.Provider>
  );
};

export default UserPageLayout;
