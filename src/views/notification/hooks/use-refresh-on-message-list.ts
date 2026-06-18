import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import eventDispatch from "@/utils/common/event-dispatch";
import { SmsFullPath } from "@/views/sms/router/path";
import { TmsFullPath } from "@/views/tms/router/path";

import { NoticeEvents } from "../constants/events";

const AUDIT_PAGE_PATHS = [
  SmsFullPath.AMS_ASSETS_CHECK,
  SmsFullPath.AMS_CONSUMABLES_CHECK,
  SmsFullPath.CAR_APPLY,
  TmsFullPath.LEAVE,
];

export function useRefreshOnMessageList(onRefresh: () => void): void {
  const location = useLocation();

  useEffect(() => {
    const isAuditPage = AUDIT_PAGE_PATHS.some((path) => location.pathname.startsWith(path));
    if (!isAuditPage) return;

    const handler = (): void => {
      onRefresh();
    };

    eventDispatch.on(NoticeEvents.REFRESH_LIST, handler);
    return () => {
      eventDispatch.off(NoticeEvents.REFRESH_LIST, handler);
    };
  }, [location.pathname, onRefresh]);
}
