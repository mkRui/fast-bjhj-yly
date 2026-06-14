import type { NavigateFunction } from "react-router-dom";

/** 支持 pathname + query 的路由跳转（HashRouter 兼容） */
export function navigateToPath(navigate: NavigateFunction, path: string): void {
  const [pathname, search = ""] = path.split("?");
  navigate({
    pathname,
    search: search ? `?${search}` : "",
  });
}
