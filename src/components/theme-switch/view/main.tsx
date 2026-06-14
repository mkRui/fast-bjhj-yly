import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { FC, useEffect } from "react";

import { useThemeMode } from "@/config/hooks";
import { applyTheme } from "@/utils/common/theme";

import Style from "../style/theme-switch.module.less";

const ThemeSwitch: FC = () => {
  const { mode, toggleMode, isDark } = useThemeMode();

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  return (
    <div
      className={Style.theme}
      onClick={toggleMode}
      title={isDark ? "切换浅色模式" : "切换深色模式"}
    >
      {isDark ? <SunOutlined /> : <MoonOutlined />}
    </div>
  );
};

export default ThemeSwitch;
