import { useState, useCallback, useEffect, useMemo } from 'react';
import { useDeepMemo } from '../use-performance';

/**
 * 本地存储 Hook
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // 获取初始值
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // 设置值
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

/**
 * 会话存储 Hook
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : initialValue;
      setStoredValue(valueToStore);
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting sessionStorage key "${key}":`, error);
    }
  }, [key, storedValue, initialValue]);

  return [storedValue, setValue];
}

/**
 * 数据过滤 Hook
 */
export interface UseFilterOptions<T> {
  searchFields?: (keyof T)[];
  filterFunctions?: Record<string, (item: T, value: any) => boolean>;
}

export function useFilter<T>(
  data: T[],
  options: UseFilterOptions<T> = {}
) {
  const { searchFields = [], filterFunctions = {} } = options;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});

  const filteredData = useDeepMemo(() => {
    return data.filter(item => {
      // 搜索过滤
      if (searchTerm && searchFields.length > 0) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = searchFields.some(field => {
          const value = item[field];
          return String(value).toLowerCase().includes(searchLower);
        });
        if (!matchesSearch) return false;
      }

      // 自定义过滤
      for (const [filterKey, filterValue] of Object.entries(filters)) {
        if (filterValue !== undefined && filterValue !== null && filterValue !== '') {
          const filterFn = filterFunctions[filterKey];
          if (filterFn && !filterFn(item, filterValue)) {
            return false;
          }
        }
      }

      return true;
    });
  }, [data, searchTerm, filters, searchFields, filterFunctions]);

  const setFilter = useCallback((key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilter = useCallback((key: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({});
    setSearchTerm('');
  }, []);

  return {
    filteredData,
    searchTerm,
    setSearchTerm,
    filters,
    setFilter,
    clearFilter,
    clearAllFilters,
  };
}

/**
 * 数据排序 Hook
 */
export type SortDirection = 'asc' | 'desc';

export interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

export function useSort<T>(data: T[]) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null);

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const requestSort = useCallback((key: keyof T) => {
    let direction: SortDirection = 'asc';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
  }, [sortConfig]);

  const clearSort = useCallback(() => {
    setSortConfig(null);
  }, []);

  return {
    sortedData,
    sortConfig,
    requestSort,
    clearSort,
  };
}

/**
 * 数据分组 Hook
 */
export function useGroupBy<T>(
  data: T[],
  groupByFn: (item: T) => string | number
) {
  const groupedData = useMemo(() => {
    const groups: Record<string | number, T[]> = {};
    
    data.forEach(item => {
      const key = groupByFn(item);
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
    });
    
    return groups;
  }, [data, groupByFn]);

  const groupKeys = useMemo(() => Object.keys(groupedData), [groupedData]);

  return {
    groupedData,
    groupKeys,
  };
}

/**
 * 数据汇总 Hook
 */
export function useAggregate<T>(
  data: T[],
  aggregateFunctions: Record<string, (items: T[]) => any>
) {
  const aggregatedData = useMemo(() => {
    const result: Record<string, any> = {};
    
    Object.entries(aggregateFunctions).forEach(([key, fn]) => {
      result[key] = fn(data);
    });
    
    return result;
  }, [data, aggregateFunctions]);

  return aggregatedData;
}

/**
 * 数据验证 Hook
 */
export interface ValidationRule<T> {
  field: keyof T;
  rule: (value: any, item: T) => string | null;
  message?: string;
}

export function useValidation<T>(
  data: T,
  rules: ValidationRule<T>[]
) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback(() => {
    const newErrors: Record<string, string> = {};
    
    rules.forEach(({ field, rule, message }) => {
      const value = data[field];
      const error = rule(value, data);
      
      if (error) {
        newErrors[field as string] = message || error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [data, rules]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearError = useCallback((field: keyof T) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    });
  }, []);

  // 自动验证
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      validate();
    }
  }, [data, validate, errors]);

  const isValid = Object.keys(errors).length === 0;

  return {
    errors,
    isValid,
    validate,
    clearErrors,
    clearError,
  };
}