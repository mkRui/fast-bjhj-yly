import {
  DeleteOutlined,
  QuestionCircleOutlined,
  EditOutlined,
  EyeOutlined,
  LoadingOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import ClassNames from "classnames";
import React, { FC, MouseEventHandler } from "react";
import { Popconfirm } from "antd";
import Styles from "../styles/button.module.less";
import { ButtonAction, ButtonHTMLType, ButtonSize, ButtonType } from "../types";

interface NativeButtonProps {
  htmlType?: ButtonHTMLType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onConfirm?: () => void;
}

interface ActionType {
  type: ButtonType;
  icon: React.ReactNode;
}

export interface BaseButtonProps extends NativeButtonProps {
  type?: ButtonType;
  loading?: boolean;
  ghost?: boolean;
  size?: ButtonSize;
  action?: ButtonAction;
  children?: React.ReactNode;
  disabled?: boolean;
  block?: boolean;
  title?: string;
  shape?: "round" | "circle";
  description?: string;
  linkType?: Omit<ButtonType, "link">;
}

const Button: FC<BaseButtonProps> = (props) => {
  const {
    children,
    size,
    type,
    ghost,
    action,
    htmlType = "button",
    disabled,
    loading,
    block,
    onConfirm,
    onClick,
    title,
    linkType,
    shape,
    description = null,
  } = props;

  const getActionIcon = (): ActionType => {
    switch (action) {
      case "add":
        return {
          type: "primary",
          icon: <PlusOutlined />,
        };
      case "del":
        return {
          type: "danger",
          icon: <DeleteOutlined />,
        };
      case "edit":
        return {
          type: "warning",
          icon: <EditOutlined />,
        };
      case "info":
        return {
          type: "info",
          icon: <EyeOutlined />,
        };
      case "reset":
        return {
          type: "info",
          icon: <ReloadOutlined />,
        };
      case "search":
        return {
          type: "primary",
          icon: <SearchOutlined />,
        };
      case "view":
        return {
          type: "success",
          icon: <EyeOutlined />,
        };
      default:
        return {
          type: type ?? "info",
          icon: null,
        };
    }
  };

  const nowAction = getActionIcon();

  const themeClass = ClassNames(`${Styles[`mor-button--reset`]}`, {
    [`${Styles["mor-button"]}`]: true,
    [`${Styles["mor-button--block"]}`]: block,
    [`${Styles[`mor-button--${size as string}`]}`]: !!size,
    [`${Styles[`mor-button--disabled`]}`]: disabled ?? loading,
    [`${Styles[`mor-button--${nowAction.type}`]}`]: true,
    [`${Styles["mor-button--ghost"]}`]: ghost,
    [`${Styles[`mor-button--${shape}`]}`]: !!shape,
  });

  const linkThemeClass = ClassNames(`${Styles[`mor-link`]}`, {
    [`${Styles[`mor-link--${size}`]}`]: !!size,
    [`${Styles[`mor-link--disabled`]}`]: disabled ?? loading,
    [`${Styles[`mor-link--${linkType}`]}`]: linkType,
  });

  const iconClass = ClassNames(`${Styles.icon}`, {
    [`${Styles["icon-none"]}`]: !loading && !nowAction.icon,
  });

  if (type === "link") {
    if (action === "del" && onConfirm) {
      return (
        <Popconfirm
          placement="topRight"
          title={"确定删除这条数据吗？"}
          onConfirm={onConfirm}
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          okText="确定"
          cancelText="取消"
        >
          <button disabled={disabled} className={linkThemeClass}>
            {children}
          </button>
        </Popconfirm>
      );
    }
    if (onConfirm && title) {
      return (
        <Popconfirm
          placement="topRight"
          title={title}
          description={description}
          icon={description ? null : undefined}
          onConfirm={onConfirm}
          okText="确定"
          cancelText="取消"
        >
          <button disabled={disabled} className={linkThemeClass}>
            {children}
          </button>
        </Popconfirm>
      );
    }
    return (
      <button disabled={disabled} onClick={onClick} className={linkThemeClass}>
        {children}
      </button>
    );
  }

  if (action === "del" && onConfirm) {
    return (
      <Popconfirm
        placement="topRight"
        title={"确定删除这条数据吗？"}
        onConfirm={onConfirm}
        icon={<QuestionCircleOutlined style={{ color: "red" }} />}
        okText="确定"
        cancelText="取消"
      >
        <button disabled={disabled} type={htmlType} className={themeClass}>
          <span className={iconClass}>
            {loading ? <LoadingOutlined /> : nowAction.icon}
          </span>
          {(children as string).replace(/(.)(?=.)/g, "$1 ")}
        </button>
      </Popconfirm>
    );
  }

  if (onConfirm && title) {
    return (
      <Popconfirm
        placement="topRight"
        title={title}
        description={description}
        icon={description ? null : undefined}
        onConfirm={onConfirm}
        okText="确定"
        cancelText="取消"
      >
        <button disabled={disabled} type={htmlType} className={themeClass}>
          <span className={iconClass}>
            {loading ? <LoadingOutlined /> : nowAction.icon}
          </span>
          {(children as string).length <= 2
            ? (children as string).replace(/(.)(?=.)/g, "$1 ")
            : children}
        </button>
      </Popconfirm>
    );
  }

  if (typeof children === "string" && children.length === 2) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        type={htmlType}
        className={themeClass}
      >
        <span className={iconClass}>
          {loading ? <LoadingOutlined /> : nowAction.icon}
        </span>
        {children.replace(/(.)(?=.)/g, "$1 ")}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      type={htmlType}
      disabled={disabled}
      className={themeClass}
    >
      <span className={iconClass}>
        {loading ? <LoadingOutlined /> : nowAction.icon}
      </span>
      {children}
    </button>
  );
};

export default Button;
