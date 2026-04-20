/**
 * 业务类型定义
 * 定义项目特定的业务类型和接口
 */

// ==================== 用户相关类型 ====================

/**
 * 用户信息
 */
export interface UserInfo {
  id: string;
  username: string;
  nickname: string;
  email: string;
  phone: string;
  avatar?: string;
  status: UserStatus;
  roles: Role[];
  permissions: string[];
  lastLoginTime: string;
  createTime: string;
  updateTime: string;
}

/**
 * 用户状态
 */
export enum UserStatus {
  ACTIVE = 1,
  INACTIVE = 0,
  LOCKED = -1,
}

/**
 * 角色信息
 */
export interface Role {
  id: string;
  name: string;
  code: string;
  description: string;
  permissions: string[];
  status: RoleStatus;
  createTime: string;
  updateTime: string;
}

/**
 * 角色状态
 */
export enum RoleStatus {
  ENABLED = 1,
  DISABLED = 0,
}

/**
 * 权限信息
 */
export interface Permission {
  id: string;
  name: string;
  code: string;
  type: PermissionType;
  parentId?: string;
  path?: string;
  icon?: string;
  sort: number;
  status: PermissionStatus;
  children?: Permission[];
}

/**
 * 权限类型
 */
export enum PermissionType {
  MENU = 'menu',
  BUTTON = 'button',
  API = 'api',
}

/**
 * 权限状态
 */
export enum PermissionStatus {
  ENABLED = 1,
  DISABLED = 0,
}

// ==================== 系统相关类型 ====================

/**
 * 系统配置
 */
export interface SystemConfig {
  appName: string;
  appVersion: string;
  apiBaseUrl: string;
  uploadUrl: string;
  fileBaseUrl: string;
  theme: ThemeConfig;
  locale: LocaleConfig;
  features: FeatureConfig;
}

/**
 * 主题配置
 */
export interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto';
  primaryColor: string;
  borderRadius: string;
  fontSize: string;
}

/**
 * 语言配置
 */
export interface LocaleConfig {
  current: string;
  supported: string[];
  fallback: string;
}

/**
 * 功能配置
 */
export interface FeatureConfig {
  enableDarkMode: boolean;
  enableMultiLanguage: boolean;
  enableFileUpload: boolean;
  enableNotification: boolean;
  maxFileSize: number;
  allowedFileTypes: string[];
}

// ==================== 菜单相关类型 ====================

/**
 * 菜单项
 */
export interface MenuItem {
  id: string;
  name: string;
  path: string;
  icon?: string;
  component?: string;
  parentId?: string;
  sort: number;
  hideInMenu?: boolean;
  children?: MenuItem[];
  meta?: MenuMeta;
}

/**
 * 菜单元信息
 */
export interface MenuMeta {
  title: string;
  icon?: string;
  requiresAuth?: boolean;
  permissions?: string[];
  activeMenu?: string;
  noCache?: boolean;
  breadcrumb?: boolean;
}

// ==================== 文件相关类型 ====================

/**
 * 文件信息
 */
export interface FileInfo {
  id: string;
  name: string;
  originalName: string;
  url: string;
  size: number;
  type: string;
  extension: string;
  hash: string;
  uploadTime: string;
  uploader: string;
}

/**
 * 上传配置
 */
export interface UploadConfig {
  action: string;
  maxSize: number;
  allowedTypes: string[];
  multiple: boolean;
  directory: boolean;
  autoUpload: boolean;
}

/**
 * 上传进度
 */
export interface UploadProgress {
  percent: number;
  loaded: number;
  total: number;
  speed: number;
}

// ==================== 表格相关类型 ====================

/**
 * 表格列配置
 */
export interface TableColumn<T = any> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  width?: number | string;
  fixed?: 'left' | 'right';
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  ellipsis?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sorter?: (a: T, b: T) => number;
  filters?: FilterOption[];
  onFilter?: (value: any, record: T) => boolean;
}

/**
 * 过滤选项
 */
export interface FilterOption {
  text: string;
  value: any;
  children?: FilterOption[];
}

/**
 * 表格分页配置
 */
export interface TablePagination {
  current: number;
  pageSize: number;
  total: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => string;
  pageSizeOptions?: string[];
}

/**
 * 表格选择配置
 */
export interface TableSelection<T = any> {
  type: 'checkbox' | 'radio';
  selectedRowKeys: React.Key[];
  selectedRows: T[];
  onChange: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  onSelect?: (record: T, selected: boolean, selectedRows: T[], nativeEvent: Event) => void;
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
}

// ==================== 表单相关类型 ====================

/**
 * 表单项类型
 */
