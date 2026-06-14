import { theme as antdTheme, type ThemeConfig } from "antd";

import type { ThemeMode } from "@/types";

export function getAntdTheme(mode: ThemeMode): ThemeConfig {
  const isDark = mode === "dark";

  if (!isDark) {
    return {
      algorithm: antdTheme.defaultAlgorithm,
    };
  }

  return {
    algorithm: antdTheme.darkAlgorithm,
    token: {
      colorBgContainer: "#1f1f1f",
      colorBgElevated: "#1f1f1f",
      colorBgLayout: "#141414",
      colorBorder: "#424242",
      colorBorderSecondary: "#303030",
      colorText: "rgba(255, 255, 255, 0.85)",
      colorTextSecondary: "rgba(255, 255, 255, 0.65)",
      colorTextPlaceholder: "rgba(255, 255, 255, 0.25)",
      colorFillAlter: "#141414",
      colorBgContainerDisabled: "rgba(255, 255, 255, 0.08)",
    },
    components: {
      Input: {
        colorBgContainer: "#141414",
        activeBg: "#141414",
        hoverBg: "#141414",
      },
      InputNumber: {
        colorBgContainer: "#141414",
      },
      Select: {
        colorBgContainer: "#141414",
        optionSelectedBg: "rgba(24, 144, 255, 0.15)",
      },
      Divider: {
        colorTextHeading: "rgba(255, 255, 255, 0.85)",
      },
      Form: {
        labelColor: "rgba(255, 255, 255, 0.85)",
      },
      Card: {
        colorBgContainer: "#1f1f1f",
      },
      Modal: {
        contentBg: "#1f1f1f",
        headerBg: "#1f1f1f",
      },
      Table: {
        colorBgContainer: "#1f1f1f",
        headerBg: "#141414",
        rowHoverBg: "rgba(24, 144, 255, 0.15)",
      },
      Spin: {
        colorBgContainer: "rgba(0, 0, 0, 0.45)",
      },
      Tabs: {
        itemColor: "rgba(255, 255, 255, 0.65)",
        itemHoverColor: "rgba(255, 255, 255, 0.85)",
        itemSelectedColor: "#1890ff",
        inkBarColor: "#1890ff",
      },
      Pagination: {
        colorBgContainer: "#1f1f1f",
      },
    },
  };
}
