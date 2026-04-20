import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';

// 防抖Hook
export const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};

// 节流Hook
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastCallRef = useRef(0);

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now;
        callback(...args);
      }
    },
    [callback, delay]
  ) as T;

  return throttledCallback;
};

// 深度比较的useMemo
export const useDeepMemo = <T>(
  factory: () => T,
  deps: React.DependencyList
): T => {
  const prevDepsRef = useRef<React.DependencyList>([]);
  const valueRef = useRef<T | null>(null);

  const hasChanged = useMemo(() => {
    if (!prevDepsRef.current) return true;
    
    return deps.some((dep, index) => {
      const prevDep = prevDepsRef.current![index];
      return JSON.stringify(dep) !== JSON.stringify(prevDep);
    });
  }, [deps]);

  if (hasChanged) {
    valueRef.current = factory();
    prevDepsRef.current = deps;
  }

  return valueRef.current as T;
};

// 稳定的回调函数Hook
export const useStableCallback = <T extends (...args: any[]) => any>(
  callback: T
): T => {
  const callbackRef = useRef<T>(callback);
  
  useEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback(
    (...args: Parameters<T>) => callbackRef.current(...args),
    []
  ) as T;
};

// 组件挂载状态Hook
export const useIsMounted = () => {
  const isMountedRef = useRef(true);
  
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return useCallback(() => isMountedRef.current, []);
};

// 异步状态Hook
export const useAsyncState = <T>(
  initialState: T
): [T, (newState: T | ((prevState: T) => T)) => void] => {
  const isMounted = useIsMounted();
  const [state, setState] = useState(initialState);

  const setAsyncState = useCallback((newState: T | ((prevState: T) => T)) => {
    if (isMounted()) {
      setState(newState);
    }
  }, [isMounted]);

  return [state, setAsyncState];
};

export default {
  useDebounce,
  useThrottle,
  useDeepMemo,
  useStableCallback,
  useIsMounted,
  useAsyncState,
};