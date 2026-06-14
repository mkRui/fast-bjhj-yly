import { CompressOutlined, ExpandOutlined } from "@ant-design/icons";
import { FC, useCallback, useEffect, useState } from "react";

import Style from "../style/screen.module.less";

type FullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null;
  mozFullScreenElement?: Element | null;
  msFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
  mozCancelFullScreen?: () => Promise<void> | void;
  msExitFullscreen?: () => Promise<void> | void;
};

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
  mozRequestFullScreen?: () => Promise<void> | void;
  msRequestFullscreen?: () => Promise<void> | void;
};

function getFullscreenElement(): Element | null {
  const doc = document as FullscreenDocument;
  return (
    doc.fullscreenElement ||
    doc.webkitFullscreenElement ||
    doc.mozFullScreenElement ||
    doc.msFullscreenElement ||
    null
  );
}

async function enterFullscreen(): Promise<void> {
  const candidates: FullscreenElement[] = [
    document.documentElement as FullscreenElement,
    document.body as FullscreenElement,
  ];

  for (const el of candidates) {
    if (el.requestFullscreen) {
      await el.requestFullscreen();
      return;
    }
    if (el.webkitRequestFullscreen) {
      await el.webkitRequestFullscreen();
      return;
    }
    if (el.mozRequestFullScreen) {
      await el.mozRequestFullScreen();
      return;
    }
    if (el.msRequestFullscreen) {
      await el.msRequestFullscreen();
      return;
    }
  }

  throw new Error("Fullscreen API is not supported");
}

async function leaveFullscreen(): Promise<void> {
  const doc = document as FullscreenDocument;

  if (doc.exitFullscreen) {
    await doc.exitFullscreen();
    return;
  }
  if (doc.webkitExitFullscreen) {
    await doc.webkitExitFullscreen();
    return;
  }
  if (doc.mozCancelFullScreen) {
    await doc.mozCancelFullScreen();
    return;
  }
  if (doc.msExitFullscreen) {
    await doc.msExitFullscreen();
    return;
  }
}

const FULLSCREEN_EVENTS = [
  "fullscreenchange",
  "webkitfullscreenchange",
  "mozfullscreenchange",
  "MSFullscreenChange",
] as const;

const Screen: FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const syncFullscreenState = useCallback(() => {
    setIsFullscreen(Boolean(getFullscreenElement()));
  }, []);

  useEffect(() => {
    syncFullscreenState();
    FULLSCREEN_EVENTS.forEach((event) =>
      document.addEventListener(event, syncFullscreenState)
    );
    return () => {
      FULLSCREEN_EVENTS.forEach((event) =>
        document.removeEventListener(event, syncFullscreenState)
      );
    };
  }, [syncFullscreenState]);

  const switchScreen = async (): Promise<void> => {
    try {
      if (getFullscreenElement()) {
        await leaveFullscreen();
      } else {
        await enterFullscreen();
      }
    } catch {
      syncFullscreenState();
    }
  };

  return (
    <button
      type="button"
      className={Style.screen}
      onClick={() => void switchScreen()}
      aria-label={isFullscreen ? "退出全屏" : "全屏"}
    >
      {isFullscreen ? <CompressOutlined /> : <ExpandOutlined />}
    </button>
  );
};

export default Screen;
