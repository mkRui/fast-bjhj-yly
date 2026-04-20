/**
 * 统一的类型定义组织工具
 * 提供一致的接口和枚举组织模式
 */

/**
 * 基础实体接口
 */
export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 分页请求参数
 */
export interface PaginationParams {
  current?: number;
  page?: number;
  pageSize?: number;
  size?: number;
  total?: number;
}

/**
 * 分页响应数据
 */
export interface PaginationResponse<T = any> {
  data: T[];
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/**
 * API响应的统一格式
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  code?: number;
}

/**
 * 表单字段验证规则
 */
export interface FormRule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  min?: number;
  max?: number;
  validator?: (rule: any, value: any) => Promise<void>;
}

/**
 * 组件基础属性
 */
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * 表格列配置
 */
export interface TableColumn<T = any> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sorter?: boolean;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
}

/**
 * 菜单项类型
 */
export interface MenuItem {
  id: string;
  name: string;
  href: string;
  code: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  parentId?: string;
}

/**
 * 路由配置类型
 */
export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  title?: string;
  icon?: React.ReactNode;
  children?: RouteConfig[];
  meta?: {
    requireAuth?: boolean;
    roles?: string[];
    [key: string]: any;
  };
}

/**
 * 状态枚举基类
 */
export enum BaseStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  DELETED = 'deleted',
}

/**
 * HTTP请求方法枚举
 */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

/**
 * 响应状态码枚举
 */
export enum ResponseCode {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

/**
 * 组件大小枚举
 */
export enum ComponentSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

/**
 * 主题枚举
 */
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto',
}

/**
 * 工具类型定义
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export type ValueOf<T> = T[keyof T];
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export default {
  BaseStatus,
  HttpMethod,
  ResponseCode,
  ComponentSize,
  Theme,
};