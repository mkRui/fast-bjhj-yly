// 消息模块 弹出式
import { FC, useEffect, useCallback, memo } from "react";
import RunComponents from "@/components/run-component";
import {
  StyleProvider,
  legacyLogicalPropertiesTransformer,
} from "@ant-design/cssinjs";

import { App } from "antd";

type MessagesType = "success" | "info" | "warning" | "error";

interface ToastComponentType {
  type: MessagesType;
  title?: string;
  content?: string;
}

export const ToastComponent: FC<ToastComponentType> = memo((props) => {
  const { type, title } = props;

  const { message } = App.useApp();

  useEffect(() => {
    if (title) {
      void message[type](title);
    }
  }, [message, type, title]);
  
  return null;
});

ToastComponent.displayName = 'ToastComponent';

export const MessageComponent: FC<ToastComponentType> = memo((props) => {
  const { type, content } = props;

  const { notification } = App.useApp();

  const getTitle = useCallback((): string => {
    switch (type) {
      case "error":
        return "错误";
      case "info":
        return "信息";
      case "success":
        return "成功";
      case "warning":
        return "警告";
    }
  }, [type]);

  useEffect(() => {
    if (content) {
      void notification[type]({
        message: getTitle(),
        description: content,
      });
    }
  }, [notification, type, content, getTitle]);
  
  return null;
});

MessageComponent.displayName = 'MessageComponent';

export const toast = (
  type: ToastComponentType["type"],
  title: string
): void => {
  const modal = new RunComponents({
    state: {},
    render: () => (
      <StyleProvider
        transformers={[legacyLogicalPropertiesTransformer]}
        hashPriority="high"
      >
        <App>
          <ToastComponent type={type} title={title}></ToastComponent>
        </App>
      </StyleProvider>
    ),
  });
  const Timer = setTimeout(() => {
    modal.unmount();
  }, 3000);
  clearTimeout(Timer);
};

export const messages = (
  type: ToastComponentType["type"],
  content: string
): void => {
  const modal = new RunComponents({
    state: {},
    render: () => (
      <StyleProvider
        transformers={[legacyLogicalPropertiesTransformer]}
        hashPriority="high"
      >
        <App>
          <MessageComponent type={type} content={content}></MessageComponent>
        </App>
      </StyleProvider>
    ),
  });
  const Timer = setTimeout(() => {
    modal.unmount();
  }, 3000);
  clearTimeout(Timer);
};
