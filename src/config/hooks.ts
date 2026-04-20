/**
 * 配置相关的 React Hooks
 * 方便在组件中使用和监听配置变化
 */

import { useState, useEffect, useCallback } from 'react';
import { configManager } from './manager';
import { AppConfig, ThemeConfig, RouterConfig } from './index';

/**
 * 使用应用配置的 Hook
 */
export function useAppConfig() {
  const [config, setConfig] = useState<AppConfig>(configManager.getApp());

  useEffect(() => {
    const unsubscribe = configManager.subscribe('app', (newConfig: AppConfig) => {
      setConfig(newConfig);
    });

    return unsubscribe;
  }, []);

  const updateConfig = useCallback((updates: Partial<AppConfig>) => {
    configManager.updateApp(updates);
  }, []);

  return [config, updateConfig] as const;
}

/**
 * 使用主题配置的 Hook
 */
export function useThemeConfig() {
  const [config, setConfig] = useState<ThemeConfig>(configManager.getTheme());

  useEffect(() => {
    const unsubscribe = configManager.subscribe('theme', (newConfig: ThemeConfig) => {
      setConfig(newConfig);
    });

    return unsubscribe;
  }, []);

  const updateConfig = useCallback((updates: Partial<ThemeConfig>) => {
    configManager.updateTheme(updates);
  }, []);

  return [config, updateConfig] as const;
}

/**
 * 使用路由配置的 Hook
 */
export function useRouterConfig() {
  const [config, setConfig] = useState<RouterConfig>(configManager.getRouter());

  useEffect(() => {
    const unsubscribe = configManager.subscribe('router', (newConfig: RouterConfig) => {
      setConfig(newConfig);
    });

    return unsubscribe;
  }, []);

  const updateConfig = useCallback((updates: Partial<RouterConfig>) => {
    configManager.updateRouter(updates);
  }, []);

  return [config, updateConfig] as const;
}

/**
 * 使用环境配置的 Hook
 */
export function useEnvConfig() {
  return configManager.getEnv();
}

/**
 * 使用API配置的 Hook
 */
export function useApiConfig() {
  return configManager.getApi();
}

/**
 * 使用存储配置的 Hook
 */
export function useStorageConfig() {
  return configManager.getStorage();
}

/**
 * 使用功能开关的 Hook
 */
export function useFeature(feature: keyof AppConfig['features']) {
  const [config] = useAppConfig();
  return config.features[feature];
}

/**
 * 使用主题模式的 Hook
 */
export function useThemeMode() {
  const [config, updateConfig] = useThemeConfig();
  
  const setMode = useCallback((mode: ThemeConfig['mode']) => {
    updateConfig({ mode });
  }, [updateConfig]);

  const toggleMode = useCallback(() => {
    const newMode = config.mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  }, [config.mode, setMode]);

  return {
    mode: config.mode,
    setMode,
    toggleMode,
    isDark: config.mode === 'dark',
    isLight: config.mode === 'light',
  };
}

/**
 * 使用布局配置的 Hook
 */
export function useLayoutConfig() {
  const [config, updateConfig] = useAppConfig();
  
  const updateLayout = useCallback((updates: Partial<AppConfig['layout']>) => {
    updateConfig({
      layout: { ...config.layout, ...updates }
    });
  }, [config.layout, updateConfig]);

  const toggleSidebar = useCallback(() => {
    updateLayout({
      sidebarCollapsed: !config.layout.sidebarCollapsed
    });
  }, [config.layout.sidebarCollapsed, updateLayout]);

  return {
    layout: config.layout,
    updateLayout,
    toggleSidebar,
  };
}

/**
 * 使用缓存配置的 Hook
 */
export function useCacheConfig() {
  const [config, updateConfig] = useAppConfig();
  
  const updateCache = useCallback((updates: Partial<AppConfig['cache']>) => {
    updateConfig({
      cache: { ...config.cache, ...updates }
    });
  }, [config.cache, updateConfig]);

  return {
    cache: config.cache,
    updateCache,
  };
}

/**
 * 使用开发环境检查的 Hook
 */
export function useDevelopment() {
  const isDev = configManager.isDev();
  const isProd = configManager.isProd();
  
  return {
    isDev,
    isProd,
    isProduction: isProd,
    isDevelopment: isDev,
  };
}

/**
 * 使用配置导入导出的 Hook
 */
export function useConfigManager() {
  const exportConfig = useCallback(() => {
    return configManager.exportConfig();
  }, []);

  const importConfig = useCallback((configString: string) => {
    return configManager.importConfig(configString);
  }, []);

  const resetConfig = useCallback((configType?: Parameters<typeof configManager.reset>[0]) => {
    configManager.reset(configType);
  }, []);

  const downloadConfig = useCallback(() => {
    const config = exportConfig();
    const blob = new Blob([config], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bjhj-admin-config-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [exportConfig]);

  const uploadConfig = useCallback(() => {
    return new Promise<boolean>((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const content = event.target?.result as string;
            const success = importConfig(content);
            resolve(success);
          };
          reader.readAsText(file);
        } else {
          resolve(false);
        }
      };
      input.click();
    });
  }, [importConfig]);

  return {
    exportConfig,
    importConfig,
    resetConfig,
    downloadConfig,
    uploadConfig,
  };
}