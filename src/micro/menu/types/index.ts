interface MenuData {
  name: string;
  href: string;
  code: string;
  id: string;
  parentId: string
}

export interface MenuType extends MenuData {
  children?: MenuData[];
}
