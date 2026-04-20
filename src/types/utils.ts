/**
 * 类型工具集合
 * 提供常用的类型操作和泛型工具
 */

// ==================== 基础类型工具 ====================

/**
 * 深度只读
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * 深度可选
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * 深度必需
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * 类型安全的键值对
 */
export type SafeKeyof<T> = keyof T extends string ? keyof T : string;

/**
 * 提取对象值的类型
 */
export type ValueOf<T> = T[keyof T];

/**
 * 排除null和undefined
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * 可空类型
 */
export type Nullable<T> = T | null;

/**
 * 可为undefined类型
 */
export type Optional<T> = T | undefined;

/**
 * 严格的对象类型
 */
export type StrictObject<T> = T & Record<string, never>;

// ==================== 函数类型工具 ====================

/**
 * 函数参数类型
 */
export type ArgumentTypes<F extends (...args: any[]) => any> = F extends (
  ...args: infer A
) => any
  ? A
  : never;

/**
 * 函数返回类型（异步安全）
 */
export type ReturnType<F extends (...args: any[]) => any> = F extends (
  ...args: any[]
) => infer R
  ? R extends Promise<infer P>
    ? P
    : R
  : never;

/**
 * 异步函数类型
 */
export type AsyncFunction<T extends (...args: any[]) => any> = (
  ...args: ArgumentTypes<T>
) => Promise<ReturnType<T>>;

/**
 * 事件处理函数类型
 */
export type EventHandler<T = any> = (event: T) => void;

/**
 * 回调函数类型
 */
export type Callback<T = void> = () => T;

/**
 * 错误处理函数类型
 */
export type ErrorHandler = (error: Error) => void;

// ==================== 数组类型工具 ====================

/**
 * 数组元素类型
 */
export type ArrayElement<T> = T extends (infer U)[] ? U : never;

/**
 * 非空数组
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * 元组到联合类型
 */
export type TupleToUnion<T extends readonly any[]> = T[number];

/**
 * 固定长度数组
 */
export type FixedArray<T, N extends number> = T[] & { length: N };

// ==================== 对象类型工具 ====================

/**
 * 对象路径类型
 */
export type ObjectPath<T, K extends keyof T = keyof T> = K extends string
  ? T[K] extends Record<string, any>
    ? `${K}` | `${K}.${ObjectPath<T[K]>}`
    : `${K}`
  : never;

/**
 * 根据路径获取值类型
 */
export type ObjectPathValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? ObjectPathValue<T[K], Rest>
    : never
  : P extends keyof T
  ? T[P]
  : never;

/**
 * 对象键值映射
 */
export type KeyValueMap<T> = {
  [K in keyof T]: {
    key: K;
    value: T[K];
  };
}[keyof T];

/**
 * 按值类型过滤键
 */
export type KeysByValueType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

/**
 * 按值类型提取属性
 */
export type PickByValueType<T, U> = Pick<T, KeysByValueType<T, U>>;

/**
 * 按值类型排除属性
 */
export type OmitByValueType<T, U> = Omit<T, KeysByValueType<T, U>>;

// ==================== API类型工具 ====================

/**
 * API响应包装器
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  code: number;
}

/**
 * 分页响应
 */
export interface PaginatedResponse<T = any> {
  records: T[];
  current: number;
  size: number;
  total: number;
  pages: number;
}

/**
 * 分页请求参数
 */
export interface PaginationParams {
  current: number;
  size: number;
}

/**
 * 搜索参数
 */
export interface SearchParams extends PaginationParams {
  keyword?: string;
  [key: string]: any;
}

/**
 * 排序参数
 */
export interface SortParams {
  field: string;
  order: 'asc' | 'desc';
}

// ==================== 表单类型工具 ====================

/**
 * 表单字段配置
 */
export interface FormFieldConfig<T = any> {
  name: string;
  label: string;
  type: 'input' | 'select' | 'textarea' | 'date' | 'number' | 'checkbox' | 'radio';
  required?: boolean;
  defaultValue?: T;
  rules?: ValidationRule<T>[];
  options?: { label: string; value: any }[];
  placeholder?: string;
  disabled?: boolean;
}

/**
 * 验证规则
 */
export interface ValidationRule<T = any> {
  required?: boolean;
  pattern?: RegExp;
  min?: number;
  max?: number;
  validator?: (value: T) => string | null;
  message?: string;
}

/**
 * 表单状态
 */
export interface FormState<T = any> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isSubmitting: boolean;
}

// ==================== 组件类型工具 ====================

/**
 * React组件属性
 */
export type ComponentProps<T extends React.ComponentType<any>> = T extends React.ComponentType<
  infer P
>
  ? P
  : never;

/**
 * 带ref的组件属性
 */
export type ComponentPropsWithRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>;

/**
 * 多态组件属性
 */
export type PolymorphicProps<T extends React.ElementType> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

/**
 * 主题配置
 */
export interface ThemeConfig {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  typography: Record<string, any>;
  breakpoints: Record<string, string>;
}

// ==================== 状态管理类型工具 ====================

/**
 * Store状态
 */
export interface StoreState {
  loading: boolean;
  error: Error | null;
  [key: string]: any;
}

/**
 * Action类型
 */
export interface Action<T = any> {
  type: string;
  payload?: T;
}

/**
 * Reducer类型
 */
export type Reducer<S, A> = (state: S, action: A) => S;

// ==================== 路由类型工具 ====================

/**
 * 路由配置
 */
export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  children?: RouteConfig[];
  meta?: RouteMeta;
}

/**
 * 路由元信息
 */
export interface RouteMeta {
  title?: string;
  icon?: React.ReactNode;
  requiresAuth?: boolean;
  permissions?: string[];
  hideInMenu?: boolean;
}

// ==================== 工具类型集合 ====================

/**
 * 条件类型
 */
export type If<C extends boolean, T, F> = C extends true ? T : F;

/**
 * 类型相等判断
 */
export type IsEqual<T, U> = T extends U ? (U extends T ? true : false) : false;

/**
 * 类型联合转交集
 */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

/**
 * 获取联合类型的最后一个
 */
export type LastOfUnion<T> = UnionToIntersection<T extends any ? () => T : never> extends () => infer R
  ? R
  : never;

/**
 * 联合类型转元组
 */
export type UnionToTuple<T, L = LastOfUnion<T>, N = [T] extends [never] ? true : false> = true extends N
  ? []
  : [...UnionToTuple<Exclude<T, L>>, L];

// ==================== 导出类型别名 ====================

/**
 * 常用类型别名
 */
export type ID = string | number;
export type Timestamp = number;
export type DateString = string;
export type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
export type JSONObject = { [key: string]: JSONValue };
export type JSONArray = JSONValue[];

/**
 * 环境类型
 */
export type Environment = 'development' | 'production' | 'test';

/**
 * 主题模式
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * 语言代码
 */
export type LanguageCode = 'zh-CN' | 'en-US' | 'ja-JP';

/**
 * 状态类型
 */
export type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * 尺寸类型
 */
export type Size = 'small' | 'medium' | 'large';

/**
 * 位置类型
 */
export type Position = 'top' | 'right' | 'bottom' | 'left';

/**
 * 对齐方式
 */
export type Alignment = 'start' | 'center' | 'end';

/**
 * 方向类型
 */
export type Direction = 'horizontal' | 'vertical';