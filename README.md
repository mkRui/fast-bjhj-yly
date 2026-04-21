# website-admin（fast-bjhj-yly）

北京环境交易所后台管理系统（React 19 + TypeScript + Vite），UI 以 antd 为主，状态管理以 MobX 为主，网络请求以 mor-request 为主（项目内也存在一套 axios ServiceManager 形态）。

## 快速开始

```bash
yarn
yarn dev
```

常用脚本（见 package.json）：

- dev：本地开发
- build / build:prod：构建
- lint / lint:fix：ESLint
- type-check：TypeScript 类型检查

## 项目结构（重点目录）

> 核心关注：API、types、页面（views）、组件（components / micro）、静态资源、stores。

### public

- `public/`：不会经过打包处理，直接拷贝到构建产物根目录（适合 favicon、静态文件等）。

### src（主代码）

#### 入口与布局

- `src/main.tsx`：应用入口，挂载 React Root，注入 RootStore Provider、ErrorBoundary、Router。
- `src/layout/`：框架布局（aside/header/main）、布局样式、布局图标资源。

#### router（路由层）

- `src/router/routes.tsx`：根路由与主模块路由聚合（system/cms/operation/business/sort/product/welcome）。
- `src/router/page-all.ts`：页面懒加载映射（dynamic import + Suspense）。
- `src/utils/react/route-factory.ts`：模块路由工厂，业务模块容器页统一用它创建“模块 Route 组件”。

#### views（页面/业务模块）

页面按“模块域 -> 子模块”组织：

- `src/views/<模块>/router/`：模块内部 path/routes
- `src/views/<模块>/views/`：模块容器页（通常通过 route-factory 生成）
- `src/views/<模块>/modules/<子模块>/`：实际功能页（列表/详情/弹窗/表单）
  - `api/`：该子模块的接口封装
  - `types/`：该子模块接口类型与结构
  - `store/`：MobX store + Context
  - `views/`：页面视图（tsx）
  - `components/`：该子模块私有组件

#### components（通用组件）

`src/components/*` 为通用 UI 或通用能力组件（button/table/container/message 等），通常会按：

- `view/` or `views/`：组件视图
- `styles/` or `style/`：less / module.less
- `types/`：props / 类型
- `index.ts`：统一出口（部分组件会挂载子组件，如 Button.Group）

#### micro（业务微组件）

`src/micro/*` 为可复用的“业务级组件”，用于跨页面复用（如各种 Select、Menu、PageTab、RoleResourceModal 等）。

典型目录结构：

- `api/`：仅服务该 micro 的接口
- `types/`：仅服务该 micro 的类型
- `store/`：MobX store + Context（通常继承 mor-request 的 Store）
- `view/` or `views/`：UI 视图
- `index.ts`：默认导出（通过 HocUtils 注入 store）

#### stores（全局状态）

- `src/stores/root.ts`：RootStore（登录用户、权限、枚举等全局数据）
- `src/stores/root-context.ts`：RootContext（main.tsx 中 Provider 注入）
- `src/stores/base-store.ts`：通用 BaseStore/SimpleStore（分页、loading/error/status 的标准封装）
- `src/stores/store-factory.ts`：Store 工厂（list/form/search）与装饰器（缓存、选择）

#### api（请求层）

项目内存在两类 API 调用方式（现状是并存）：

1) mor-request 体系（当前项目大量使用）

- `src/api/index.ts`：CreateAxios + token 注入 + 统一错误通知（eventDispatch）
- `src/api/api.ts` + `src/api/type.ts`：全局 API 类与 namespace 类型
- 调用风格通常为：
  - `const [err, data] = await store.api.xxx()`
  - store 内负责 setState 与副作用（刷新列表、toast 等）

2) axios ServiceManager 体系（偏“新封装/工具化”）

- `src/api/service-manager.ts`：BaseApiService、拦截器、通用 CRUD、分页封装
- `src/api/services.ts`：按业务域扩展的 ApiService（UserApiService/RoleApiService/...）
- 返回类型通常为 `ApiResponse<T>`（见 `src/types/common.ts`）

建议：同一业务模块尽量统一使用一种请求体系，避免“返回结构/错误处理方式”混用带来的心智负担。

#### types（类型）

- `src/types/`：全局通用类型、枚举、工具类型与业务类型聚合导出
- “模块内类型”通常放在：`src/views/<模块>/modules/<子模块>/types/*`

#### assets / static（静态资源）

- `src/assets/`：参与打包的资源（常见 svg/png）
- `src/views/**/static/`：页面/模块私有静态资源
- 推荐引用方式（Vite）：`new URL("./xxx.svg", import.meta.url).href`

#### hooks / utils / styles

- `src/hooks/`：按领域拆分（api/business/data/ui），提供复用 hooks
- `src/utils/`：通用工具（common/data-structure/form/performance/react）
- `src/styles/`：全局样式入口（tailwind.css 等）

## 组件与调用方式（常见模式）

