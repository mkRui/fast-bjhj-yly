/**
 * 性能监控工具函数集合
 * 提供性能测量、监控和优化建议
 */

// 性能测量器
export class PerformanceTimer {
  private startTime: number = 0;
  private marks: Map<string, number> = new Map();

  start(): void {
    this.startTime = performance.now();
  }

  mark(label: string): void {
    this.marks.set(label, performance.now());
  }

  measure(fromMark?: string, toMark?: string): number {
    const start = fromMark ? this.marks.get(fromMark) || this.startTime : this.startTime;
    const end = toMark ? this.marks.get(toMark) || performance.now() : performance.now();
    return end - start;
  }

  end(): number {
    return performance.now() - this.startTime;
  }

  clear(): void {
    this.startTime = 0;
    this.marks.clear();
  }
}

// 函数执行时间测量
export function measureTime<T extends (...args: any[]) => any>(
  fn: T,
  label?: string
): T {
  return ((...args: Parameters<T>) => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    const duration = end - start;
    
    if (label) {
      console.log(`${label} 执行时间: ${duration.toFixed(2)}ms`);
    }
    
    return result;
  }) as T;
}

// 异步函数执行时间测量
export function measureTimeAsync<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  label?: string
): T {
  return (async (...args: Parameters<T>) => {
    const start = performance.now();
    const result = await fn(...args);
    const end = performance.now();
    const duration = end - start;
    
    if (label) {
      console.log(`${label} 执行时间: ${duration.toFixed(2)}ms`);
    }
    
    return result;
  }) as T;
}

// 性能监控器
export class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();

  record(metricName: string, value: number): void {
    if (!this.metrics.has(metricName)) {
      this.metrics.set(metricName, []);
    }
    this.metrics.get(metricName)!.push(value);
  }

  getAverage(metricName: string): number {
    const values = this.metrics.get(metricName) || [];
    return values.length > 0 ? values.reduce((sum, val) => sum + val, 0) / values.length : 0;
  }

  getMax(metricName: string): number {
    const values = this.metrics.get(metricName) || [];
    return values.length > 0 ? Math.max(...values) : 0;
  }

  getMin(metricName: string): number {
    const values = this.metrics.get(metricName) || [];
    return values.length > 0 ? Math.min(...values) : 0;
  }

  getPercentile(metricName: string, percentile: number): number {
    const values = this.metrics.get(metricName) || [];
    if (values.length === 0) return 0;
    
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[index];
  }

  clear(metricName?: string): void {
    if (metricName) {
      this.metrics.delete(metricName);
    } else {
      this.metrics.clear();
    }
  }

  getReport(metricName: string): {
    count: number;
    average: number;
    min: number;
    max: number;
    p50: number;
    p95: number;
    p99: number;
  } {
    const values = this.metrics.get(metricName) || [];
    return {
      count: values.length,
      average: this.getAverage(metricName),
      min: this.getMin(metricName),
      max: this.getMax(metricName),
      p50: this.getPercentile(metricName, 50),
      p95: this.getPercentile(metricName, 95),
      p99: this.getPercentile(metricName, 99),
    };
  }
}

// FPS 监控器
export class FPSMonitor {
  private fps: number = 0;
  private lastTime: number = 0;
  private frameCount: number = 0;
  private isRunning: boolean = false;
  private callbacks: ((fps: number) => void)[] = [];

  start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.lastTime = performance.now();
    this.frameCount = 0;
    this.update();
  }

  stop(): void {
    this.isRunning = false;
  }

  onFPSUpdate(callback: (fps: number) => void): void {
    this.callbacks.push(callback);
  }

  private update = (): void => {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    this.frameCount++;

    if (currentTime - this.lastTime >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
      this.frameCount = 0;
      this.lastTime = currentTime;
      
      this.callbacks.forEach(callback => callback(this.fps));
    }

    requestAnimationFrame(this.update);
  };

  getCurrentFPS(): number {
    return this.fps;
  }
}

// 内存使用监控
export function getMemoryUsage(): {
  used: number;
  total: number;
  percentage: number;
} | null {
  // 使用类型断言处理performance.memory
  const performanceWithMemory = performance as any;
  if ('memory' in performanceWithMemory) {
    const memory = performanceWithMemory.memory;
    return {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      percentage: (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100,
    };
  }
  return null;
}

// 创建全局性能监控实例
export const globalPerformanceMonitor = new PerformanceMonitor();
export const globalFPSMonitor = new FPSMonitor();