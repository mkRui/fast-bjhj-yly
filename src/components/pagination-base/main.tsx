import { Pagination } from "antd";
import { PaginationProps } from "antd/lib/pagination";
import { FC } from "react";
import ClassNames from "classnames";

import Style from "./pagination.module.less";
import { PaginationBaseStore } from "./pagination-base-store";

interface PaginationBaseTypes {
  store: PaginationBaseStore<any, any, any>;
  children?: any;
  isBottom?: boolean;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
}
const PaginationBase: FC<PaginationBaseTypes & PaginationProps> = (props) => {
  const {
    isBottom = true,
    showSizeChanger = true,
    showQuickJumper = true,
  } = props;

  const store = props.store;

  const handleChange = (page: number): void => {
    void store.jumpPage(page);
  };

  const handlePageSize = (_current: number, size: number): void => {
    void store.changeSize(size);
  };

  const mainClass = (): string => {
    return ClassNames(`${Style.pagination__container}`, {
      [`${Style.bottom}`]: isBottom,
    });
  };

  return (
    <div className={mainClass()}>
      <div>{props.children}</div>
      <Pagination
        showSizeChanger={showSizeChanger}
        showQuickJumper={showQuickJumper}
        {...props}
        showTotal={(total) => `共有 ${total} 条`}
        onChange={handleChange}
        onShowSizeChange={handlePageSize}
      />
    </div>
  );
};

export default PaginationBase;
