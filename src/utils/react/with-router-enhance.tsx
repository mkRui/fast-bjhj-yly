/*
 * @Author: mkRui
 * @Date: 2021-10-30 12:02:24
 * @LastEditTime: 2021-12-19 23:24:35
 */
import { FC } from "react";
import { useLocation } from "react-router-dom";

export interface MetaProps {
  base?: any;
}

function withRouterEnhance<T>(Component: FC<MetaProps & T>) {
  return function (props: MetaProps & T) {
    const location = useLocation();

    return <Component {...props} base={location} />;
  };
}

export default withRouterEnhance;
