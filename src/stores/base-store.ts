/**
 * 基础Store类
 * 提供通用的状态管理功能，减少重复代码
 */

import { makeObservable, observable, action, runInAction } from 'mobx';
import { Api } from '@/api/api';
import { PaginationParams, PaginatedResponse, ApiResponse } from '@/types';

/**
 * 基础实体接口
 */
export interface BaseEntity {
  id: string | number;
  createTime?: string;
  updateTime?: string;
  [key: string]: any;
}

/**
 * 基础请求状态
 */
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * 基础Store类
 */
export abstract class BaseStore<T extends BaseEntity = BaseEntity> {
  // 基础状态
  public loading = false;
  public error: Error | null = null;
  public status: RequestStatus = 'idle';

  // 数据列表
  public list: T[] = [];
  public total = 0;
  
  // 分页参数
  public pagination: PaginationParams = {
    current: 1,
    size: 10,
  };

  // 当前选中项
  public currentItem: T | null = null;

  // API实例
  protected api: Api;

  constructor(api: Api) {
    this.api = api;
    
    makeObservable(this, {
      // 基础状态
      loading: observable,
      error: observable,
      status: observable,
      
      // 数据
      list: observable,
      total: observable,
      pagination: observable,
      currentItem: observable,
      
      // Actions
      setLoading: action,
      setError: action,
      setStatus: action,
      setList: action,
      setTotal: action,
      setPagination: action,
      setCurrentItem: action,
      addItem: action,
      updateItem: action,
      removeItem: action,
      reset: action,
    });
  }

  // ==================== 基础状态管理 ====================

  /**
   * 设置加载状态
   */
  public setLoading(loading: boolean): void {
    this.loading = loading;
    this.status = loading ? 'loading' : 'idle';
  }

  /**
   * 设置错误状态
   */
  public setError(error: Error | null): void {
    this.error = error;
    this.status = error ? 'error' : 'success';
  }

  /**
   * 设置请求状态
   */
  public setStatus(status: RequestStatus): void {
    this.status = status;
    this.loading = status === 'loading';
  }

  // ==================== 数据管理 ====================

  /**
   * 设置列表数据
   */
  public setList(list: T[]): void {
    this.list = list;
  }

  /**
   * 设置总数
   */
  public setTotal(total: number): void {
    this.total = total;
  }

  /**
   * 设置分页参数
   */
  public setPagination(pagination: Partial<PaginationParams>): void {
    Object.assign(this.pagination, pagination);
  }

  /**
   * 设置当前项
   */
  public setCurrentItem(item: T | null): void {
    this.currentItem = item;
  }

  /**
   * 添加项目到列表
   */
  public addItem(item: T): void {
    this.list.unshift(item);
    this.total += 1;
  }

