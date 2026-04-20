import { SettingOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { useLocation } from "react-router-dom";
import { FC, useEffect, useRef, useState } from "react";
import { useList } from "react-use";
import withRouterEnhance, {
  MetaProps,
} from "@/utils/react/with-router-enhance";
import { rootRoutes } from "@/router/routes";

import Tab from "../components/tab";
import Styles from "../styles/main.module.less";
import { Flatten } from "@/utils/data-structure/tree";

interface TabItem {
  title: string;
  basePath: string;
  path: string;
}

const PageTab: FC<MetaProps> = (props) => {
  const { base } = props;

  const [list, { push, clear, removeAt, set }] = useList<TabItem>([]);

  const container = useRef<any>(null);

  const tabContainer = useRef<any>(null);

  const timer = useRef<any>(null);

  const [path, setPath] = useState("");

  const location = useLocation();

  const getPathIndex = (url: string) => {
    const index = list.findIndex((item) => item.path === url);
    return index;
  };

  const goRight = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      const c = container.current;
      const t = tabContainer.current;
      c.scrollBy(t.offsetWidth, 0);
    }, 0);
  };

  useEffect(() => {
    if (base) {
      const info = Flatten(rootRoutes as any).find(
        (item: any) => item.fullPath === base.pathname
      ) as any;
      console.log(base.pathname);
      const index = getPathIndex(location.pathname + location.search);
      const tab: TabItem = {
        title: info?.title || "",
        basePath: base.path,
        path: location.pathname + location.search,
      };
      if (index === -1) {
        push(tab);
        goRight();
      }
      setPath(location.pathname + location.search);
    }
  }, [location.pathname, location.search]);

  const handleClose = (url: string) => {
    const index = getPathIndex(url);
    removeAt(index);
    if (index === 0 && list.length === 1) {
      console.log(index);
    } else if (url.includes(location.pathname)) {
      const path = (list[index - 1] || list[index + 1])?.path;
      console.log(path);
    }
  };

  const handleScroll = (e: any) => {
    const t = tabContainer.current;
    const c = container.current;
    if (e.nativeEvent.deltaY <= 0) {
      /* scrolling up */
      c.scrollTo(Math.max(c.scrollLeft - 10, 0), 0);
    } else {
      /* scrolling down */
      c.scrollTo(Math.min(c.scrollLeft + 10, t.offsetWidth), 0);
    }
  };

  const handleClearAll = () => {
    clear();
  };

  const handleCloseOther = (path: string) => {
    set(list.filter((item) => item.path === path));
  };

  const click = async ({ key }: { key: string }) => {
    switch (key) {
      case "closeAll":
        handleClearAll();
        break;
      case "closeOther":
        handleCloseOther(path);
        break;
    }
  };

  const MenuList = (
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
        onWheel={(e) => handleScroll(e)}
      >
        <div ref={tabContainer} className={Styles["page-tab__context"]}>
          {[...new Map(list.map((item) => [item.path, item])).values()].map(
            (item: TabItem) => (
              <Tab
                key={item.path}
                title={item.title || ""}
                path={item.path}
                active={path === item.path}
                onClose={(url: string) => handleClose(url)}
              />
            )
          )}
        </div>
      </div>
      <Dropdown trigger={["click"]} overlay={MenuList}>
        <button className={Styles["button"]}>
          <SettingOutlined />
        </button>
      </Dropdown>
    </div>
  );
};

// todo 需要改进
export default withRouterEnhance(PageTab);
