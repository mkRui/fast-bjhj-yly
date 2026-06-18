import { App } from "antd";
import { observer } from "mobx-react";
import { FC, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "@/api";
import RootContext from "@/stores/root-context";
import eventDispatch from "@/utils/common/event-dispatch";

import { Api } from "../api";
import { MESSAGE_POLL_INTERVAL_MS, NoticeEvents } from "../constants/events";
import { showGlobalNotice } from "../utils/notice-payload";

const api = new Api(axios);

const GlobalNotification: FC = () => {
  const navigate = useNavigate();
  const root = useContext(RootContext);
  const { notification } = App.useApp();
  const userId = root.init?.id || "";
  const previousCountRef = useRef<number | null>(null);

  useEffect(() => {
    if (!userId) return undefined;

    const pollUnreadCount = async (): Promise<void> => {
      const [err, count] = await api.getUnreadCount();
      if (err || typeof count !== "number") return;

      const previous = previousCountRef.current;
      previousCountRef.current = count;
      eventDispatch.emit(NoticeEvents.UNREAD_COUNT, count);

      if (previous === null || previous === count) return;

      eventDispatch.emit(NoticeEvents.REFRESH_LIST);

      if (count > previous) {
        showGlobalNotice(
          notification,
          {
            title: "新消息提醒",
            content: `您有 ${count} 条未读消息，请及时查看。`,
            type: "info",
          },
          () => {
            navigate("/notification");
          }
        );
      }
    };

    void pollUnreadCount();
    const timer = window.setInterval(() => {
      void pollUnreadCount();
    }, MESSAGE_POLL_INTERVAL_MS);

    const handleSessionExpired = (): void => {
      previousCountRef.current = null;
    };

    eventDispatch.on("login", handleSessionExpired);

    return () => {
      window.clearInterval(timer);
      eventDispatch.off("login", handleSessionExpired);
    };
  }, [userId, notification, navigate]);

  return null;
};

export default observer(GlobalNotification);
