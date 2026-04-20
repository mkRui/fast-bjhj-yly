/**
 * Store工厂和常用模式
 * 提供快速创建Store的工厂函数和常用的Store模式
 */

import { BaseStore, SimpleStore, BaseEntity } from './base-store';
import { Api } from '@/api/api';
import { PaginationParams, ApiResponse, PaginatedResponse } from '@/types';
import { action, observable } from 'mobx';

/**
 * 通用列表Store工厂
 */
export function createListStore<T extends BaseEntity>(
  api: Api,
  config: {
    fetchListApi: (params: PaginationParams) => Promise<ApiResponse<PaginatedResponse<T>>>;
    createApi?: (data: Omit<T, 'id'>) => Promise<ApiResponse<T>>;
    updateApi?: (id: string | number, data: Partial<T>) => Promise<ApiResponse<T>>;
    deleteApi?: (id: string | number) => Promise<ApiResponse<void>>;
    fetchDetailApi?: (id: string | number) => Promise<ApiResponse<T>>;
  }
) {
  return class ListStore extends BaseStore<T> {
    constructor() {
      super(api);
    }

    // 获取列表
    public async fetchList(params?: Record<string, any>): Promise<T[] | null> {
      const queryParams = { ...this.pagination, ...params };
      return this.fetchPaginatedList(
        config.fetchListApi as (params: any) => Promise<ApiResponse<PaginatedResponse<T>>>,
        queryParams
      );
    }

    // 创建项目
    public async create(data: Omit<T, 'id'>): Promise<T | null> {
      if (!config.createApi) {
        throw new Error('Create API not configured');
      }

      const result = await this.safeApiCall(
        () => config.createApi!(data),
        {
          onSuccess: (newItem) => {
            this.addItem(newItem);
          }
        }
      );

      return result;
    }

    // 更新项目
    public async update(id: string | number, data: Partial<T>): Promise<T | null> {
      if (!config.updateApi) {
        throw new Error('Update API not configured');
      }

      const result = await this.safeApiCall(
        () => config.updateApi!(id, data),
        {
          onSuccess: (updatedItem) => {
            this.updateItem(updatedItem);
          }
        }
      );

      return result;
    }

    // 删除项目
    public async delete(id: string | number): Promise<boolean> {
      if (!config.deleteApi) {
        throw new Error('Delete API not configured');
      }

      const result = await this.safeApiCall(
        () => config.deleteApi!(id),
        {
          onSuccess: () => {
            this.removeItem(id);
          }
        }
      );

      return result !== null;
    }

    // 获取详情
    public async fetchDetail(id: string | number): Promise<T | null> {
      if (!config.fetchDetailApi) {
        throw new Error('Fetch detail API not configured');
      }

      const result = await this.safeApiCall(
        () => config.fetchDetailApi!(id),
        {
          onSuccess: (item) => {
            this.setCurrentItem(item);
          }
        }
      );

      return result;
    }
  };
}

/**
 * 通用表单Store工厂
 */
export function createFormStore<T extends BaseEntity>(
  api: Api,
  config: {
    fetchDetailApi?: (id: string | number) => Promise<ApiResponse<T>>;
    createApi?: (data: Omit<T, 'id'>) => Promise<ApiResponse<T>>;
    updateApi?: (id: string | number, data: Partial<T>) => Promise<ApiResponse<T>>;
  }
) {
  return class FormStore extends SimpleStore<T> {
    public formData: Partial<T> = {};
    public isEditing = false;

    constructor() {
      super(api);
      
      // 添加表单相关的observable
      observable(this, {
        formData: observable,
        isEditing: observable,
        setFormData: action,
        setIsEditing: action,
        resetForm: action,
      });
    }

    // 设置表单数据
    public setFormData(data: Partial<T>): void {
      this.formData = { ...this.formData, ...data };
    }

    // 设置编辑模式
    public setIsEditing(editing: boolean): void {
      this.isEditing = editing;
    }

    // 重置表单
    public resetForm(): void {
      this.formData = {};
      this.isEditing = false;
      this.setData(null);
    }

    // 初始化编辑
    public async initEdit(id: string | number): Promise<T | null> {
      if (!config.fetchDetailApi) {
        throw new Error('Fetch detail API not configured');
      }

      this.setIsEditing(true);
      
      const result = await this.safeApiCall(
        () => config.fetchDetailApi!(id),
        {
          onSuccess: (item) => {
            this.setData(item);
            this.setFormData(item);
          }
        }
      );

      return result;
    }

    // 初始化创建
    public initCreate(defaultData?: Partial<T>): void {
      this.setIsEditing(false);
      this.setData(null);
      this.setFormData(defaultData || {});
    }

    // 提交表单
    public async submit(): Promise<T | null> {
      if (this.isEditing) {
        // 更新模式
        if (!config.updateApi || !this.data?.id) {
          throw new Error('Update API not configured or no data ID');
        }

        return this.safeApiCall(
          () => config.updateApi!(this.data!.id, this.formData),
          {
            onSuccess: (updatedItem) => {
              this.setData(updatedItem);
            }
          }
        );
      } else {
        // 创建模式
        if (!config.createApi) {
          throw new Error('Create API not configured');
        }

        return this.safeApiCall(
          () => config.createApi!(this.formData as Omit<T, 'id'>),
          {
            onSuccess: (newItem) => {
              this.setData(newItem);
            }
          }
        );
      }
    }
  };
}

