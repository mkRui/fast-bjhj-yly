/**
 * 数组工具函数集合
 * 提供常用的数组操作方法
 */

// 数组去重
export const unique = <T>(arr: T[]): T[] => {
  return Array.from(new Set(arr));
};

// 按属性去重
export const uniqueBy = <T, K extends keyof T>(arr: T[], key: K): T[] => {
  const seen = new Set();
  return arr.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};

// 数组分组
export const groupBy = <T, K extends string | number>(
  arr: T[], 
  keyFn: (item: T) => K
): Record<K, T[]> => {
  return arr.reduce((groups, item) => {
    const key = keyFn(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<K, T[]>);
};

// 数组分块
export const chunk = <T>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

// 数组求交集
export const intersection = <T>(arr1: T[], arr2: T[]): T[] => {
  return arr1.filter(item => arr2.includes(item));
};

// 数组求差集
export const difference = <T>(arr1: T[], arr2: T[]): T[] => {
  return arr1.filter(item => !arr2.includes(item));
};

// 数组乱序
export const shuffle = <T>(arr: T[]): T[] => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// 数组分页
export const paginate = <T>(arr: T[], page: number, pageSize: number): T[] => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return arr.slice(start, end);
};

// 数组求和
export const sum = (arr: number[]): number => {
  return arr.reduce((total, num) => total + num, 0);
};

// 数组求平均值
export const average = (arr: number[]): number => {
  return arr.length > 0 ? sum(arr) / arr.length : 0;
};

// 查找最大值对象
export const maxBy = <T>(arr: T[], keyFn: (item: T) => number): T | undefined => {
  return arr.reduce((max, item) => 
    keyFn(item) > keyFn(max) ? item : max
  );
};

// 查找最小值对象
export const minBy = <T>(arr: T[], keyFn: (item: T) => number): T | undefined => {
  return arr.reduce((min, item) => 
    keyFn(item) < keyFn(min) ? item : min
  );
};