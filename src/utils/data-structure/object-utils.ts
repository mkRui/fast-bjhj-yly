/**
 * 对象工具函数集合
 * 提供常用的对象操作方法
 */

// 深拷贝
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T;
  }
  
  if (typeof obj === 'object') {
    const clonedObj = {} as { [key: string]: any };
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj as T;
  }
  
  return obj;
};

// 对象合并
export const merge = <T extends object, U extends object>(
  target: T, 
  source: U
): T & U => {
  return { ...target, ...source };
};

// 深度合并
export const deepMerge = <T extends object, U extends object>(
  target: T, 
  source: U
): T & U => {
  const result = { ...target } as any;
  
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceVal = (source as any)[key];
      const resultVal = result[key];
      if (isObject(sourceVal) && isObject(resultVal)) {
        result[key] = deepMerge(resultVal, sourceVal);
      } else {
        result[key] = sourceVal;
      }
    }
  }
  
  return result;
};

// 判断是否为对象
const isObject = (item: unknown): item is Record<string, any> => {
  return !!item && typeof item === 'object' && !Array.isArray(item);
};

// 获取嵌套属性值
export const get = <T = any>(
  obj: object, 
  path: string, 
  defaultValue?: T
): T => {
  const keys = path.split('.');
  let result: any = obj;
  
  for (const key of keys) {
    if (result === null || result === undefined) {
      return defaultValue as T;
    }
    result = result[key];
  }
  
  return result !== undefined ? result : defaultValue;
};

// 设置嵌套属性值
export const set = (obj: object, path: string, value: any): void => {
  const keys = path.split('.');
  let current: any = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || !isObject(current[key])) {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
};

// 删除对象属性
export const omit = <T extends object, K extends keyof T>(
  obj: T, 
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result;
};

// 选择对象属性
export const pick = <T extends object, K extends keyof T>(
  obj: T, 
  keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

// 判断对象是否为空
export const isEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

// 对象转换为数组
export const entries = <T>(obj: Record<string, T>): [string, T][] => {
  return Object.entries(obj);
};

// 数组转换为对象
export const fromEntries = <T>(entries: [string, T][]): Record<string, T> => {
  return Object.fromEntries(entries);
};

// 对象键值互换
export const invert = (obj: Record<string, string>): Record<string, string> => {
  return fromEntries(entries(obj).map(([key, value]) => [value, key]));
};
