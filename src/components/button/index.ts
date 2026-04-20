import React from "react";

import ButtonBase, { BaseButtonProps } from "./view/button";
import Group from "./view/group";
interface ButtonType extends React.FC<BaseButtonProps> {
  Group: typeof Group;
}

const Button = ButtonBase as ButtonType;

Button.Group = Group;

export default Button;
