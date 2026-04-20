import ClassNames from "classnames";
import { observer } from "mobx-react";
import { FC, useContext } from "react";

import Menu from "@/micro/menu";

import { AppContext } from "../main";
import Style from "../style/aside.module.less";

const LayoutAside: FC = () => {
  const { collapsed } = useContext(AppContext);

  const ClassN = ClassNames(`${Style["layout-aside"]}`, {
    [`${Style["layout-aside_collapsed"]}`]: collapsed,
  });

  return (
    <div className={ClassN}>
      <div className={Style.menu__container}>
        <Menu
          inlineCollapsed={collapsed}
          allOpenCheck={collapsed}
          mode="inline"
        />
      </div>
    </div>
  );
};

export default observer(LayoutAside);
