/**
 * API服务配置和初始化
 * 统一注册和管理所有API服务
 */

import { apiServiceManager } from './service-manager';
import {
  UserApiService,
  RoleApiService,
  PermissionApiService,
  TemplateApiService,
  ChannelApiService,
  PageApiService,
  IntentionApiService,
  FileApiService,
} from './services';

/**
 * API服务类型定义
 */
export interface ApiServices {
  user: UserApiService;
  role: RoleApiService;
  permission: PermissionApiService;
  template: TemplateApiService;
  channel: ChannelApiService;
  page: PageApiService;
  intention: IntentionApiService;
  file: FileApiService;
}

/**
 * 初始化所有API服务
 */
export function initializeApiServices(): ApiServices {
  // 注册系统管理相关服务
  const userService = apiServiceManager.register('user', UserApiService);
  const roleService = apiServiceManager.register('role', RoleApiService);
  const permissionService = apiServiceManager.register('permission', PermissionApiService);

  // 注册内容管理相关服务
  const templateService = apiServiceManager.register('template', TemplateApiService);

  // 注册运营管理相关服务
  const channelService = apiServiceManager.register('channel', ChannelApiService);
  const pageService = apiServiceManager.register('page', PageApiService);

  // 注册业务管理相关服务
  const intentionService = apiServiceManager.register('intention', IntentionApiService);

  // 注册文件管理相关服务
  const fileService = apiServiceManager.register('file', FileApiService);

  return {
    user: userService,
    role: roleService,
    permission: permissionService,
    template: templateService,
    channel: channelService,
    page: pageService,
    intention: intentionService,
    file: fileService,
  };
}

/**
 * 获取API服务实例
 */
export function getApiService<K extends keyof ApiServices>(name: K): ApiServices[K] {
  return apiServiceManager.get(name) as ApiServices[K];
}

/**
 * 获取所有API服务
 */
export function getAllApiServices(): ApiServices {
  return {
    user: getApiService('user'),
    role: getApiService('role'),
    permission: getApiService('permission'),
    template: getApiService('template'),
    channel: getApiService('channel'),
    page: getApiService('page'),
    intention: getApiService('intention'),
    file: getApiService('file'),
  };
}

/**
 * API服务提供者Hook
 */
export function useApiServices(): ApiServices {
  return getAllApiServices();
}

/**
 * 单个API服务Hook
 */
export function useApiService<K extends keyof ApiServices>(name: K): ApiServices[K] {
  return getApiService(name);
}

// 自动初始化API服务
let initialized = false;

export function ensureApiServicesInitialized(): ApiServices {
  if (!initialized) {
    initializeApiServices();
    initialized = true;
  }
  return getAllApiServices();
}

// 导出API服务实例（延迟初始化）
export const apiServices = new Proxy({} as ApiServices, {
  get(_target, prop: keyof ApiServices) {
    ensureApiServicesInitialized();
    return getApiService(prop);
  },
});

// 兼容原有的API导出方式
export { apiServiceManager } from './service-manager';
export * from './services';