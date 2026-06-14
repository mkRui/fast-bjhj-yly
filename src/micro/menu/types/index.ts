import { ReactNode } from "react";

export interface MenuData {
  name: string;
  href: string;
  code: string;
  id: string;
  parentId: string;
  icon?: ReactNode;
}

export interface MenuType extends MenuData {
  children?: MenuType[];
}
