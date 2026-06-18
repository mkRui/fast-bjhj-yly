import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Radio, Space } from "antd";

import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import PageToolbar from "@/components/page-toolbar";
import MorTable from "@/components/table";
import Button from "@/components/button";
import { EnumLabel } from "@/micro/select-enum";
import { DictCode } from "@/constants/dict-code";
import { toastActionResult } from "@/utils/common/mutation-success";
import eventDispatch from "@/utils/common/event-dispatch";

import { NoticeEvents } from "../constants/events";
import { useRefreshOnMessageList } from "../hooks/use-refresh-on-message-list";
import StoreContext from "../store";
import { API } from "../types/api";

const NotificationMain: FC = () => {
  const store = useContext(StoreContext);

  const refreshList = (): void => {
    void store.fetchList();
    void store.fetchUnreadCount();
  };

  useRefreshOnMessageList(refreshList);

  useEffect(() => {
    refreshList();

    const onRefresh = (): void => {
      refreshList();
    };

    eventDispatch.on(NoticeEvents.REFRESH_LIST, onRefresh);
    return () => {
      eventDispatch.off(NoticeEvents.REFRESH_LIST, onRefresh);
    };
  }, [store]);

  const columns = [
    { title: "标题", dataIndex: "title", width: 220 },
    { title: "内容", dataIndex: "content" },
    {
      title: "类型",
      dataIndex: "target",
      width: 160,
      render: (val: unknown) => <EnumLabel name={DictCode.MESSAGE_TARGET} value={val} />,
    },
    { title: "时间", dataIndex: "alertTime", width: 180 },
    {
      title: "操作",
      width: 120,
      fixed: "right" as const,
      render: (_text: unknown, record: API.List.RecordItem) =>
        !store.readFlag ? (
          <Button.Group>
            <Button
              type="link"
              onClick={() => {
                void store.markRead(record.id).then((ok) => {
                  toastActionResult(ok, "已标记为已读", "操作失败");
                });
              }}
            >
              标记已读
            </Button>
          </Button.Group>
        ) : null,
    },
  ];

  return (
    <Content>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle>通知中心</HeaderTitle>
        </Content.Header>
        <Content.Header>
          <PageToolbar
            filters={
              <Radio.Group
                value={store.readFlag ? "read" : "unread"}
                onChange={(e) => {
                  store.$setReadFlag(e.target.value === "read");
                  void store.fetchList();
                }}
              >
                <Radio.Button value="unread">未读</Radio.Button>
                <Radio.Button value="read">已读</Radio.Button>
              </Radio.Group>
            }
            actions={
              !store.readFlag ? (
                <Space>
                  <Button
                    onClick={() => {
                      void store.markAllRead().then((ok) => {
                        toastActionResult(ok, "已全部标记为已读", "操作失败");
                      });
                    }}
                  >
                    全部已读
                  </Button>
                  <Button action="reset" onClick={refreshList}>
                    刷新
                  </Button>
                </Space>
              ) : (
                <Button action="reset" onClick={refreshList}>
                  刷新
                </Button>
              )
            }
          />
        </Content.Header>
        <Content.Main>
          <MorTable
            auto
            bordered
            pagination={false}
            dataSource={store.list}
            columns={columns}
            rowKey={(record) => record.id}
            loading={store.loading}
          />
        </Content.Main>
      </Content.Layout>
    </Content>
  );
};

export default observer(NotificationMain);
