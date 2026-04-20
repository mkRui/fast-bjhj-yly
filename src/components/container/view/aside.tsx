import ClassNames from "classnames";
import { FC, useContext, useEffect } from "react";

import Style from "../style/aside.module.less";
import { AsideType } from "../types";
import { LayoutContext } from "../context/layout-context";

const Side: FC<AsideType> = (props) => {
  const { children, collapsed } = props;

  const { sideHook } = useContext(LayoutContext);

  const classN = ClassNames(`${Style.aside}`, {
    [`${Style.aside_collapsed}`]: collapsed,
  });

  useEffect(() => {
    sideHook.showSide(true);
  }, [sideHook]);

  return <div className={classN}>{children}</div>;
};

export default Side;