/**
 * 通用搜索Store工厂
 */
export function createSearchStore<T extends BaseEntity>(
  api: Api,
  config: {
    searchApi: (params: PaginationParams & { keyword?: string; [key: string]: any }) => Promise<ApiResponse<PaginatedResponse<T>>>;
  }
) {
  return class SearchStore extends BaseStore<T> {
    public keyword = '';
    public searchParams: Record<string, any> = {};

    constructor() {
      super(api);
      
      // 添加搜索相关的observable
      observable(this, {
        keyword: observable,
        searchParams: observable,
        setKeyword: action,
        setSearchParams: action,
        clearSearch: action,
      });
    }

    // 设置搜索关键词
    public setKeyword(keyword: string): void {
      this.keyword = keyword;
    }

    // 设置搜索参数
    public setSearchParams(params: Record<string, any>): void {
      this.searchParams = { ...this.searchParams, ...params };
    }

    // 清空搜索
    public clearSearch(): void {
      this.keyword = '';
      this.searchParams = {};
    }

    // 获取列表（带搜索）
    public async fetchList(params?: Record<string, any>): Promise<T[] | null> {
      const queryParams = {
        ...this.pagination,
        keyword: this.keyword,
        ...this.searchParams,
        ...params,
      };

      return this.fetchPaginatedList(
        config.searchApi as (params: any) => Promise<ApiResponse<PaginatedResponse<T>>>,
        queryParams
      );
    }

    // 搜索
    public async search(keyword?: string, params?: Record<string, any>): Promise<T[] | null> {
      if (keyword !== undefined) {
        this.setKeyword(keyword);
      }
      
      if (params) {
        this.setSearchParams(params);
      }

      // 重置到第一页
      this.setPagination({ current: 1 });
      
      return this.fetchList();
    }
  };
}

/**
 * Store混合器 - 组合多个Store功能
 */
export function createMixedStore<T extends BaseEntity>(
  api: Api,
  configs: {
    list?: Parameters<typeof createListStore>[1];
    form?: Parameters<typeof createFormStore>[1];
    search?: Parameters<typeof createSearchStore>[1];
  }
) {
  const stores: any = {};

  if (configs.list) {
    const ListStore = createListStore<T>(api, configs.list as any);
    stores.list = new ListStore();
  }

  if (configs.form) {
    const FormStore = createFormStore<T>(api, configs.form as any);
    stores.form = new FormStore();
  }

  if (configs.search) {
    const SearchStore = createSearchStore<T>(api, configs.search as any);
    stores.search = new SearchStore();
  }

  return stores;
}

/**
 * Store装饰器 - 为Store添加额外功能
 */
export function withCaching<T extends new (...args: any[]) => any>(
  StoreClass: T
): T {
  return class extends StoreClass {
    private cache = new Map<string, any>();
    private cacheTimeout = 5 * 60 * 1000; // 5分钟

    // 缓存数据
    protected cacheData(key: string, data: any): void {
      this.cache.set(key, {
        data,
        timestamp: Date.now(),
      });
    }

    // 获取缓存数据
    protected getCachedData(key: string): any | null {
      const cached = this.cache.get(key);
      if (!cached) return null;

      const isExpired = Date.now() - cached.timestamp > this.cacheTimeout;
      if (isExpired) {
        this.cache.delete(key);
        return null;
      }

      return cached.data;
    }

    // 清空缓存
    public clearCache(): void {
      this.cache.clear();
    }
  } as T;
}

/**
 * 带选择功能的Store装饰器
 */
export function withSelection<T extends new (...args: any[]) => any>(
  StoreClass: T
): T {
  return class extends StoreClass {
    public selectedIds: Set<string | number> = new Set();

    constructor(...args: any[]) {
      super(...args);
      
      observable(this, {
        selectedIds: observable,
        selectItem: action,
        deselectItem: action,
        toggleSelection: action,
        selectAll: action,
        clearSelection: action,
      });
    }

    // 选择项目
    public selectItem(id: string | number): void {
      this.selectedIds.add(id);
    }

    // 取消选择
    public deselectItem(id: string | number): void {
      this.selectedIds.delete(id);
    }

    // 切换选择状态
    public toggleSelection(id: string | number): void {
      if (this.selectedIds.has(id)) {
        this.deselectItem(id);
      } else {
        this.selectItem(id);
      }
    }

    // 全选
    public selectAll(): void {
      if ('list' in this && Array.isArray((this as any).list)) {
        (this as any).list.forEach((item: any) => {
          this.selectedIds.add(item.id);
        });
      }
    }

    // 清空选择
    public clearSelection(): void {
      this.selectedIds.clear();
    }

    // 获取选中的项目
    public get selectedItems(): any[] {
      if ('list' in this && Array.isArray((this as any).list)) {
        return (this as any).list.filter((item: any) => this.selectedIds.has(item.id));
      }
      return [];
    }

    // 是否全选
    public get isAllSelected(): boolean {
      if ('list' in this && Array.isArray((this as any).list)) {
        const list = (this as any).list;
        return list.length > 0 && list.every((item: any) => this.selectedIds.has(item.id));
      }
      return false;
    }

    // 是否部分选择
    public get isIndeterminate(): boolean {
      const selectedCount = this.selectedItems.length;
      if ('list' in this && Array.isArray((this as any).list)) {
        const totalCount = (this as any).list.length;
        return selectedCount > 0 && selectedCount < totalCount;
      }
      return false;
    }
  } as T;
}
