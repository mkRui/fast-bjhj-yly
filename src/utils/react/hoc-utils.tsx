// eslint-disable-next-line
import React, { FC, JSX } from "react";
import axios from "@/api";
function HocUtils<T, S extends JSX.IntrinsicAttributes>(
  Context: React.Context<T>,
  Store: any
) {
  return function (Component: FC<S>, store?: any): any {
    const STORE = new Store(axios);

    return function (props: S): any {
      return (
        <Context.Provider value={store || STORE}>
          <Component {...props} />
        </Context.Provider>
      );
    };
  };
}

export default HocUtils;
