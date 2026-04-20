/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-04-28 15:03:08
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-25 17:46:40
 * @FilePath: /fast-bjhj-website-admin/src/main.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import "normalize.css";
import "./styles/tailwind.css";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import RootContext from "./stores/root-context";
import ErrorBoundary from "./components/error-boundary";

import { root as rootStore } from "./stores/root";
import { App } from "@/layout/app.tsx";
import history from "./utils/common/history";
import CustomRouter from "./custom-router";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <ErrorBoundary>
      <RootContext.Provider value={rootStore}>
        <CustomRouter history={history}>
          <App />
        </CustomRouter>
      </RootContext.Provider>
    </ErrorBoundary>
  </StrictMode>
);
