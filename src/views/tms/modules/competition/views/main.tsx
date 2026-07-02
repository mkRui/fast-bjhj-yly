import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Pagination } from "antd";

import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import MorTable, { TablePageMain } from "@/components/table";
import Button from "@/components/button";
import RunComponents from "@/components/run-component";
import { toastActionResult } from "@/utils/common/mutation-success";

import StoreContext from "../store";
import { API } from "../types/api";
import CompetitionFormModal from "../components/form-modal";
import CompetitionAttachmentModal from "../components/attachment-modal";

const CompetitionMain: FC = () => {
  const store = useContext(StoreContext);

  useEffect(() => {
    void store.fetchPage();
  }, [store]);

  const uiCurrent = Math.max(1, Number(store.params.current || "0") + 1);

  const openAddModal = (): void => {
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <CompetitionFormModal
          {...state}
          title="新增竞赛"
          showAttachments
          searchTeachers={store.searchTeachers.bind(store)}
          init={{
            date: "",
            name: "",
            location: "",
            teacherList: [],
            studentList: [],
            distList: [],
          }}
          onCancel={() => modal.unmount()}
          onOk={async (values) => {
            modal.setState({ loading: true });
            const ok = await store.addCompetition(values);
            modal.setState({ loading: false });
            if (toastActionResult(ok, "新增成功", "新增失败")) {
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const openEditModal = (record: API.Page.RecordItem): void => {
    void Promise.all([
      store.fetchCompetitionTeachers(record.id),
      store.fetchCompetitionStudents(record.id),
    ]).then(([teacherList, studentList]) => {
      const modal = new RunComponents({
        state: { loading: false },
        render: (state) => (
          <CompetitionFormModal
            {...state}
            title="编辑竞赛"
            presetTeachers={teacherList}
            searchTeachers={store.searchTeachers.bind(store)}
            init={{
              date: record.date,
              name: record.name,
              location: record.location,
              teacherList: teacherList.map((item) => String(item.id)),
              studentList,
            }}
            onCancel={() => modal.unmount()}
            onOk={async (values) => {
              modal.setState({ loading: true });
              const ok = await store.editCompetition({
                id: record.id,
                ...values,
              });
              modal.setState({ loading: false });
              if (toastActionResult(ok, "修改成功", "修改失败")) {
                modal.unmount();
              }
            }}
          />
        ),
      });
    });
  };

  const openAttachmentModal = (record: API.Page.RecordItem): void => {
    const modal = new RunComponents({
      render: () => (
        <CompetitionAttachmentModal
          competitionId={record.id}
          competitionName={record.name}
          fetchAttachments={store.fetchAttachmentList.bind(store)}
          addAttachment={store.addAttachment.bind(store)}
          delAttachment={store.delAttachment.bind(store)}
          onCancel={() => modal.unmount()}
        />
      ),
    });
  };

  const columns = [
    { title: "竞赛名称", dataIndex: "name" },
    { title: "日期", dataIndex: "date", width: 140 },
    { title: "年份", dataIndex: "year", width: 100 },
    { title: "月份", dataIndex: "month", width: 100 },
    { title: "地点", dataIndex: "location" },
    {
      title: "操作",
      width: 240,
      fixed: "right" as const,
      render: (_: unknown, record: API.Page.RecordItem) => (
        <Button.Group>
          <Button type="link" onClick={() => openAttachmentModal(record)}>
            查看附件
          </Button>
          <Button type="link" linkType="warning" onClick={() => openEditModal(record)}>
            编辑
          </Button>
          <Button
            type="link"
            linkType="danger"
            action="del"
            onConfirm={async () => {
              const ok = await store.delCompetition({ id: record.id });
              toastActionResult(ok, "删除成功", "删除失败");
            }}
          >
            删除
          </Button>
        </Button.Group>
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
          <HeaderTitle
            insert={
              <Button type="primary" action="add" onClick={openAddModal}>
                新增竞赛
              </Button>
            }
          >
            竞赛管理
          </HeaderTitle>
        </Content.Header>
        <TablePageMain loading={store.loading}>
          <MorTable
            bordered
            pagination={false}
            dataSource={store.page.records || []}
            columns={columns as any}
            rowKey={(record: API.Page.RecordItem) => record.id}
            loading={store.loading}
            auto
          />
        </TablePageMain>
        <Content.Footer>
          <div
            style={{
              height: "49px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "0px 12px",
              boxSizing: "border-box",
            }}
          >
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
      </Content.Layout>
    </Content>
  );
};

export default observer(CompetitionMain);
