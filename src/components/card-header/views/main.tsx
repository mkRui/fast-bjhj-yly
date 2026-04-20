import { FC } from "react";
import Styles from "../styles/main.module.less";
import classNames from "classnames";

interface HeaderTitleType {
  children: any;
  insert?: any;
  type?: "bottom" | "top";
  description?: string;
  isCrumbs?: boolean;
  isBorder?: boolean;
}

const HeaderTitle: FC<HeaderTitleType> = (props) => {
  const { children, type, description, isBorder, insert } = props;

  const styleName = classNames(Styles["header-title"], {
    [Styles[`header-title--margin${type ? "--" + type : ""}`]]: !!type,
    [Styles[`header-title--description`]]: !!description,
    [Styles[`header-title--border`]]: isBorder,
  });

  return (
    <div className={styleName}>
      <div className={Styles["header-insert--container"]}>
        {children}
        <div className={Styles["header-insert"]}>{insert}</div>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
};

export default HeaderTitle;
