/**
 * 配置管理系统
 * 统一管理项目的所有配置信息
 */

import { Environment, ThemeMode, LanguageCode } from '@/types';

// ==================== 环境配置 ====================

/**
 * 环境变量配置
 */
export interface EnvConfig {
  // 基础配置
  NODE_ENV: Environment;
  VITE_APP_TITLE: string;
  VITE_APP_VERSION: string;
  
  // API配置
  VITE_API_BASE_URL: string;
  VITE_API_TIMEOUT: number;
  
  // 上传配置
  VITE_UPLOAD_URL: string;
  VITE_FILE_BASE_URL: string;
  VITE_MAX_FILE_SIZE: number;
  
  // 功能开关
  VITE_ENABLE_MOCK: boolean;
  VITE_ENABLE_ANALYTICS: boolean;
  VITE_ENABLE_ERROR_REPORTING: boolean;
  
  // 调试配置
  VITE_ENABLE_CONSOLE: boolean;
  VITE_ENABLE_DEVTOOLS: boolean;
}

/**
 * 获取环境变量配置
 */
export const getEnvConfig = (): EnvConfig => {
  return {
    NODE_ENV: (import.meta.env.NODE_ENV as Environment) || 'development',
    VITE_APP_TITLE: import.meta.env.VITE_APP_TITLE || '北京环境交易所管理系统',
    VITE_APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
    
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
    VITE_API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
    
    VITE_UPLOAD_URL: import.meta.env.VITE_UPLOAD_URL || '/api/upload',
    VITE_FILE_BASE_URL: import.meta.env.VITE_FILE_BASE_URL || '',
    VITE_MAX_FILE_SIZE: Number(import.meta.env.VITE_MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB
    
    VITE_ENABLE_MOCK: import.meta.env.VITE_ENABLE_MOCK === 'true',
    VITE_ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    VITE_ENABLE_ERROR_REPORTING: import.meta.env.VITE_ENABLE_ERROR_REPORTING === 'true',
    
    VITE_ENABLE_CONSOLE: import.meta.env.VITE_ENABLE_CONSOLE !== 'false',
    VITE_ENABLE_DEVTOOLS: import.meta.env.VITE_ENABLE_DEVTOOLS !== 'false',
  };
};

// ==================== 应用配置 ====================

/**
 * 应用主配置
 */
export interface AppConfig {
  // 基础信息
  name: string;
  version: string;
  description: string;
  author: string;
  
  // 默认设置
  defaultTheme: ThemeMode;
  defaultLanguage: LanguageCode;
  defaultPageSize: number;
  
  // 功能配置
  features: {
    enableDarkMode: boolean;
    enableMultiLanguage: boolean;
    enableFullscreen: boolean;
    enableBreadcrumb: boolean;
    enableTabs: boolean;
    enableWatermark: boolean;
    enableAnimation: boolean;
  };
  
  // 布局配置
  layout: {
    sidebarCollapsed: boolean;
    sidebarWidth: number;
    headerHeight: number;
    footerHeight: number;
    contentPadding: number;
  };
  
  // 缓存配置
  cache: {
    enableRouteCache: boolean;
    enableApiCache: boolean;
    cacheTimeout: number;
    maxCacheSize: number;
  };
}

/**
 * 默认应用配置
 */
export const defaultAppConfig: AppConfig = {
  name: '北京环境交易所管理系统',
  version: '1.0.0',
  description: '北京环境交易所后台管理系统',
  author: 'MkRui Team',
  
  defaultTheme: 'light',
  defaultLanguage: 'zh-CN',
  defaultPageSize: 10,
  
  features: {
    enableDarkMode: true,
    enableMultiLanguage: true,
    enableFullscreen: true,
    enableBreadcrumb: true,
    enableTabs: true,
    enableWatermark: false,
    enableAnimation: true,
  },
  
  layout: {
    sidebarCollapsed: false,
    sidebarWidth: 240,
    headerHeight: 64,
    footerHeight: 48,
    contentPadding: 24,
  },
  
  cache: {
    enableRouteCache: true,
    enableApiCache: true,
    cacheTimeout: 5 * 60 * 1000, // 5分钟
    maxCacheSize: 100,
  },
};

// ==================== API配置 ====================

/**
 * API配置
 */
export interface ApiConfig {
  baseURL: string;
  timeout: number;
  retryTimes: number;
  retryDelay: number;
  withCredentials: boolean;
  
  // 请求头配置
  headers: {
    'Content-Type': string;
    'Accept': string;
    [key: string]: string;
  };
  
  // 状态码配置
  successCodes: number[];
  errorCodes: {
    unauthorized: number;
    forbidden: number;
    notFound: number;
    serverError: number;
  };
}

/**
 * 获取API配置
 */
export const getApiConfig = (): ApiConfig => {
  const env = getEnvConfig();
  
  return {
    baseURL: env.VITE_API_BASE_URL,
    timeout: env.VITE_API_TIMEOUT,
    retryTimes: 3,
    retryDelay: 1000,
    withCredentials: true,
    
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    
    successCodes: [200, 201, 204],
    errorCodes: {
      unauthorized: 401,
      forbidden: 403,
      notFound: 404,
      serverError: 500,
    },
  };
};

// ==================== 主题配置 ====================

/**
 * 主题配置
 */
export interface ThemeConfig {
  mode: ThemeMode;
  
  // 颜色配置
  colors: {
    primary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    
    // 中性色
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
    
    background: {
      default: string;
      paper: string;
      alt: string;
    };
    
    border: {
      default: string;
      light: string;
      dark: string;
    };
  };
  
  // 字体配置
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
    
    fontWeight: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };
  
  // 间距配置
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  
  // 阴影配置
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  
  // 圆角配置
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  
  // 断点配置
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  
  // 动画配置
  animation: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    
    easing: {
      ease: string;
      easeIn: string;
      easeOut: string;
      easeInOut: string;
    };
  };
}

