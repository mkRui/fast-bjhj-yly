/**
 * 工具函数主模块
 * 统一导出所有工具函数，提供便捷的访问接口
 */

// 通用工具函数
export * from './common';

// 数据结构处理工具
export * from './data-structure';

// React 相关工具
export * from './react';

// 表单处理工具
export * from './form';

// 性能优化工具
export * from './performance';

// 为了向后兼容，保留原有的导出方式
export { default as timeFormat } from './common/time-format';
export { default as localStorage } from './common/local-storage';
export { default as eventDispatch } from './common/event-dispatch';
export { Tree, Flatten, Search } from './data-structure/tree';
export { Debounced } from './performance/debounce';
export { default as HocUtils } from './react/hoc-utils';
export { lazyLoad, dynamicImport } from './react/lazy-load';
export { default as withRouterEnhance } from './react/with-router-enhance';
export { createModuleRoute, createModuleConfig } from './react/route-factory';
export { FormRules, CommonFormRules } from './form/form-rules';
export { default as quillConfig } from './form/quill-config';