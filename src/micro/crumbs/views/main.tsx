import { observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import withRouterEnhance, { MetaProps } from "@/utils/react/with-router-enhance";
import { useLocation } from "react-router-dom";

import Styles from "../styles/main.module.less";

const Crumbs: FC<MetaProps> = (props) => {
  const { base } = props;

  const [path, setPath] = useState<string[]>([]);

  const { pathname } = useLocation();

  useEffect(() => {
    const search: any = "";
    if (search.length) {
      setPath(search);
    } else {
      setPath([base?.meta?.title || ""]);
    }
  }, [pathname]);

  return (
    <div className={Styles["container"]}>
      {path.map((item, index) => (
        <span key={index}>
          {item}
          {index !== path.length - 1 && <i>/</i>}
        </span>
      ))}
      <span></span>
    </div>
  );
};

// todo 需要改进
export default withRouterEnhance(observer(Crumbs));
