import { useState, useCallback, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApi, usePagination } from '../api/use-api';
import { useModal } from '../ui/use-ui';
import Root from '@/stores/root-context';

/**
 * 权限检查 Hook
 */
export function usePermission() {
  const store = useContext(Root);
  
  const hasPermission = useCallback((code: string) => {
    return store.resList.includes(code);
  }, [store.resList]);

  const hasAnyPermission = useCallback((codes: string[]) => {
    return codes.some(code => hasPermission(code));
  }, [hasPermission]);

  const hasAllPermissions = useCallback((codes: string[]) => {
    return codes.every(code => hasPermission(code));
  }, [hasPermission]);

  return {
    permissions: store.resList,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
}

/**
 * 路由参数 Hook
 */
export function useRouteParams<T extends Record<string, string>>() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const routeParams = Object.fromEntries(params.entries()) as T;

  const setParam = useCallback((key: keyof T, value: string) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set(key as string, value);
    navigate(`${location.pathname}?${newParams.toString()}`, { replace: true });
  }, [location, navigate]);

  const setParams = useCallback((newParams: Partial<T>) => {
    const params = new URLSearchParams(location.search);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.set(key, value as string);
      }
    });
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [location, navigate]);

  const removeParam = useCallback((key: keyof T) => {
    const params = new URLSearchParams(location.search);
    params.delete(key as string);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [location, navigate]);

  return {
    params: routeParams,
    setParam,
    setParams,
    removeParam,
  };
}

/**
 * 通用 CRUD Hook
 */
export interface UseCrudOptions<T, CreateData, UpdateData> {
  // API 函数
  getListApi: (params: any) => Promise<{ records: T[]; current: number; size: number; total: number; pages: number }>;
  createApi?: (data: CreateData) => Promise<any>;
  updateApi?: (id: string | number, data: UpdateData) => Promise<any>;
  deleteApi?: (id: string | number) => Promise<any>;
  
  // 配置
  pageSize?: number;
  immediate?: boolean;
  
  // 回调
  onCreateSuccess?: () => void;
  onUpdateSuccess?: () => void;
  onDeleteSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useCrud<T, CreateData = any, UpdateData = any>(
  options: UseCrudOptions<T, CreateData, UpdateData>
) {
  const {
    getListApi,
    createApi,
    updateApi,
    deleteApi,
    pageSize = 10,
    immediate = true,
    onCreateSuccess,
    onUpdateSuccess,
    onDeleteSuccess,
    onError,
  } = options;

  // 列表管理
  const pagination = usePagination(getListApi, {
    pageSize,
    immediate,
    onError,
  });

  // 模态框管理
  const createModal = useModal();
  const updateModal = useModal();

  // 当前编辑项
  const [currentItem, setCurrentItem] = useState<T | null>(null);

  // 创建
  const { loading: creating, execute: executeCreate } = useApi(
    createApi || (() => Promise.reject(new Error('Create API not provided'))),
    {
      onSuccess: () => {
        createModal.close();
        pagination.refresh();
        onCreateSuccess?.();
      },
      onError,
    }
  );

  // 更新
  const { loading: updating, execute: executeUpdate } = useApi(
    updateApi || (() => Promise.reject(new Error('Update API not provided'))),
    {
      onSuccess: () => {
        updateModal.close();
        setCurrentItem(null);
        pagination.refresh();
        onUpdateSuccess?.();
      },
      onError,
    }
  );

  // 删除
  const { loading: deleting, execute: executeDelete } = useApi(
    deleteApi || (() => Promise.reject(new Error('Delete API not provided'))),
    {
      onSuccess: () => {
        pagination.refresh();
        onDeleteSuccess?.();
      },
      onError,
    }
  );

  const handleCreate = useCallback((data: CreateData) => {
    return executeCreate(data);
  }, [executeCreate]);

  const handleUpdate = useCallback((id: string | number, data: UpdateData) => {
    return executeUpdate(id, data);
  }, [executeUpdate]);

  const handleDelete = useCallback((id: string | number) => {
    return executeDelete(id);
  }, [executeDelete]);

  const openCreateModal = useCallback(() => {
    createModal.open();
  }, [createModal]);

  const openUpdateModal = useCallback((item: T) => {
    setCurrentItem(item);
    updateModal.open();
  }, [updateModal]);

  const closeModals = useCallback(() => {
    createModal.close();
    updateModal.close();
    setCurrentItem(null);
  }, [createModal, updateModal]);

  return {
    // 列表数据
    ...pagination,
    
    // 操作状态
    creating,
    updating,
    deleting,
    
    // 模态框状态
    createModal,
    updateModal,
    currentItem,
    
    // 操作方法
    handleCreate,
    handleUpdate,
    handleDelete,
    openCreateModal,
    openUpdateModal,
    closeModals,
  };
}

/**
 * 用户信息 Hook
 */
export function useUserInfo() {
  const store = useContext(Root);
  
  return {
    userInfo: store.init,
    isLoggedIn: !!store.init.id,
    permissions: store.resList,
  };
}

/**
 * 页面标题 Hook
 */
export function usePageTitle(title?: string) {
  useEffect(() => {
    if (title) {
      document.title = `${title} - 北京环境交易所管理系统`;
    }
    
    return () => {
      document.title = '北京环境交易所管理系统';
    };
  }, [title]);
}