/**
 * 默认主题配置
 */
export const defaultThemeConfig: ThemeConfig = {
  mode: 'light',
  
  colors: {
    primary: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d',
    info: '#13c2c2',
    
    text: {
      primary: 'rgba(0, 0, 0, 0.85)',
      secondary: 'rgba(0, 0, 0, 0.65)',
      disabled: 'rgba(0, 0, 0, 0.25)',
    },
    
    background: {
      default: '#ffffff',
      paper: '#fafafa',
      alt: '#f5f5f5',
    },
    
    border: {
      default: '#d9d9d9',
      light: '#f0f0f0',
      dark: '#bfbfbf',
    },
  },
  
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
    },
    
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  
  borderRadius: {
    none: '0',
    sm: '2px',
    md: '4px',
    lg: '8px',
    xl: '12px',
    full: '9999px',
  },
  
  breakpoints: {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1600px',
  },
  
  animation: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.6s',
    },
    
    easing: {
      ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
};

// ==================== 存储配置 ====================

/**
 * 存储配置
 */
export interface StorageConfig {
  // 存储键名前缀
  prefix: string;
  
  // 存储键名
  keys: {
    token: string;
    userInfo: string;
    permissions: string;
    theme: string;
    language: string;
    sidebarCollapsed: string;
    visitedRoutes: string;
    cachedRoutes: string;
  };
  
  // 存储类型
  types: {
    session: string[];
    local: string[];
  };
}

/**
 * 默认存储配置
 */
export const defaultStorageConfig: StorageConfig = {
  prefix: 'bjhj_admin_',
  
  keys: {
    token: 'token',
    userInfo: 'user_info',
    permissions: 'permissions',
    theme: 'theme',
    language: 'language',
    sidebarCollapsed: 'sidebar_collapsed',
    visitedRoutes: 'visited_routes',
    cachedRoutes: 'cached_routes',
  },
  
  types: {
    session: ['token'],
    local: [
      'userInfo',
      'permissions',
      'theme',
      'language',
      'sidebarCollapsed',
      'visitedRoutes',
      'cachedRoutes',
    ],
  },
};

// ==================== 路由配置 ====================

/**
 * 路由配置
 */
export interface RouterConfig {
  // 基础路径
  basename: string;
  
  // 默认路由
  defaultRoute: string;
  
  // 登录路由
  loginRoute: string;
  
  // 404路由
  notFoundRoute: string;
  
  // 无权限路由
  noPermissionRoute: string;
  
  // 路由模式
  mode: 'hash' | 'history';
  
  // 是否启用进度条
  enableProgress: boolean;
  
  // 是否启用路由缓存
  enableCache: boolean;
  
  // 白名单路由（无需权限）
  whiteList: string[];
}

/**
 * 默认路由配置
 */
export const defaultRouterConfig: RouterConfig = {
  basename: '/',
  defaultRoute: '/system/account',
  loginRoute: '/login',
  notFoundRoute: '/404',
  noPermissionRoute: '/403',
  mode: 'history',
  enableProgress: true,
  enableCache: true,
  whiteList: ['/login', '/404', '/403'],
};

// 注意：不在此处导出 manager 和 hooks，避免循环依赖
// 如需使用配置管理器，请直接从 './manager' 或 './hooks' 导入