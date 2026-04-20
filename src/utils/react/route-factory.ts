import React, { FC } from "react";
import RouteComponent from "@/router/route-component";
import { RouteTypes } from "@/router/routes";

/**
 * 模块路由配置接口
 */
export interface ModuleRouteConfig {
  /** 模块基础路径 */
  basePath: string;
  /** 模块路由列表 */
  routes: RouteTypes[];
  /** 默认重定向路径 */
  redirectPath: string;
}

/**
 * 创建模块路由组件的工厂函数
 * 统一各个业务模块的路由配置模式，减少重复代码
 * 
 * @param config 模块路由配置
 * @returns React组件
 */
export const createModuleRoute = (config: ModuleRouteConfig): FC => {
  const ModuleRoute: FC = () => {
    return React.createElement(RouteComponent, {
      routes: config.routes,
      baseRouter: `${config.basePath}/*`,
      redirect: config.redirectPath,
    });
  };

  // 为组件添加displayName，便于调试
  ModuleRoute.displayName = `ModuleRoute(${config.basePath})`;

  return ModuleRoute;
};

/**
 * 创建标准化的模块路由配置
 * 提供一致的配置模式，简化路由定义
 * 
 * @param moduleName 模块名称
 * @param basePath 基础路径
 * @param routes 路由列表
 * @param defaultRoute 默认路由路径
 * @returns 模块路由配置
 */
export const createModuleConfig = (
  _moduleName: string,
  basePath: string,
  routes: RouteTypes[],
  defaultRoute: string
): ModuleRouteConfig => ({
  basePath,
  routes,
  redirectPath: defaultRoute,
});

export default {
  createModuleRoute,
  createModuleConfig,
};