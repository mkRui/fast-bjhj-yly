/**
 * 标准化组件导出工具
 * 提供一致的组件导出模式，提升代码的可维护性
 */

/**
 * 简单组件导出 - 用于只有一个主组件的情况
 * @param Component 主组件
 * @returns 导出的组件
 */
export const exportSingleComponent = <T>(Component: T): T => Component;

/**
 * 多组件导出 - 用于有多个组件需要导出的情况
 * @param components 组件映射对象
 * @returns 导出的组件对象
 */
export const exportMultipleComponents = <T extends Record<string, any>>(
  components: T
): T => components;

/**
 * 命名导出组件 - 用于需要同时提供默认导出和命名导出的情况
 * @param defaultComponent 默认组件
 * @param namedComponents 命名组件
 * @returns 包含默认和命名导出的对象
 */
export const exportNamedComponents = <
  D,
  N extends Record<string, any>
>(
  defaultComponent: D,
  namedComponents: N
): { default: D } & N => ({
  default: defaultComponent,
  ...namedComponents,
});

/**
 * 组件类型定义助手
 */
export interface ComponentExport<T = any> {
  default: T;
}

/**
 * 检查组件是否为有效的React组件
 */
export const isValidComponent = (component: any): boolean => {
  return (
    typeof component === 'function' ||
    (typeof component === 'object' && component !== null)
  );
};

export default {
  exportSingleComponent,
  exportMultipleComponents,
  exportNamedComponents,
  isValidComponent,
};