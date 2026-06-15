import { describe, expect, it } from "vitest";

import type { MenuType } from "../types";
import { filterMenuByResList } from "./filter-menu";

const menu: MenuType[] = [
  {
    name: "系统",
    id: "1",
    parentId: "0",
    href: "",
    code: "",
    children: [
      { name: "用户", id: "2", parentId: "1", href: "/sys/user", code: "sys:user" },
      { name: "角色", id: "3", parentId: "1", href: "/sys/role", code: "sys:role" },
    ],
  },
  {
    name: "资产",
    id: "4",
    parentId: "0",
    href: "",
    code: "",
    children: [
      { name: "固定资产", id: "5", parentId: "4", href: "/ams/assets", code: "ams:assets" },
    ],
  },
];

describe("filterMenuByResList", () => {
  it("空 resList 返回空菜单", () => {
    expect(filterMenuByResList(menu, [])).toEqual([]);
  });

  it("按权限过滤叶子节点", () => {
    const filtered = filterMenuByResList(menu, ["sys:user", "ams:assets"]);
    expect(filtered.length).toBe(2);
    expect(filtered[0]?.children?.map((c) => c.code)).toEqual(["sys:user"]);
    expect(filtered[1]?.children?.map((c) => c.code)).toEqual(["ams:assets"]);
  });

  it("父级前缀匹配子权限", () => {
    const filtered = filterMenuByResList(menu, ["sys:role"]);
    expect(filtered[0]?.children?.length).toBe(1);
    expect(filtered[0]?.children?.[0]?.code).toBe("sys:role");
  });

  it("无匹配权限时移除整组", () => {
    const filtered = filterMenuByResList(menu, ["crms:car"]);
    expect(filtered).toEqual([]);
  });
});
