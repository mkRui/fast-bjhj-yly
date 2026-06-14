import { FC, useContext, useEffect, createContext, useState } from "react";
import { ConfigProvider } from "antd";
import { Scrollbars } from "react-custom-scrollbars";
import ClassNames from "classnames";
import { observer } from "mobx-react";

import Layout, { Header, Main, Aside } from "@/components/container";
import RouteComponent from "@/router/route-component";
import { mainRoutes } from "@/router/routes";
import RootContext from "@/stores/root-context";
import { UserFullPath } from "@/views/user/router/path";
import eventDispatch from "@/utils/common/event-dispatch";
import { useThemeMode } from "@/config/hooks";
import { getAntdTheme } from "@/config/antd-theme";
import { applyTheme } from "@/utils/common/theme";

import LayoutHeader from "./container/header";
import LayoutAside from "./container/aside";

import Styles from "./style/app.module.less";
import "./style/common.less";
import "@/styles/theme-vars.css";
import { useNavigate } from "react-router-dom";

interface AppContextProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const AppContext = createContext<AppContextProps>({
  collapsed: false,
  setCollapsed: () => null,
});
const MainLayout: FC = () => {
  /**
   * @props
   * @description 组件传参
   */

  const navigate = useNavigate();

  /**
   * @emits
   * @description 组件方法
   */

  /**
   * @state
   * @description 变量声明
   */

  const [collapsed, setCollapsed] = useState<boolean>(false);

  /**
   * @store
   * @description 数据管理中心
   */

  const Store: AppContextProps = {
    collapsed,
    setCollapsed: (bol: boolean) => setCollapsed(bol),
  };

  const root = useContext(RootContext);
  const { mode } = useThemeMode();

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  const mainClass: string = ClassNames(`${Styles.main}`, {
    [`${Styles[`main--aside`]}`]: true,
    [`${Styles[`main--collapsed`]}`]: collapsed,
  });

  /**
   * @route-state
   * @description 获取页面参数
   */

  /**
   * @route
   * @description 跳转页面
   */

  /**
   * @methods
   * @description 方法
   */

  /**
   * @watch
   * @description 监听方法
   */

  useEffect(() => {
    eventDispatch.on("login", () => {
      navigate("/login");
    });
  }, []);

  /**
   * @lifeCycle
   * @description 生命周期
   */

  useEffect(() => {
    root.getInit();
    root.getEnum();
  }, []);

  return (
    <ConfigProvider theme={getAntdTheme(mode)}>
      <AppContext.Provider value={Store}>
      <Layout>
        <Header>
          <LayoutHeader />
        </Header>
        <Layout style={{ height: "calc(100vh - 50px)", minHeight: "auto" }}>
          <Aside collapsed={collapsed}>
            <LayoutAside />
          </Aside>
          <Main className={mainClass}>
            <Scrollbars autoHide>
              <div className={Styles[`main--content`]}>
                <RouteComponent
                  baseRouter="/"
                  routes={mainRoutes}
                  redirect={UserFullPath.SUBMIT}
                />
              </div>
            </Scrollbars>
          </Main>
        </Layout>
      </Layout>
      <div id="portal-root"></div>
    </AppContext.Provider>
    </ConfigProvider>
  );
};

export default observer(MainLayout);
