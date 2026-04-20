import ClassNames from "classnames";
import { FC } from "react";

import Styles from "../styles/group.module.less";

type direction = "column" | "row" | "end";
interface ButtonGroupType {
  direction?: direction;
  children: any;
}

const ButtonGroup: FC<ButtonGroupType> = (props) => {
  const { children, direction = "row" } = props;

  const themeClass = ClassNames(`${Styles.group__container}`, {
    [`${Styles[`group--${direction}`]}`]: true,
  });

  return <div className={themeClass}>{children}</div>;
};

export default ButtonGroup;
