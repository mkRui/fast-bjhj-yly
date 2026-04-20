// 导入所有类型定义
import * as types from "./types";

// 导出通用类型定义 - 从common模块导出基础类型
export type {
  BaseEntity,
  PaginationParams,
  PaginationResponse,
  ApiResponse,
  FormRule,
  BaseComponentProps,
  TableColumn,
  MenuItem,
  RouteConfig,
  Optional,
  ValueOf,
  DeepPartial
} from "./common";

export {
  BaseStatus,
  HttpMethod,
  ResponseCode,
  ComponentSize,
  Theme
} from "./common";

// 导出枚举类型
export * from "./enum-types";

// 导出高级工具类型
export type {
  DeepReadonly,
  DeepRequired,
  SafeKeyof,
  NonNullable,
  Nullable,
  StrictObject,
  ArgumentTypes,
  ReturnType as UtilReturnType,
  AsyncFunction,
  EventHandler,
  Callback,
  ErrorHandler,
  ArrayElement,
  NonEmptyArray,
  TupleToUnion,
  FixedArray,
  ObjectPath,
  ObjectPathValue,
  KeyValueMap,
  KeysByValueType,
  PickByValueType,
  OmitByValueType,
  PaginatedResponse,
  Environment,
  ThemeMode,
  LanguageCode,
  ValidationRule,
  FormFieldConfig
} from "./utils";

// 导出业务类型
export type {
  UserInfo,
  Role,
  Permission,
  SystemConfig,
  ThemeConfig,
  LocaleConfig,
  FeatureConfig,
  FileInfo,
  UploadConfig,
  UploadProgress,
  NotificationConfig,
  ChartConfig
} from "./business";

export {
  UserStatus,
  RoleStatus,
  PermissionType,
  PermissionStatus
} from "./business";

type T = typeof types;

/**
 * 获取枚举类型的显示值
 * 用于将枚举值转换为用户友好的显示文本
 * 
 * @param name 枚举类型名称
 * @param value 枚举值
 * @returns 显示文本
 */
export function getTypesValue<N extends keyof T, V extends keyof T[N]>(
  name: N,
  value: V
): string {
  // 优化判断方式，增强类型安全
  if (typeof value === "object" || typeof value === "undefined" || value === null) {
    return "";
  }
  
  const typeGroup = types[name];
  if (!typeGroup || !(value in typeGroup)) {
    return String(value);
  }
  
  return String(typeGroup[value]);
}

// 默认导出所有类型
export { types as default };
