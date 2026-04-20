import { CSSProperties, FC } from "react";
import Styles from "../styles/main.module.less";
import classNames from "classnames";

interface CardComponentType {
  padding?: boolean;
  children?: any;
  type?: "bottom" | "top";
  sanger?: boolean;
  style?: CSSProperties;
}
const CardComponent: FC<CardComponentType> = (props) => {
  const { padding = true, children, style, type, sanger = false } = props;

  const styleName = classNames(Styles.card, {
    [Styles["card--padding"]]: padding,
    [Styles[`card--margin${type ? "--" + type : ""}`]]: !!type,
    [Styles[`card--sanger`]]: sanger,
  });
  return (
    <div className={styleName} style={style}>
      {children}
    </div>
  );
};

export default CardComponent;
