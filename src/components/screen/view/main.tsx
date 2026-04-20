import { CompressOutlined, ExpandOutlined } from "@ant-design/icons";
import { FC, useState } from "react";

import Style from "../style/screen.module.less";
const Screen: FC = () => {
  const [screen, setScreen] = useState(false);

  // 退出全屏
  const exitFullscreen = (): void => {
    const de = document;
    if (de.exitFullscreen) {
      void de.exitFullscreen();
    }
  };

  // 全屏
  const requestFullScreen = (): void => {
    const de = document.documentElement;
    if (de.requestFullscreen) {
      void de.requestFullscreen();
    }
  };

  // 全屏
  const switchScreen = (): void => {
    if (!screen) {
      requestFullScreen();
    } else {
      exitFullscreen();
    }
    setScreen(!screen);
  };

  return (
    <div className={Style.screen} onClick={switchScreen}>
      {screen ? <CompressOutlined /> : <ExpandOutlined />}
    </div>
  );
};

export default Screen;
