/**
 * 缓存工具函数集合
 * 提供内存缓存、LRU缓存等功能
 */

// 简单内存缓存
export class MemoryCache<T = any> {
  private cache = new Map<string, { value: T; expiry?: number }>();

  set(key: string, value: T, ttl?: number): void {
    const expiry = ttl ? Date.now() + ttl : undefined;
    this.cache.set(key, { value, expiry });
  }

  get(key: string): T | undefined {
    const item = this.cache.get(key);
    if (!item) return undefined;

    if (item.expiry && Date.now() > item.expiry) {
      this.cache.delete(key);
      return undefined;
    }

    return item.value;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;

    if (item.expiry && Date.now() > item.expiry) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// LRU 缓存
export class LRUCache<T = any> {
  private capacity: number;
  private cache = new Map<string, T>();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: string): T | undefined {
    if (this.cache.has(key)) {
      // 移动到最后（最近使用）
      const value = this.cache.get(key)!;
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return undefined;
  }

  set(key: string, value: T): void {
    if (this.cache.has(key)) {
      // 更新现有键
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // 删除最久未使用的项（第一个）
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// 函数缓存装饰器
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  keyFn?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = keyFn ? keyFn(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

// 异步函数缓存
export function memoizeAsync<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  keyFn?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, Promise<Awaited<ReturnType<T>>>>();

  return ((...args: Parameters<T>) => {
    const key = keyFn ? keyFn(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const promise = fn(...args);
    cache.set(key, promise);
    
    // 如果Promise被拒绝，从缓存中删除
    promise.catch(() => {
      cache.delete(key);
    });
    
    return promise;
  }) as T;
}

// 创建全局缓存实例
export const globalCache = new MemoryCache();
export const globalLRUCache = new LRUCache(100); // 默认100个项目