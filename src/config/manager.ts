/**
 * 配置管理器
 * 提供配置的统一管理、读写、更新等功能
 */

import { 
  AppConfig, 
  ApiConfig, 
  ThemeConfig, 
  StorageConfig, 
  RouterConfig,
  EnvConfig,
  defaultAppConfig,
  defaultThemeConfig,
  defaultStorageConfig,
  defaultRouterConfig
} from './index';
import { Environment } from '@/types';

/**
 * 直接获取环境配置，避免循环依赖
 */
function getEnvConfigDirect(): EnvConfig {
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
}

/**
 * 直接获取API配置，避免循环依赖
 */
function getApiConfigDirect(): ApiConfig {
  const env = getEnvConfigDirect();
  
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
}

/**
 * 配置管理器类
 */
export class ConfigManager {
  private static instance: ConfigManager;
  
  // 配置缓存
  private envConfig!: EnvConfig;
  private appConfig!: AppConfig;
  private apiConfig!: ApiConfig;
  private themeConfig!: ThemeConfig;
  private storageConfig!: StorageConfig;
  private routerConfig!: RouterConfig;
  
  // 配置变更监听器
  private listeners: Map<string, ((config: any) => void)[]> = new Map();

  private constructor() {
    this.initConfigs();
  }

  /**
   * 获取配置管理器实例（单例）
   */
  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  /**
   * 初始化所有配置
   */
  private initConfigs(): void {
    this.envConfig = getEnvConfigDirect();
    this.appConfig = this.loadAppConfig();
    this.apiConfig = getApiConfigDirect();
    this.themeConfig = this.loadThemeConfig();
    this.storageConfig = defaultStorageConfig;
    this.routerConfig = defaultRouterConfig;
  }

  /**
   * 加载应用配置
   */
  private loadAppConfig(): AppConfig {
    try {
      const stored = localStorage.getItem(this.getStorageKey('app_config'));
      if (stored) {
        const config = JSON.parse(stored);
        return { ...defaultAppConfig, ...config };
      }
    } catch (error) {
      console.warn('Failed to load app config from storage:', error);
    }
    return defaultAppConfig;
  }

  /**
   * 加载主题配置
   */
  private loadThemeConfig(): ThemeConfig {
    try {
      const stored = localStorage.getItem(this.getStorageKey('theme_config'));
      if (stored) {
        const config = JSON.parse(stored);
        return { ...defaultThemeConfig, ...config };
      }
    } catch (error) {
      console.warn('Failed to load theme config from storage:', error);
    }
    return defaultThemeConfig;
  }

  /**
   * 获取存储键名
   */
  private getStorageKey(key: string): string {
    return `${this.storageConfig.prefix}${key}`;
  }

  /**
   * 保存配置到存储
   */
  private saveConfig(key: string, config: any): void {
    try {
      localStorage.setItem(this.getStorageKey(key), JSON.stringify(config));
    } catch (error) {
      console.error(`Failed to save ${key} config:`, error);
    }
  }

  /**
   * 触发配置变更监听器
   */
  private notifyListeners(configType: string, config: any): void {
    const listeners = this.listeners.get(configType) || [];
    listeners.forEach(listener => {
      try {
        listener(config);
      } catch (error) {
        console.error(`Config listener error for ${configType}:`, error);
      }
    });
  }

  // ==================== 配置获取方法 ====================

  /**
   * 获取环境配置
   */
  public getEnv(): EnvConfig {
    return this.envConfig;
  }

  /**
   * 获取应用配置
   */
  public getApp(): AppConfig {
    return this.appConfig;
  }

  /**
   * 获取API配置
   */
  public getApi(): ApiConfig {
    return this.apiConfig;
  }

  /**
   * 获取主题配置
   */
  public getTheme(): ThemeConfig {
    return this.themeConfig;
  }

  /**
   * 获取存储配置
   */
  public getStorage(): StorageConfig {
    return this.storageConfig;
  }

  /**
   * 获取路由配置
   */
  public getRouter(): RouterConfig {
    return this.routerConfig;
  }

  /**
   * 获取所有配置
   */
  public getAll() {
    return {
      env: this.envConfig,
      app: this.appConfig,
      api: this.apiConfig,
      theme: this.themeConfig,
      storage: this.storageConfig,
      router: this.routerConfig,
    };
  }

  // ==================== 配置更新方法 ====================

