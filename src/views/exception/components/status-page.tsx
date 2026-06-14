import { FC } from "react";
import { Button, Result } from "antd";
import type { ResultProps } from "antd";
import { useNavigate } from "react-router-dom";

import { BasePath } from "@/router/path";

export type ExceptionCode = 403 | 404 | 500;

interface StatusConfig {
  status: ResultProps["status"];
  title: string;
  subTitle: string;
}

const STATUS_MAP: Record<ExceptionCode, StatusConfig> = {
  403: {
    status: "403",
    title: "403",
    subTitle: "抱歉，您无权访问此页面",
  },
  404: {
    status: "404",
    title: "404",
    subTitle: "抱歉，您访问的页面不存在",
  },
  500: {
    status: "500",
    title: "500",
    subTitle: "抱歉，服务器出现了问题，请稍后重试",
  },
};

interface StatusPageProps {
  code: ExceptionCode;
}

const StatusPage: FC<StatusPageProps> = ({ code }) => {
  const navigate = useNavigate();
  const config = STATUS_MAP[code];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Result
        status={config.status}
        title={config.title}
        subTitle={config.subTitle}
        extra={[
          <Button type="primary" key="home" onClick={() => navigate(BasePath.WELCOME)}>
            返回首页
          </Button>,
          <Button key="back" onClick={() => navigate(-1)}>
            返回上页
          </Button>,
        ]}
      />
    </div>
  );
};

export default StatusPage;