  /**
   * 更新列表中的项目
   */
  public updateItem(item: T): void {
    const index = this.list.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.list[index] = item;
    }
  }

  /**
   * 从列表中移除项目
   */
  public removeItem(id: string | number): void {
    const index = this.list.findIndex(item => item.id === id);
    if (index !== -1) {
      this.list.splice(index, 1);
      this.total -= 1;
    }
  }

  /**
   * 重置Store状态
   */
  public reset(): void {
    this.loading = false;
    this.error = null;
    this.status = 'idle';
    this.list = [];
    this.total = 0;
    this.pagination = { current: 1, size: 10 };
    this.currentItem = null;
  }

  // ==================== 通用API方法 ====================

  /**
   * 安全的API调用包装器
   */
  protected async safeApiCall<R>(
    apiCall: () => Promise<ApiResponse<R>>,
    options: {
      showLoading?: boolean;
      showError?: boolean;
      onSuccess?: (data: R) => void;
      onError?: (error: Error) => void;
    } = {}
  ): Promise<R | null> {
    const { 
      showLoading = true, 
      showError = true,
      onSuccess,
      onError 
    } = options;

    try {
      if (showLoading) {
        this.setLoading(true);
      }
      this.setError(null);

      const response = await apiCall();
      
      runInAction(() => {
        if (showLoading) {
          this.setLoading(false);
        }
        this.setStatus('success');
        
        if (onSuccess) {
          onSuccess(response.data);
        }
      });

      return response.data;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      
      runInAction(() => {
        if (showLoading) {
          this.setLoading(false);
        }
        if (showError) {
          this.setError(err);
        }
        this.setStatus('error');
        
        if (onError) {
          onError(err);
        }
      });

      return null;
    }
  }

  /**
   * 获取分页列表的通用方法
   */
  protected async fetchPaginatedList<R extends PaginatedResponse<T>>(
    apiCall: (params: PaginationParams) => Promise<ApiResponse<R>>,
    params?: Partial<PaginationParams>
  ): Promise<T[] | null> {
    const queryParams = { ...this.pagination, ...params };
    
    const result = await this.safeApiCall(
      () => apiCall(queryParams),
      {
        onSuccess: (data) => {
          this.setList(data.records);
          this.setTotal(data.total);
          this.setPagination({
            current: data.current,
            size: data.size,
          });
        }
      }
    );

    return result?.records || null;
  }

  // ==================== 抽象方法 ====================

  /**
   * 获取列表数据 - 子类必须实现
   */
  public abstract fetchList(params?: Record<string, any>): Promise<T[] | null>;

  /**
   * 创建项目 - 子类可选实现
   */
  public async create?(data: Omit<T, 'id'>): Promise<T | null>;

  /**
   * 更新项目 - 子类可选实现
   */
  public async update?(id: string | number, data: Partial<T>): Promise<T | null>;

  /**
   * 删除项目 - 子类可选实现
   */
  public async delete?(id: string | number): Promise<boolean>;

  /**
   * 获取详情 - 子类可选实现
   */
  public async fetchDetail?(id: string | number): Promise<T | null>;
}

/**
 * 简单Store基类 - 用于不需要分页的场景
 */
export abstract class SimpleStore<T extends BaseEntity = BaseEntity> {
  public loading = false;
  public error: Error | null = null;
  public status: RequestStatus = 'idle';
  public data: T | null = null;

  protected api: Api;

  constructor(api: Api) {
    this.api = api;
    
    makeObservable(this, {
      loading: observable,
      error: observable,
      status: observable,
      data: observable,
      
      setLoading: action,
      setError: action,
      setStatus: action,
      setData: action,
      reset: action,
    });
  }

  public setLoading(loading: boolean): void {
    this.loading = loading;
    this.status = loading ? 'loading' : 'idle';
  }

  public setError(error: Error | null): void {
    this.error = error;
    this.status = error ? 'error' : 'success';
  }

  public setStatus(status: RequestStatus): void {
    this.status = status;
    this.loading = status === 'loading';
  }

  public setData(data: T | null): void {
    this.data = data;
  }

  public reset(): void {
    this.loading = false;
    this.error = null;
    this.status = 'idle';
    this.data = null;
  }

  /**
   * 安全的API调用
   */
  protected async safeApiCall<R>(
    apiCall: () => Promise<ApiResponse<R>>,
    options: {
      showLoading?: boolean;
      showError?: boolean;
      onSuccess?: (data: R) => void;
      onError?: (error: Error) => void;
    } = {}
  ): Promise<R | null> {
    const { 
      showLoading = true, 
      showError = true,
      onSuccess,
      onError 
    } = options;

    try {
      if (showLoading) {
        this.setLoading(true);
      }
      this.setError(null);

      const response = await apiCall();
      
      runInAction(() => {
        if (showLoading) {
          this.setLoading(false);
        }
        this.setStatus('success');
        
        if (onSuccess) {
          onSuccess(response.data);
        }
      });

      return response.data;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      
      runInAction(() => {
        if (showLoading) {
          this.setLoading(false);
        }
        if (showError) {
          this.setError(err);
        }
        this.setStatus('error');
        
        if (onError) {
          onError(err);
        }
      });

      return null;
    }
  }
}