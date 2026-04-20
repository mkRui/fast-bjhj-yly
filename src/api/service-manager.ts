/**
 * API服务管理器
 * 统一管理所有API服务，提供统一的调用模式
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse, PaginationParams, PaginatedResponse } from '@/types';
import { getApiConfig } from '@/config';

/**
 * API服务基类
 */
export abstract class BaseApiService {
  protected request: AxiosInstance;
  protected baseURL: string;

  constructor(baseURL?: string) {
    const config = getApiConfig();
    this.baseURL = baseURL || config.baseURL;
    
    this.request = axios.create({
      baseURL: this.baseURL,
      timeout: config.timeout,
      withCredentials: config.withCredentials,
      headers: config.headers,
    });

    this.setupInterceptors();
  }

  /**
   * 设置请求和响应拦截器
   */
  private setupInterceptors(): void {
    // 请求拦截器
    this.request.interceptors.request.use(
      (config) => {
        // 添加认证token
        const token = this.getAuthToken();
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }

        // 添加请求ID用于追踪
        config.headers = config.headers || {};
        config.headers['X-Request-ID'] = this.generateRequestId();

        // 打印请求日志（开发环境）
        if (process.env.NODE_ENV === 'development') {
          console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
            params: config.params,
            data: config.data,
          });
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.request.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        // 打印响应日志（开发环境）
        if (process.env.NODE_ENV === 'development') {
          console.log(`[API Response] ${response.config.url}`, response.data);
        }

        // 检查业务状态码
        if (response.data && !response.data.success) {
          const error = new Error(response.data.message || 'API请求失败');
          (error as any).code = response.data.code;
          (error as any).data = response.data.data;
          return Promise.reject(error);
        }

        return response;
      },
      (error) => {
        this.handleResponseError(error);
        return Promise.reject(error);
      }
    );
  }

  /**
   * 处理响应错误
   */
  private handleResponseError(error: any): void {
    const config = getApiConfig();
    
    if (error.response) {
      // 服务器响应了错误状态码
      const { status, data } = error.response;
      
      switch (status) {
        case config.errorCodes.unauthorized:
          this.handleUnauthorized();
          break;
        case config.errorCodes.forbidden:
          this.handleForbidden();
          break;
        case config.errorCodes.notFound:
          console.warn('API接口不存在:', error.config?.url);
          break;
        case config.errorCodes.serverError:
          console.error('服务器内部错误:', data);
          break;
      }
    } else if (error.request) {
      // 请求发送但没有收到响应
      console.error('网络错误，请检查网络连接');
    } else {
      // 其他错误
      console.error('请求配置错误:', error.message);
    }
  }

  /**
   * 处理未授权错误
   */
  private handleUnauthorized(): void {
    // 清除本地存储的认证信息
    this.clearAuthToken();
    
    // 跳转到登录页
    window.location.href = '/login';
  }

  /**
   * 处理禁止访问错误
   */
  private handleForbidden(): void {
    console.warn('没有权限访问该资源');
    // 可以跳转到无权限页面
    // window.location.href = '/403';
  }

  /**
   * 获取认证token
   */
  private getAuthToken(): string | null {
    return localStorage.getItem('bjhj_admin_token') || sessionStorage.getItem('bjhj_admin_token');
  }

  /**
   * 清除认证token
   */
  private clearAuthToken(): void {
    localStorage.removeItem('bjhj_admin_token');
    sessionStorage.removeItem('bjhj_admin_token');
  }

  /**
   * 生成请求ID
   */
  private generateRequestId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // ==================== 通用API方法 ====================

  /**
   * GET请求
   */
  protected async get<T = any>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.request.get<ApiResponse<T>>(url, {
      params,
      ...config,
    });
    return response.data;
  }

  /**
   * POST请求
   */
  protected async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.request.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  /**
   * PUT请求
   */
  protected async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.request.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  /**
   * DELETE请求
   */
  protected async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.request.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  /**
   * PATCH请求
   */
  protected async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.request.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  // ==================== 标准化API方法 ====================

  /**
   * 获取分页列表
   */
  protected async getPagedList<T = any>(
    url: string,
    params: PaginationParams & Record<string, any> = { current: 1, size: 10 }
  ): Promise<ApiResponse<PaginatedResponse<T>>> {
    return this.get<PaginatedResponse<T>>(url, params);
  }

  /**
   * 获取单个资源详情
   */
  protected async getDetail<T = any>(
    url: string,
    id: string | number
  ): Promise<ApiResponse<T>> {
    return this.get<T>(`${url}/${id}`);
  }

  /**
   * 创建资源
   */
  protected async create<T = any>(
    url: string,
    data: Record<string, any>
  ): Promise<ApiResponse<T>> {
    return this.post<T>(url, data);
  }

  /**
   * 更新资源
   */
  protected async update<T = any>(
    url: string,
    id: string | number,
    data: Record<string, any>
  ): Promise<ApiResponse<T>> {
    return this.put<T>(`${url}/${id}`, data);
  }

  /**
   * 删除资源
   */
  protected async remove<T = any>(
    url: string,
    id: string | number
  ): Promise<ApiResponse<T>> {
    return this.delete<T>(`${url}/${id}`);
  }

  /**
   * 批量删除
   */
  protected async batchRemove<T = any>(
    url: string,
    ids: (string | number)[]
  ): Promise<ApiResponse<T>> {
    return this.post<T>(`${url}/batch-delete`, { ids });
  }

  /**
   * 上传文件
   */
  protected async upload<T = any>(
    url: string,
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percent);
        }
      },
    });
  }

  /**
   * 下载文件
   */
  protected async download(
    url: string,
    filename?: string
  ): Promise<void> {
    const response = await this.request.get(url, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  }
}

/**
 * API服务管理器
 */
export class ApiServiceManager {
  private static instance: ApiServiceManager;
  private services: Map<string, BaseApiService> = new Map();

  private constructor() {}

  /**
   * 获取管理器实例
   */
  public static getInstance(): ApiServiceManager {
    if (!ApiServiceManager.instance) {
      ApiServiceManager.instance = new ApiServiceManager();
    }
    return ApiServiceManager.instance;
  }

  /**
   * 注册API服务
   */
  public register<T extends BaseApiService>(
    name: string,
    serviceClass: new (...args: any[]) => T,
    ...args: any[]
  ): T {
    const service = new serviceClass(...args);
    this.services.set(name, service);
    return service;
  }

  /**
   * 获取API服务
   */
  public get<T extends BaseApiService>(name: string): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`API service '${name}' not found`);
    }
    return service as T;
  }

  /**
   * 检查服务是否存在
   */
  public has(name: string): boolean {
    return this.services.has(name);
  }

  /**
   * 移除API服务
   */
  public remove(name: string): boolean {
    return this.services.delete(name);
  }

  /**
   * 获取所有服务名称
   */
  public getServiceNames(): string[] {
    return Array.from(this.services.keys());
  }

  /**
   * 清空所有服务
   */
  public clear(): void {
    this.services.clear();
  }
}

/**
 * 全局API服务管理器实例
 */
export const apiServiceManager = ApiServiceManager.getInstance();