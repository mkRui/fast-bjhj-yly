import { FC } from "react";

import Style from "../style/main.module.less";

interface LayoutMainTypes {
  children: any;
}

const LayoutMain: FC<LayoutMainTypes> = (props) => {
  return (
    <div className={Style.main}>
      <div>{props.children}</div>
    </div>
  );
};

export default LayoutMain;