export type FormItemType =
  | 'input'
  | 'password'
  | 'textarea'
  | 'number'
  | 'select'
  | 'multiSelect'
  | 'radio'
  | 'checkbox'
  | 'switch'
  | 'date'
  | 'dateRange'
  | 'time'
  | 'upload'
  | 'editor'
  | 'custom';

/**
 * 表单项配置
 */
export interface FormItemConfig {
  name: string;
  label: string;
  type: FormItemType;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  tooltip?: string;
  rules?: FormRule[];
  options?: FormOption[];
  multiple?: boolean;
  allowClear?: boolean;
  showSearch?: boolean;
  defaultValue?: any;
  dependencies?: string[];
  grid?: FormGrid;
  component?: React.ComponentType<any>;
  componentProps?: Record<string, any>;
}

/**
 * 表单规则
 */
export interface FormRule {
  required?: boolean;
  pattern?: RegExp;
  min?: number;
  max?: number;
  len?: number;
  type?: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'date' | 'email' | 'url';
  validator?: (rule: FormRule, value: any) => Promise<void>;
  message?: string;
  trigger?: 'onChange' | 'onBlur' | 'onFocus';
}

/**
 * 表单选项
 */
export interface FormOption {
  label: string;
  value: any;
  disabled?: boolean;
  children?: FormOption[];
}

/**
 * 表单布局
 */
export interface FormGrid {
  span?: number;
  offset?: number;
  push?: number;
  pull?: number;
  order?: number;
  xs?: number | FormGrid;
  sm?: number | FormGrid;
  md?: number | FormGrid;
  lg?: number | FormGrid;
  xl?: number | FormGrid;
  xxl?: number | FormGrid;
}

// ==================== 通知相关类型 ====================

/**
 * 通知类型
 */
export type NotificationType = 'success' | 'info' | 'warning' | 'error';

/**
 * 通知配置
 */
export interface NotificationConfig {
  type: NotificationType;
  title: string;
  content?: string;
  duration?: number;
  showClose?: boolean;
  onClick?: () => void;
  onClose?: () => void;
}

/**
 * 消息配置
 */
export interface MessageConfig {
  type: NotificationType;
  content: string;
  duration?: number;
  key?: string;
  onClick?: () => void;
  onClose?: () => void;
}

// ==================== 统计相关类型 ====================

/**
 * 图表类型
 */
export type ChartType = 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'heatmap' | 'radar';

/**
 * 图表数据
 */
export interface ChartData {
  name: string;
  value: number;
  category?: string;
  [key: string]: any;
}

/**
 * 图表配置
 */
export interface ChartConfig {
  type: ChartType;
  title?: string;
  data: ChartData[];
  xAxis?: string;
  yAxis?: string;
  colors?: string[];
  legend?: boolean;
  grid?: boolean;
  tooltip?: boolean;
  responsive?: boolean;
}

/**
 * 统计卡片数据
 */
export interface StatCardData {
  title: string;
  value: number | string;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
  icon?: string;
  color?: string;
}

// ==================== 错误相关类型 ====================

/**
 * 错误级别
 */
export enum ErrorLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

/**
 * 错误信息
 */
export interface ErrorInfo {
  code: string;
  message: string;
  level: ErrorLevel;
  timestamp: number;
  stack?: string;
  context?: Record<string, any>;
}

/**
 * API错误
 */
export interface ApiError extends Error {
  code: string;
  status: number;
  data?: any;
}

// ==================== 状态相关类型 ====================

/**
 * 请求状态
 */
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * 异步状态
 */
export interface AsyncState<T = any> {
  status: RequestStatus;
  data?: T;
  error?: Error;
}

/**
 * 分页状态
 */
export interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
  loading: boolean;
}

// ==================== 搜索相关类型 ====================

/**
 * 搜索条件
 */
export interface SearchCondition {
  field: string;
  operator: SearchOperator;
  value: any;
  logic?: 'and' | 'or';
}

/**
 * 搜索操作符
 */
export type SearchOperator =
  | 'eq'      // 等于
  | 'ne'      // 不等于
  | 'gt'      // 大于
  | 'gte'     // 大于等于
  | 'lt'      // 小于
  | 'lte'     // 小于等于
  | 'in'      // 包含
  | 'nin'     // 不包含
  | 'like'    // 模糊匹配
  | 'between' // 范围
  | 'null'    // 为空
  | 'notNull'; // 不为空

/**
 * 排序条件
 */
export interface SortCondition {
  field: string;
  order: 'asc' | 'desc';
}

/**
 * 高级搜索配置
 */
export interface AdvancedSearchConfig {
  conditions: SearchCondition[];
  sorts: SortCondition[];
  pagination: {
    current: number;
    pageSize: number;
  };
}