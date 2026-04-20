import { useState, useCallback, useEffect, useRef } from 'react';
import { useStableCallback } from '../use-performance';

/**
 * 模态框控制 Hook
 */
export interface UseModalResult {
  visible: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export function useModal(initialVisible = false): UseModalResult {
  const [visible, setVisible] = useState(initialVisible);

  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);
  const toggle = useCallback(() => setVisible(prev => !prev), []);

  return {
    visible,
    open,
    close,
    toggle,
  };
}

/**
 * 表单控制 Hook
 */
export interface UseFormResult<T extends Record<string, any>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  setValue: (field: keyof T, value: any) => void;
  setValues: (values: Partial<T>) => void;
  setError: (field: keyof T, error: string) => void;
  clearError: (field: keyof T) => void;
  setTouched: (field: keyof T, touched: boolean) => void;
  reset: (newValues?: Partial<T>) => void;
  validate: () => boolean;
  isValid: boolean;
  isDirty: boolean;
}

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules?: Partial<Record<keyof T, (value: any) => string | undefined>>
): UseFormResult<T> {
  const [values, setValuesState] = useState<T>(initialValues);
  const [errors, setErrorsState] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouchedState] = useState<Partial<Record<keyof T, boolean>>>({});
  const initialValuesRef = useRef(initialValues);

  const setValue = useCallback((field: keyof T, value: any) => {
    setValuesState(prev => ({ ...prev, [field]: value }));
    setTouchedState(prev => ({ ...prev, [field]: true }));
    
    // 自动验证
    if (validationRules?.[field]) {
      const error = validationRules[field]!(value);
      setErrorsState(prev => ({
        ...prev,
        [field]: error,
      }));
    }
  }, [validationRules]);

  const setValues = useCallback((newValues: Partial<T>) => {
    setValuesState(prev => ({ ...prev, ...newValues }));
  }, []);

  const setError = useCallback((field: keyof T, error: string) => {
    setErrorsState(prev => ({ ...prev, [field]: error }));
  }, []);

  const clearError = useCallback((field: keyof T) => {
    setErrorsState(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const setTouched = useCallback((field: keyof T, isTouched: boolean) => {
    setTouchedState(prev => ({ ...prev, [field]: isTouched }));
  }, []);

  const reset = useCallback((newValues?: Partial<T>) => {
    const resetValues = newValues ? { ...initialValuesRef.current, ...newValues } : initialValuesRef.current;
    setValuesState(resetValues);
    setErrorsState({});
    setTouchedState({});
  }, []);

  const validate = useCallback(() => {
    if (!validationRules) return true;
    
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;
    
    Object.keys(validationRules).forEach((field) => {
      const rule = validationRules[field as keyof T];
      if (rule) {
        const error = rule(values[field as keyof T]);
        if (error) {
          newErrors[field as keyof T] = error;
          isValid = false;
        }
      }
    });
    
    setErrorsState(newErrors);
    return isValid;
  }, [validationRules, values]);

  const isValid = Object.keys(errors).length === 0;
  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValuesRef.current);

  return {
    values,
    errors,
    touched,
    setValue,
    setValues,
    setError,
    clearError,
    setTouched,
    reset,
    validate,
    isValid,
    isDirty,
  };
}

/**
 * 搜索框 Hook
 */
export interface UseSearchResult {
  searchValue: string;
  debouncedValue: string;
  setSearchValue: (value: string) => void;
  clear: () => void;
}

export function useSearch(delay = 300): UseSearchResult {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchValue, delay]);

  const clear = useCallback(() => {
    setSearchValue('');
  }, []);

  return {
    searchValue,
    debouncedValue,
    setSearchValue,
    clear,
  };
}

/**
 * 列表选择 Hook
 */
export interface UseSelectionResult<T> {
  selectedItems: T[];
  selectedKeys: (string | number)[];
  isSelected: (item: T) => boolean;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  selectItem: (item: T) => void;
  deselectItem: (item: T) => void;
  toggleItem: (item: T) => void;
  selectAll: () => void;
  deselectAll: () => void;
  toggleAll: () => void;
}

export function useSelection<T>(
  items: T[],
  keyExtractor: (item: T) => string | number
): UseSelectionResult<T> {
  const [selectedKeys, setSelectedKeys] = useState<Set<string | number>>(new Set());

  const selectedItems = items.filter(item => selectedKeys.has(keyExtractor(item)));
  
  const isSelected = useStableCallback((item: T) => {
    return selectedKeys.has(keyExtractor(item));
  });

  const selectItem = useStableCallback((item: T) => {
    const key = keyExtractor(item);
    setSelectedKeys(prev => new Set(prev).add(key));
  });

  const deselectItem = useStableCallback((item: T) => {
    const key = keyExtractor(item);
    setSelectedKeys(prev => {
      const newSet = new Set(prev);
      newSet.delete(key);
      return newSet;
    });
  });

  const toggleItem = useStableCallback((item: T) => {
    if (isSelected(item)) {
      deselectItem(item);
    } else {
      selectItem(item);
    }
  });

  const selectAll = useCallback(() => {
    setSelectedKeys(new Set(items.map(keyExtractor)));
  }, [items, keyExtractor]);

  const deselectAll = useCallback(() => {
    setSelectedKeys(new Set());
  }, []);

  const toggleAll = useCallback(() => {
    if (selectedKeys.size === items.length) {
      deselectAll();
    } else {
      selectAll();
    }
  }, [selectedKeys.size, items.length, deselectAll, selectAll]);

  const isAllSelected = selectedKeys.size === items.length && items.length > 0;
  const isIndeterminate = selectedKeys.size > 0 && selectedKeys.size < items.length;

  return {
    selectedItems,
    selectedKeys: Array.from(selectedKeys),
    isSelected,
    isAllSelected,
    isIndeterminate,
    selectItem,
    deselectItem,
    toggleItem,
    selectAll,
    deselectAll,
    toggleAll,
  };
}