### 1) 页面组件（FC + MobX）

- 页面大多使用函数式组件（`FC`），并用 `mobx-react` 的 `observer` 包装导出
- Store 注入常用 `useContext(StoreContext)` 获取模块 store

### 2) 模块页面的“store 注入”模式（HocUtils）

业务模块与 micro 组件常用同一套注入方式：

- `index.ts` 默认导出：`HocUtils(Context, Store)(Main)`
- HocUtils 内部会创建 Store 实例，并用 `Context.Provider` 包裹 Main 组件

### 3) 路由渲染与懒加载

- 根路由通过 RouteComponent 渲染路由表，内部使用 `React.createElement(route.component)`
- 页面通过 `dynamicImport(() => import("..."))` 实现懒加载（Suspense + Loading）

### 4) 弹窗/挂载型组件（RunComponent）

部分页面会用“运行时挂载”的方式创建弹窗/面板（无需把 Modal 状态写入页面组件中）：

- `src/components/run-component`：运行时挂载组件容器
- 使用方式通常是 `new RunComponents({ render: () => <Modal /> })`，并在 onCancel/onOk 后 `unmount()`

### 5) 弹框约定（推荐：RunComponents + 独立 FormModal）

本项目推荐把“弹框表单”拆成两部分：

- 页面侧：负责创建/销毁弹框实例、处理提交 loading、调 store api
- 弹框组件侧：只负责表单渲染与校验、把 values 通过 onOk 回传

参考实现：

- 弹框组件示例：[form-modal.tsx](file:///Users/mkrui/Downloads/WebSite/bjhj/fast-bjhj-yly/src/views/system/modules/role/components/form-modal.tsx)
- 页面调用示例：[role main.tsx:L64-L89](file:///Users/mkrui/Downloads/WebSite/bjhj/fast-bjhj-yly/src/views/system/modules/role/views/main.tsx#L64-L89)

推荐调用模板（与项目现有风格一致）：

```tsx
import RunComponents from "@/components/run-component";
import FormModal from "./components/form-modal";

const openModal = (): void => {
  const modal = new RunComponents({
    state: { loading: false },
    render: (state) => (
      <FormModal
        {...state}
        title="标题"
        onCancel={() => modal.unmount()}
        onOk={async (params) => {
          modal.setState({ loading: true });
          const ok = await store.submit(params);
          modal.setState({ loading: false });
          if (ok) modal.unmount();
        }}
      />
    ),
  });
};
```

约束：

- 弹框组件内部使用 `Modal open={true}` 渲染（由 RunComponents 控制挂载/卸载）
- 页面侧负责 `loading` 状态（通过 `modal.setState` 传入弹框组件）
- 禁止在页面内直接堆一个巨大 `<Modal>`（可读性/复用性差），优先拆成 `components/form-modal.tsx`

## 约定清单（新增模块/页面/组件时遵循）

### 目录与命名

- 业务页面放在 `src/views/<模块>/modules/<子模块>/...`，不要把业务代码写进 `src/components/`
- 通用 UI/能力组件放在 `src/components/<name>/...`，与业务无关才允许下沉到 components
- 可跨页面复用但带业务语义的组件放在 `src/micro/<name>/...`
- 文件/目录命名使用 kebab-case（目录）与清晰语义（例如：`form-modal.tsx`、`account-modal.tsx`）

### 路由（新增页面）

- 新增页面优先在“模块内 router”中增加 path/routes，再由模块容器页统一挂载
- 页面默认导出组件应支持被 route-factory / RouteComponent 使用（组件本身不依赖外部渲染参数）

### Store（新增状态）

- 模块内 store 放在 `store/index.tsx`：同时提供 `StoreClass` 与 `Context`
- store 内集中处理：
  - 请求 loading/错误提示
  - 列表刷新/分页参数更新
  - 对外暴露最小必要的 actions（例如 getList/addItem/delItem）

### API 与 types（新增接口）

- 若接口只服务某个子模块：放在 `modules/<子模块>/api/` + `modules/<子模块>/types/`
- 若接口是全局通用：才考虑放到 `src/api/` 与 `src/api/type.ts`
- 同一子模块尽量统一一种请求返回结构（mor-request 或 ApiResponse），避免混用

### micro 组件（新增一个业务微组件）

- 必备：`api/ + store/ + types/ + view/ + index.ts`（不需要的目录不要强行创建）
- `index.ts` 统一默认导出 `HocUtils(Context, Store)(Main)`，保证“即插即用”
- view 组件内通过 `useContext` 获取 store，并使用 `observer` 导出

### 静态资源

- 页面私有资源放在该页面/模块的 `static/` 目录
- 组件私有 icon 可放在组件目录内部（如 `components/avatar/icon/*`）
- 使用 `new URL(path, import.meta.url).href` 引用，避免路径与构建差异

---

## Vite/ESLint（模板参考）

This project is bootstrapped with React + TypeScript + Vite.

Currently, two official plugins are available:
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
