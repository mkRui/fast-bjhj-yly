import type { MenuType } from "../types";

/** 获取权限菜单中第一个可访问叶子节点的路由 */
export function getFirstMenuHref(menuList: MenuType[]): string | undefined {
  for (const item of menuList) {
    if (item.children?.length) {
      const childHref = getFirstMenuHref(item.children);
      if (childHref) return childHref;
    } else if (item.href) {
      return item.href;
    }
  }
  return undefined;
}
