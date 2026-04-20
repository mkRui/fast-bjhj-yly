import React, { Suspense, ComponentType } from 'react';
import { Spin } from 'antd';

// 懒加载组件的 Loading 组件
const PageLoading: React.FC = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '300px',
    }}
  >
    <Spin size="large" tip="页面加载中..." />
  </div>
);

// 懒加载高阶组件
export const lazyLoad = (Component: ComponentType<any>) => {
  const LazyComponent = React.lazy(() => 
    Promise.resolve({ default: Component })
  );

  return (props: any) => (
    <Suspense fallback={<PageLoading />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// 动态导入懒加载
export const dynamicImport = (importFunc: () => Promise<{ default: ComponentType<any> }>) => {
  const LazyComponent = React.lazy(importFunc);

  return (props: any) => (
    <Suspense fallback={<PageLoading />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default { lazyLoad, dynamicImport };