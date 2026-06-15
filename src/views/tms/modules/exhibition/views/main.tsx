import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Pagination, Spin } from "antd";

import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import MorTable from "@/components/table";
import Button from "@/components/button";
import RunComponents from "@/components/run-component";

import StoreContext from "../store";
import { API } from "../types/api";
import AttachmentModal from "../components/attachment-modal";

const ExhibitionMain: FC = () => {
  const store = useContext(StoreContext);

  useEffect(() => {
    const init = async (): Promise<void> => {
      await store.fetchTeacherMap();
      await store.fetchPage();
    };
    void init();
  }, [store]);

  const uiCurrent = Math.max(1, Number(store.params.current || "0") + 1);

  const openAttachmentModal = (record: API.Page.RecordItem): void => {
    const modal = new RunComponents({
      render: () => (
        <AttachmentModal
          exhibitionId={record.id}
          exhibitionName={record.name}
          fetchAttachments={store.fetchAttachmentList.bind(store)}
          onCancel={() => modal.unmount()}
        />
      ),
    });
  };

  const columns = [
    { title: "展会名称", dataIndex: "name" },
    {
      title: "教师",
      dataIndex: "teacherId",
      width: 140,
      render: (teacherId: string) => store.teacherMap[teacherId] || teacherId || "-",
    },
    { title: "年份", dataIndex: "year", width: 100 },
    { title: "月份", dataIndex: "month", width: 100 },
    { title: "日期", dataIndex: "date", width: 140 },
    { title: "地点", dataIndex: "location" },
    {
      title: "操作",
      width: 120,
      fixed: "right" as const,
      render: (_: unknown, record: API.Page.RecordItem) => (
        <Button type="link" onClick={() => openAttachmentModal(record)}>
          查看附件
        </Button>
      ),
    },
  ];

  const handleChange = (current: number): void => {
    store.$setParams({ current: String(Math.max(0, current - 1)) });
    void store.fetchPage();
  };

  const handlePageSize = (current: number, size: number): void => {
    store.$setParams({
      current: String(Math.max(0, current - 1)),
      size: String(size),
    });
    void store.fetchPage();
  };

  return (
    <Content style={{ flex: 1 }}>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle>展会信息</HeaderTitle>
        </Content.Header>
        <Content.Main>
          <Spin spinning={store.loading}>
            <MorTable
              bordered
              pagination={false}
              dataSource={store.page.records || []}
              columns={columns as any}
              rowKey={(record: API.Page.RecordItem) => record.id}
              loading={store.loading}
              auto
            />
          </Spin>
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
            total={store.page.total || 0}
            current={uiCurrent}
          />
        </div>
      </Content.Footer>
    </Content>
  );
};

export default observer(ExhibitionMain);