  /**
   * 更新应用配置
   */
  public updateApp(config: Partial<AppConfig>): void {
    this.appConfig = { ...this.appConfig, ...config };
    this.saveConfig('app_config', this.appConfig);
    this.notifyListeners('app', this.appConfig);
  }

  /**
   * 更新主题配置
   */
  public updateTheme(config: Partial<ThemeConfig>): void {
    this.themeConfig = { ...this.themeConfig, ...config };
    this.saveConfig('theme_config', this.themeConfig);
    this.notifyListeners('theme', this.themeConfig);
  }

  /**
   * 更新路由配置
   */
  public updateRouter(config: Partial<RouterConfig>): void {
    this.routerConfig = { ...this.routerConfig, ...config };
    this.notifyListeners('router', this.routerConfig);
  }

  /**
   * 重置配置到默认值
   */
  public reset(configType?: keyof ReturnType<ConfigManager['getAll']>): void {
    if (configType) {
      switch (configType) {
        case 'app':
          this.appConfig = defaultAppConfig;
          localStorage.removeItem(this.getStorageKey('app_config'));
          this.notifyListeners('app', this.appConfig);
          break;
        case 'theme':
          this.themeConfig = defaultThemeConfig;
          localStorage.removeItem(this.getStorageKey('theme_config'));
          this.notifyListeners('theme', this.themeConfig);
          break;
        case 'router':
          this.routerConfig = defaultRouterConfig;
          this.notifyListeners('router', this.routerConfig);
          break;
      }
    } else {
      // 重置所有配置
      this.appConfig = defaultAppConfig;
      this.themeConfig = defaultThemeConfig;
      this.routerConfig = defaultRouterConfig;
      
      localStorage.removeItem(this.getStorageKey('app_config'));
      localStorage.removeItem(this.getStorageKey('theme_config'));
      
      this.notifyListeners('app', this.appConfig);
      this.notifyListeners('theme', this.themeConfig);
      this.notifyListeners('router', this.routerConfig);
    }
  }

  // ==================== 配置监听方法 ====================

  /**
   * 添加配置变更监听器
   */
  public subscribe(
    configType: string, 
    listener: (config: any) => void
  ): () => void {
    if (!this.listeners.has(configType)) {
      this.listeners.set(configType, []);
    }
    
    const listeners = this.listeners.get(configType)!;
    listeners.push(listener);
    
    // 返回取消订阅函数
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }

  /**
   * 移除配置变更监听器
   */
  public unsubscribe(configType: string, listener?: (config: any) => void): void {
    if (!this.listeners.has(configType)) {
      return;
    }
    
    if (listener) {
      const listeners = this.listeners.get(configType)!;
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    } else {
      this.listeners.delete(configType);
    }
  }

  // ==================== 工具方法 ====================

  /**
   * 检查是否为开发环境
   */
  public isDev(): boolean {
    return this.envConfig.NODE_ENV === 'development';
  }

  /**
   * 检查是否为生产环境
   */
  public isProd(): boolean {
    return this.envConfig.NODE_ENV === 'production';
  }

  /**
   * 检查是否启用某个功能
   */
  public isFeatureEnabled(feature: keyof AppConfig['features']): boolean {
    return this.appConfig.features[feature];
  }

  /**
   * 获取完整的存储键名
   */
  public getFullStorageKey(key: keyof StorageConfig['keys']): string {
    return `${this.storageConfig.prefix}${this.storageConfig.keys[key]}`;
  }

  /**
   * 导出配置（用于备份）
   */
  public exportConfig(): string {
    return JSON.stringify({
      app: this.appConfig,
      theme: this.themeConfig,
      router: this.routerConfig,
      exportTime: new Date().toISOString(),
    }, null, 2);
  }

  /**
   * 导入配置（用于恢复）
   */
  public importConfig(configString: string): boolean {
    try {
      const config = JSON.parse(configString);
      
      if (config.app) {
        this.updateApp(config.app);
      }
      
      if (config.theme) {
        this.updateTheme(config.theme);
      }
      
      if (config.router) {
        this.updateRouter(config.router);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to import config:', error);
      return false;
    }
  }
}

// 导出配置管理器实例
export const configManager = ConfigManager.getInstance();

// 导出便捷访问函数
export const getConfig = () => configManager.getAll();
export const getEnvConfig = () => configManager.getEnv();
export const getAppConfig = () => configManager.getApp();
export const getApiConfig = () => configManager.getApi();
export const getThemeConfig = () => configManager.getTheme();
export const getStorageConfig = () => configManager.getStorage();
export const getRouterConfig = () => configManager.getRouter();