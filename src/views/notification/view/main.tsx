import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Form, Pagination, Select, Tag } from "antd";

import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import PageToolbar from "@/components/page-toolbar";
import MorTable from "@/components/table";
import Button from "@/components/button";
import OverallSituationSearch from "@/components/overall-situation-search";
import { toastActionResult } from "@/utils/common/mutation-success";
import { NoticeStateEnum } from "@/types/enum-types";

import StoreContext from "../store";
import { API } from "../types/api";

const Item = Form.Item;
const Option = Select.Option;

const READ_STATE_OPTIONS = [
  { label: "全部", value: String(NoticeStateEnum.ALL) },
  { label: "已读", value: String(NoticeStateEnum.READ) },
  { label: "未读", value: String(NoticeStateEnum.UNREAD) },
];

const NotificationMain: FC = () => {
  const store = useContext(StoreContext);

  const uiCurrent = Math.max(1, Number(store.params.current || "0") + 1);

  const columns = [
    {
      title: "状态",
      dataIndex: "state",
      width: 100,
      render: (val: number) =>
        val === NoticeStateEnum.READ ? (
          <Tag>已读</Tag>
        ) : (
          <Tag color="blue">未读</Tag>
        ),
    },
    { title: "标题", dataIndex: "title", width: 200 },
    { title: "内容", dataIndex: "content" },
    { title: "类型", dataIndex: "type", width: 120 },
    { title: "时间", dataIndex: "createTime", width: 180 },
    {
      title: "操作",
      dataIndex: "",
      width: 120,
      fixed: "right" as const,
      render: (_text: unknown, record: API.Page.RecordItem) =>
        record.state !== NoticeStateEnum.READ ? (
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

  const handleChange = (page: number): void => {
    store.$setParams({ current: String(Math.max(0, page - 1)) });
    void store.fetchPage();
  };

  const handlePageSize = (_current: number, size: number): void => {
    store.$setParams({
      current: "0",
      size: String(size),
    });
    void store.fetchPage();
  };

  const onFinish = (params: Partial<API.Page.Params>): void => {
    store.$setParams({
      ...params,
      current: "0",
    });
    void store.fetchPage();
  };

  const onReset = (): void => {
    store.$setParams({
      current: "0",
      size: store.params.size,
      state: undefined,
    });
    void store.fetchPage();
  };

  useEffect(() => {
    void store.fetchPage();
    void store.fetchUnreadCount();
  }, []);

  return (
    <Content>
      <Content.Layout>
        <Content.Header>
          <HeaderTitle>通知中心</HeaderTitle>
        </Content.Header>
        <Content.Header>
          <PageToolbar
            filters={
              <OverallSituationSearch
                info={store.params}
                onFinish={onFinish}
                onReset={onReset}
              >
                <Item name="state">
                  <Select allowClear placeholder="阅读状态" style={{ width: 200 }}>
                    {READ_STATE_OPTIONS.map((item) => (
                      <Option key={item.value} value={item.value}>
                        {item.label}
                      </Option>
                    ))}
                  </Select>
                </Item>
              </OverallSituationSearch>
            }
            actions={
              <Button
                onClick={() => {
                  void store.markAllRead().then((ok) => {
                    toastActionResult(ok, "已全部标记为已读", "操作失败");
                  });
                }}
              >
                全部已读
              </Button>
            }
          />
        </Content.Header>
        <Content.Main>
          <MorTable
            bordered
            pagination={false}
            dataSource={store.page.records}
            columns={columns}
            rowKey={(record) => record.id}
            loading={store.loading}
          />
        </Content.Main>
      </Content.Layout>
      <Content.Footer>
        <div
          style={{
            height: "49px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 12px",
            boxSizing: "border-box",
          }}
        >
          <div></div>
          <Pagination
            showTotal={(total) => `共有 ${total} 条`}
            showSizeChanger={true}
            showQuickJumper={true}
            onChange={handleChange}
            onShowSizeChange={handlePageSize}
            total={store.page.total}
            current={uiCurrent}
            pageSize={Number(store.params.size || store.page.size)}
          />
        </div>
      </Content.Footer>
    </Content>
  );
};

export default observer(NotificationMain);
