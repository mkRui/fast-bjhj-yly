import { BellOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "@/api";
import eventDispatch from "@/utils/common/event-dispatch";
import { Api } from "../api";
import { NoticeEvents } from "../constants/events";

import Style from "../style/notification-bell.module.less";

const api = new Api(axios);

const NotificationBell: FC = () => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchCount = (): void => {
      void api.getUnreadCount().then(([err, data]) => {
        if (!err && typeof data === "number") {
          setUnreadCount(data);
        }
      });
    };

    fetchCount();

    const onUnreadCount = (...args: unknown[]): void => {
      const count = args[0];
      if (typeof count === "number") {
        setUnreadCount(count);
      }
    };

    eventDispatch.on(NoticeEvents.UNREAD_COUNT, onUnreadCount);
    eventDispatch.on(NoticeEvents.RECEIVED, fetchCount);

    return () => {
      eventDispatch.off(NoticeEvents.UNREAD_COUNT, onUnreadCount);
      eventDispatch.off(NoticeEvents.RECEIVED, fetchCount);
    };
  }, []);

  return (
    <button
      type="button"
      className={Style.bell}
      onClick={() => navigate("/notification")}
      aria-label="通知"
      title="通知"
    >
      <Badge count={unreadCount} size="small" offset={[2, -2]}>
        <BellOutlined />
      </Badge>
    </button>
  );
};

export default NotificationBell;
