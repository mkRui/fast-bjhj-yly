import { FC, useEffect, useState, useContext } from "react";
import { Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { MenuType } from "../types";
import { MenuList } from "../config";
import { observer } from "mobx-react";

import Context from "@/stores/root-context";
import { Search, Tree, Flatten } from "@/utils/data-structure/tree";
import withRouterEnhance from "@/utils/react/with-router-enhance";

import "../styles/menu.less";

const { SubMenu } = Menu;

// todo 传入值需要优化
interface MenuListTypes extends MenuProps {
  handleClick?: (url: string) => void;
  selectMode?: "front" | "post-position";
  allOpenCheck?: boolean;
  theme?: "light" | "dark";
  isRouteJump?: boolean;
  openChange?: () => void;
  base?: any;
}

const MenuContainer: FC<MenuListTypes> = (props) => {
  const {
    inlineCollapsed,
    mode,
    handleClick,
    selectMode = "post-position",
    theme = "light",
    isRouteJump = true,
    openChange,
    base,
  } = props;

  const [select, setSelect] = useState("");

  const store = useContext(Context);

  const navigate = useNavigate();

  const [openKey, setOpenKey] = useState<string[]>([]);

  const [menu, setMenu] = useState<MenuType[]>([]);

  const getArr = (url: string): void => {
    const search: any = Search(MenuList, url);
    const selected = search[selectMode === "front" ? 0 : search.length - 1];
    setOpenKey([...openKey, ...search.slice(0, search.length - 1)]);
    setSelect(`${selected as string}`);
    handleClick?.(url);
  };

  const menuItemClick = (item: MenuType): void => {
    getArr(item.href);
    if (isRouteJump) {
      navigate(item.href);
    }
    handleClick?.(item.href);
  };

  const handleOpenChange = (data: string[]): void => {
    console.log(data);
    setOpenKey(data);
    openChange?.();
  };

  const MenuCom = (MenuList: MenuType[]): any => {
    // eslint-disable-next-line complexity
    return MenuList.map((item: MenuType) => {
      if (item.children?.length) {
        return (
          <SubMenu title={item.name} key={item.id}>
            {!!item.children?.length && MenuCom(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item
            key={item.id}
            onClick={() => {
              menuItemClick(item);
            }}
          >
            {item.name}
          </Menu.Item>
        );
      }
    });
  };

  useEffect(() => {
    if (base) {
      getArr(base.pathname);
    }
  }, []);

  useEffect(() => {
    if (store.resList.length) {
      const code = store.resList.map((item) => item);
      const menu = Flatten(MenuList).filter((item) => code.includes(item.code));
      setMenu(new Tree(menu).loop("0"));
    }
  }, [store.resList]);

  useEffect(() => {
    handleClick?.(location.pathname);
  }, []);

  if (!menu.length) {
    return <div></div>;
  }

  return (
    <div className={"menu__container"}>
      <Menu
        inlineCollapsed={inlineCollapsed}
        style={{
          border: 0,
          width: "100%",
          lineHeight: "50px",
        }}
        theme={theme}
        selectedKeys={[select]}
        openKeys={openKey.map((item) => `${item}`)}
        onOpenChange={handleOpenChange}
        mode={mode}
      >
        {MenuCom(menu)}
      </Menu>
    </div>
  );
};

export default withRouterEnhance(observer(MenuContainer));
