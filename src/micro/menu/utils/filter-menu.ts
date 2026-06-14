import type { MenuType } from "../types";

function hasPermission(code: string, resList: string[]): boolean {
  if (!code) return false;
  return resList.includes(code);
}

function filterNode(item: MenuType, resList: string[]): MenuType | null {
  if (item.children?.length) {
    const children = item.children
      .map((child) => filterNode(child, resList))
      .filter((child): child is MenuType => child !== null);

    if (children.length > 0) {
      return { ...item, children };
    }
    return null;
  }

  return hasPermission(item.code, resList) ? item : null;
}

export function filterMenuByResList(
  menuList: MenuType[],
  resList: string[]
): MenuType[] {
  if (!resList.length) return [];

  return menuList
    .map((item) => filterNode(item, resList))
    .filter((item): item is MenuType => item !== null);
}
