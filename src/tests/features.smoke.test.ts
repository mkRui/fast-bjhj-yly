import { describe, expect, it } from "vitest";

import { MenuCode } from "@/constants/menu-code";
import { MenuList } from "@/micro/menu/config";
import { filterMenuByResList } from "@/micro/menu/utils/filter-menu";
import { getFirstMenuHref } from "@/micro/menu/utils/get-first-menu-href";
import type { RouteTypes } from "@/router/routes";
import { mainRoutes, rootRoutes } from "@/router/routes";
import { BasePath } from "@/router/path";
import SystemRouter from "@/views/system/router/routes";
import TmsRouter from "@/views/tms/router/routes";
import SmsRouter from "@/views/sms/router/routes";
import SalaryRouter from "@/views/salary/router/routes";

import { FEATURE_TEST_CASES } from "./features.registry";

function collectLeafMenus(
  items: typeof MenuList,
  acc: { code: string; href: string }[] = []
): { code: string; href: string }[] {
  for (const item of items) {
    if (item.children?.length) {
      collectLeafMenus(item.children, acc);
    } else if (item.code && item.href) {
      acc.push({ code: item.code, href: item.href });
    }
  }
  return acc;
}

function collectRoutePaths(routes: RouteTypes[], acc: string[] = []): string[] {
  for (const route of routes) {
    if (route.fullPath) acc.push(route.fullPath);
    if (route.children) collectRoutePaths(route.children, acc);
  }
  return acc;
}

const MODULE_ENTRY_POINTS = [
  "@/views/system/modules/account",
  "@/views/system/modules/resources",
  "@/views/system/modules/role",
  "@/views/tms/modules/teacher",
  "@/views/tms/modules/work",
  "@/views/tms/modules/leave",
  "@/views/tms/modules/exhibition",
  "@/views/sms/modules/period",
  "@/views/sms/modules/ams-category",
  "@/views/sms/modules/ams-assets",
  "@/views/sms/modules/ams-consumables",
  "@/views/sms/modules/car",
  "@/views/sms/modules/car-apply",
  "@/views/salary/modules/salary-base",
  "@/views/salary/modules/salary-calc",
  "@/views/welcome/pages/work-page",
  "@/views/welcome/pages/leave-page",
  "@/views/welcome/pages/assets-page",
  "@/views/welcome/pages/car-page",
  "@/views/personal-info",
  "@/views/login",
];

describe("功能测试用例清单", () => {
  it("用例结构完整", () => {
    expect(FEATURE_TEST_CASES.length).toBeGreaterThanOrEqual(20);
    FEATURE_TEST_CASES.forEach((item) => {
      expect(item.id).toBeTruthy();
      expect(item.module).toBeTruthy();
      expect(item.steps.length).toBeGreaterThan(0);
      expect(item.expected.length).toBeGreaterThan(0);
    });
  });

  it("菜单编码均在 MenuCode 常量中定义", () => {
    const codes = new Set(Object.values(MenuCode));
    collectLeafMenus(MenuList).forEach(({ code }) => {
      expect(codes.has(code as typeof MenuCode[keyof typeof MenuCode])).toBe(true);
    });
  });

  it("全权限下首个菜单可解析", () => {
    const allCodes = Object.values(MenuCode);
    const filtered = filterMenuByResList(MenuList, allCodes);
    const href = getFirstMenuHref(filtered);
    expect(href).toBeTruthy();
  });
});

describe("路由注册冒烟", () => {
  const submoduleRoutes = [...SystemRouter, ...TmsRouter, ...SmsRouter, ...SalaryRouter];

  it("子模块路由均有组件与 fullPath", () => {
    submoduleRoutes.forEach((route) => {
      expect(route.component).toBeTruthy();
      expect(route.fullPath).toMatch(/^\//);
    });
  });

  it("主路由包含六大业务入口", () => {
    const paths = mainRoutes.map((r) => r.path);
    expect(paths).toContain(BasePath.SYSTEM);
    expect(paths).toContain(BasePath.TMS);
    expect(paths).toContain(BasePath.SMS);
    expect(paths).toContain(BasePath.SALARY);
  });

  it("功能用例 path 大多落在已注册路由中", () => {
    const registered = new Set([
      ...collectRoutePaths(mainRoutes),
      ...collectRoutePaths(rootRoutes),
      ...collectRoutePaths(submoduleRoutes),
    ]);

    const missing = FEATURE_TEST_CASES.filter(
      (c) => c.path !== "-" && !registered.has(c.path)
    );
    expect(missing.map((m) => m.path)).toEqual([]);
  });
});

describe("页面模块可加载", () => {
  MODULE_ENTRY_POINTS.forEach((entry) => {
    it(`加载 ${entry}`, async () => {
      const mod = await import(entry);
      expect(mod.default).toBeDefined();
    });
  });
});
