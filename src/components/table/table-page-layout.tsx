import { FC, ReactNode, type CSSProperties } from "react";
import { Spin } from "antd";

import { Content } from "@/components/container";

export const TABLE_MAIN_STYLE: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
};

export const TABLE_SPIN_WRAPPER =
  "min-h-0 flex-1 overflow-hidden [&_.ant-spin-container]:flex [&_.ant-spin-container]:h-full [&_.ant-spin-container]:min-h-0 [&_.ant-spin-container]:flex-col";

export const TABLE_MODAL_BODY_STYLE: CSSProperties = {
  height: 420,
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
  overflow: "hidden",
};

interface TablePageMainProps {
  loading?: boolean;
  style?: CSSProperties;
  children: ReactNode;
}

export const TablePageMain: FC<TablePageMainProps> = ({ loading = false, style, children }) => (
  <Content.Main style={{ ...TABLE_MAIN_STYLE, ...style }}>
    <Spin spinning={loading} wrapperClassName={TABLE_SPIN_WRAPPER}>
      {children}
    </Spin>
  </Content.Main>
);

interface TableModalBodyProps {
  loading?: boolean;
  height?: number;
  children: ReactNode;
}

export const TableModalBody: FC<TableModalBodyProps> = ({ loading = false, height = 420, children }) => (
  <div style={{ ...TABLE_MODAL_BODY_STYLE, height }}>
    <Spin spinning={loading} wrapperClassName={TABLE_SPIN_WRAPPER}>
      {children}
    </Spin>
  </div>
);
