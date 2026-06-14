import { SettingOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { useList } from "react-use";
import { observer } from "mobx-react";
import withRouterEnhance, {
  MetaProps,
} from "@/utils/react/with-router-enhance";
import { rootRoutes } from "@/router/routes";
import { BasePath } from "@/router/path";
import RootContext from "@/stores/root-context";
import { MenuList } from "@/micro/menu/config";
import { filterMenuByResList } from "@/micro/menu/utils/filter-menu";
import { getFirstMenuHref } from "@/micro/menu/utils/get-first-menu-href";

import Tab from "../components/tab";
import Styles from "../styles/main.module.less";
import { Flatten } from "@/utils/data-structure/tree";
import { navigateToPath } from "../utils/navigate-path";

const WELCOME_TAB_TITLES: Record<string, string> = {
  work: "课时上报",
  leave: "请假申请",
  assets: "资产管理",
  car: "用车申请",
};

function getRouteTitle(pathname: string, search: string): string {
  if (pathname === "/welcome") {
    const tab = new URLSearchParams(search).get("tab");
    if (tab && WELCOME_TAB_TITLES[tab]) {
      return WELCOME_TAB_TITLES[tab];
    }
    return "用户功能";
  }

  const info = Flatten(rootRoutes as any).find(
    (item: any) => item.fullPath === pathname
  ) as { title?: string } | undefined;

  return info?.title || pathname;
}

interface TabItem {
  title: string;
  basePath: string;
  path: string;
}

const PageTab: FC<MetaProps> = (props) => {
  const { base } = props;
  const store = useContext(RootContext);
  const navigate = useNavigate();

  const [list, { push, clear, set }] = useList<TabItem>([]);

  const container = useRef<HTMLDivElement>(null);
  const tabContainer = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const [path, setPath] = useState("");

  const location = useLocation();

  const getCurrentPath = (): string =>
    location.pathname + location.search;

  const getFirstMenuPath = (): string => {
    const firstHref = getFirstMenuHref(
      filterMenuByResList(MenuList, store.resList)
    );
    return firstHref || BasePath.WELCOME;
  };

  const navigateToFirstMenu = (): void => {
    navigateToPath(navigate, getFirstMenuPath());
  };

  const getPathIndex = (url: string): number => {
    return list.findIndex((item) => item.path === url);
  };

  const goRight = (): void => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      const c = container.current;
      const t = tabContainer.current;
      if (c && t) {
        c.scrollBy(t.offsetWidth, 0);
      }
    }, 0);
  };

  useEffect(() => {
    if (!base) return;

    const currentPath = getCurrentPath();
    const index = getPathIndex(currentPath);
    const tab: TabItem = {
      title: getRouteTitle(location.pathname, location.search),
      basePath: base.path,
      path: currentPath,
    };

    if (index === -1) {
      push(tab);
      goRight();
    } else if (list[index].title !== tab.title) {
      const nextList = [...list];
      nextList[index] = tab;
      set(nextList);
    }

    setPath(currentPath);
  }, [location.pathname, location.search, store.resList.length]);

  const handleClose = (url: string): void => {
    const currentPath = getCurrentPath();
    const index = getPathIndex(url);
    if (index === -1) return;

    const remaining = list.filter((item) => item.path !== url);
    set(remaining);

    if (url === currentPath) {
      if (remaining.length > 0) {
        const nextIndex = Math.min(index, remaining.length - 1);
        navigateToPath(navigate, remaining[nextIndex].path);
      } else {
        navigateToFirstMenu();
      }
    }
  };

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>): void => {
    const t = tabContainer.current;
    const c = container.current;
    if (!t || !c) return;

    if (e.nativeEvent.deltaY <= 0) {
      c.scrollTo(Math.max(c.scrollLeft - 10, 0), 0);
    } else {
      c.scrollTo(Math.min(c.scrollLeft + 10, t.offsetWidth), 0);
    }
  };

  const handleClearAll = (): void => {
    clear();
    navigateToFirstMenu();
  };

  const handleCloseOther = (keepPath: string): void => {
    set(list.filter((item) => item.path === keepPath));
    if (getCurrentPath() !== keepPath) {
      navigateToPath(navigate, keepPath);
    }
  };

  const click = async ({ key }: { key: string }): Promise<void> => {
    switch (key) {
      case "closeAll":
        handleClearAll();
        break;
      case "closeOther":
        handleCloseOther(path);
        break;
    }
  };

  const MenuListOverlay = (
    <Menu onClick={click}>
      <Menu.Item key="closeAll">关闭所有</Menu.Item>
      <Menu.Item key="closeOther">关闭其他</Menu.Item>
    </Menu>
  );

  return (
    <div className={Styles["container"]}>
      <div
        ref={container}
        className={Styles["page-tab__container"]}
        onWheel={handleScroll}
      >
        <div ref={tabContainer} className={Styles["page-tab__context"]}>
          {[...new Map(list.map((item) => [item.path, item])).values()].map(
            (item: TabItem) => (
              <Tab
                key={item.path}
                title={item.title || ""}
                path={item.path}
                active={path === item.path}
                onClose={handleClose}
              />
            )
          )}
        </div>
      </div>
      <Dropdown trigger={["click"]} overlay={MenuListOverlay}>
        <button type="button" className={Styles["button"]}>
          <SettingOutlined />
        </button>
      </Dropdown>
    </div>
  );
};

export default withRouterEnhance(observer(PageTab));
