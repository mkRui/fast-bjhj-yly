import { useState, useCallback, useRef } from 'react';
import { useAsyncState, useIsMounted } from '../use-performance';

/**
 * API 请求状态管理 Hook
 */
export interface UseApiOptions<T> {
  // 初始数据
  initialData?: T;
  // 是否立即执行
  immediate?: boolean;
  // 错误处理
  onError?: (error: Error) => void;
  // 成功回调
  onSuccess?: (data: T) => void;
}

export interface UseApiResult<T> {
  data: T | undefined;
  loading: boolean;
  error: Error | null;
  execute: (...args: any[]) => Promise<T | undefined>;
  reset: () => void;
}

export function useApi<T = any>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiOptions<T> = {}
): UseApiResult<T> {
  const { initialData, onError, onSuccess } = options;
  const isMounted = useIsMounted();
  
  const [data, setData] = useAsyncState<T | undefined>(initialData);
  const [loading, setLoading] = useAsyncState<boolean>(false);
  const [error, setError] = useAsyncState<Error | null>(null);
  
  const controllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(async (...args: any[]) => {
    if (!isMounted()) return;
    
    // 取消之前的请求
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    
    controllerRef.current = new AbortController();
    
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiFunction(...args);
      
      if (isMounted()) {
        setData(result);
        onSuccess?.(result);
        return result;
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      
      if (isMounted()) {
        setError(error);
        onError?.(error);
      }
    } finally {
      if (isMounted()) {
        setLoading(false);
      }
    }
  }, [apiFunction, isMounted, setData, setLoading, setError, onError, onSuccess]);

  const reset = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    setData(initialData);
    setLoading(false);
    setError(null);
  }, [initialData, setData, setLoading, setError]);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}

/**
 * 分页数据请求 Hook
 */
export interface UsePaginationOptions {
  pageSize?: number;
  immediate?: boolean;
  onError?: (error: Error) => void;
  onSuccess?: (data: any) => void;
}

export interface UsePaginationResult<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    pages: number;
  };
  loadPage: (page: number, size?: number) => Promise<void>;
  refresh: () => Promise<void>;
  reset: () => void;
}

export function usePagination<T = any>(
  apiFunction: (params: { current: number; size: number; [key: string]: any }) => Promise<{
    records: T[];
    current: number;
    size: number;
    total: number;
    pages: number;
  }>,
  options: UsePaginationOptions = {}
): UsePaginationResult<T> {
  const { pageSize = 10, onError, onSuccess, immediate = false } = options;
  const isMounted = useIsMounted();
  
  const [data, setData] = useAsyncState<T[]>([]);
  const [loading, setLoading] = useAsyncState<boolean>(false);
  const [error, setError] = useAsyncState<Error | null>(null);
  const [pagination, setPagination] = useAsyncState({
    current: 1,
    pageSize,
    total: 0,
    pages: 0,
  });

  const loadPage = useCallback(async (page: number, size = pageSize) => {
    if (!isMounted()) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiFunction({
        current: page,
        size,
      });
      
      if (isMounted()) {
        setData(result.records);
        setPagination({
          current: result.current,
          pageSize: result.size,
          total: result.total,
          pages: result.pages,
        });
        onSuccess?.(result);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      
      if (isMounted()) {
        setError(error);
        onError?.(error);
      }
    } finally {
      if (isMounted()) {
        setLoading(false);
      }
    }
  }, [apiFunction, pageSize, isMounted, setData, setLoading, setError, setPagination, onError, onSuccess]);

  const refresh = useCallback(() => {
    return loadPage(pagination.current, pagination.pageSize);
  }, [loadPage, pagination.current, pagination.pageSize]);

  const reset = useCallback(() => {
    setData([]);
    setLoading(false);
    setError(null);
    setPagination({
      current: 1,
      pageSize,
      total: 0,
      pages: 0,
    });
  }, [setData, setLoading, setError, setPagination, pageSize]);

  // 立即执行
  useState(() => {
    if (immediate) {
      void loadPage(1);
    }
  });

  return {
    data,
    loading,
    error,
    pagination,
    loadPage,
    refresh,
    reset,
  };
}