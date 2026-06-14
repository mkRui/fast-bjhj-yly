import { describe, expect, it } from "vitest";

import type { MenuType } from "../types";
import { getFirstMenuHref } from "./get-first-menu-href";

const menu: MenuType[] = [
  {
    name: "分组",
    id: "1",
    parentId: "0",
    children: [
      { name: "子1", id: "2", parentId: "1", href: "/a", code: "a" },
      { name: "子2", id: "3", parentId: "1", href: "/b", code: "b" },
    ],
  },
  { name: "叶子", id: "4", parentId: "0", href: "/c", code: "c" },
];

describe("getFirstMenuHref", () => {
  it("返回第一个叶子节点 href", () => {
    expect(getFirstMenuHref(menu)).toBe("/a");
  });

  it("空菜单返回 undefined", () => {
    expect(getFirstMenuHref([])).toBeUndefined();
  });

  it("仅父节点无 href 时深入子节点", () => {
    expect(
      getFirstMenuHref([
        {
          name: "仅分组",
          id: "1",
          parentId: "0",
          children: [{ name: "叶", id: "2", parentId: "1", href: "/leaf", code: "x" }],
        },
      ])
    ).toBe("/leaf");
  });
});
