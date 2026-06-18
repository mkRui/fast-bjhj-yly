import { FC, ReactNode } from "react";
import { Pagination, PaginationProps, Spin } from "antd";

import { Content } from "@/components/container";
import { TABLE_MAIN_STYLE, TABLE_SPIN_WRAPPER } from "@/components/table";

const FOOTER_STYLE: React.CSSProperties = {
  height: "49px",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: "0 12px",
};

export interface UserTablePanelProps {
  title?: ReactNode;
  toolbar?: ReactNode;
  /** header：独立筛选卡片；inline：与表格同卡片 */
  toolbarPlacement?: "header" | "inline";
  loading?: boolean;
  extra?: ReactNode;
  pagination: Pick<
    PaginationProps,
    "current" | "pageSize" | "total" | "onChange" | "showTotal" | "showSizeChanger" | "showQuickJumper"
  >;
  children: ReactNode;
}

const UserTablePanel: FC<UserTablePanelProps> = ({
  title,
  toolbar,
  toolbarPlacement = "header",
  loading = false,
  extra,
  pagination,
  children,
}) => (
  <div className="flex h-full min-h-0 flex-col">
    {toolbar && toolbarPlacement === "header" ? <Content.Header>{toolbar}</Content.Header> : null}
    {extra ? <div className="mx-[10px] mb-2 shrink-0">{extra}</div> : null}
    <Content.Main
      style={{
        ...TABLE_MAIN_STYLE,
        flex: 1,
        overflow: "hidden",
        marginBottom: 0,
      }}
    >
      {toolbar && toolbarPlacement === "inline" ? (
        <div className="mb-4 shrink-0">{toolbar}</div>
      ) : null}
      {title ? <div className="mb-4 shrink-0 text-base font-semibold">{title}</div> : null}
      <Spin spinning={loading} wrapperClassName={TABLE_SPIN_WRAPPER}>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden [&_.mor-table-host]:min-h-0 [&_.mor-table-host]:flex-1">
          {children}
        </div>
      </Spin>
    </Content.Main>
    <Content.Footer style={{ margin: "0 10px 10px" }}>
      <div style={FOOTER_STYLE}>
        <Pagination showSizeChanger showQuickJumper {...pagination} />
      </div>
    </Content.Footer>
  </div>
);

export const UserPageTabs: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex min-h-0 flex-1 flex-col px-[10px] pb-[10px] [&_.ant-tabs-content-holder]:min-h-0 [&_.ant-tabs-content-holder]:flex-1 [&_.ant-tabs-content]:h-full [&_.ant-tabs-tabpane-active]:flex [&_.ant-tabs-tabpane-active]:h-full [&_.ant-tabs-tabpane-active]:min-h-0 [&_.ant-tabs-tabpane-active]:flex-col [&_.ant-tabs]:flex [&_.ant-tabs]:h-full [&_.ant-tabs]:min-h-0 [&_.ant-tabs]:flex-1 [&_.ant-tabs]:flex-col [&_.ant-tabs-nav]:mb-3 [&_.ant-tabs-nav]:shrink-0 [&_.ant-tabs-nav]:before:border-b-black/6">
    {children}
  </div>
);

export default UserTablePanel;
