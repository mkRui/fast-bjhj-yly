// 路由配置页面
import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { observer } from "mobx-react";
import { RouteTypes } from './routes'

interface RouterProps {
  baseRouter?: string;
  redirect?: string;
  routes: RouteTypes[];
}

const RouterComponents: FC<RouterProps> = (props) => {
  const { routes, baseRouter, redirect } = props;

  return (
    <Routes>
      {!!redirect && (
        <Route
          path={baseRouter}
          element={<Navigate to={redirect as string} />}
        />
      )}
      {routes.map((item) => (
        <Route
          key={item.path}
          path={item.path}
          element={React.createElement(item.component)}
        />
      ))}
      <Route element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default observer(RouterComponents);
