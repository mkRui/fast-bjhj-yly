import ClassNames from "classnames";
import { FC } from "react";

import Style from "../style/avatar.module.less";
import { AvatarProps } from "../types";
import UserImg from "../icon/user.svg";

const Avatar: FC<AvatarProps> = (props) => {
  const { size, shadow, url } = props;

  const classN = ClassNames(`${Style.avatar}`, {
    [`${Style[`avatar--${size as string}`]}`]: !!size,
    [`${Style["avatar--shadow"]}`]: shadow,
  });

  const avatar = (): string => {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return url || UserImg;
  };

  return (
    <div className={classN}>
      <img src={avatar()} width="40" height="40" alt="" />
    </div>
  );
};
export default Avatar;
