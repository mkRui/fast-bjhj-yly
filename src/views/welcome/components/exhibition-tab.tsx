import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { Space } from "antd";

import axios from "@/api";
import Button from "@/components/button";
import PageToolbar from "@/components/page-toolbar";
import MorTable from "@/components/table";
import RunComponents from "@/components/run-component";
import { toastRequestResult } from "@/utils/common/mutation-success";

import { Api } from "../api";
import { API } from "../types/api";
import ExhibitionFormModal from "./exhibition-form-modal";
import ExhibitionAttachmentModal from "./exhibition-attachment-modal";
import { useRegisterUserPageToolbar } from "../pages/user-page-layout";
import UserTablePanel from "./user-table-panel";

const ExhibitionTab: FC = () => {
  const api = useMemo(() => new Api(axios), []);

  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<API.ExhibitionPage.Params>({
    current: 0,
    size: 10,
  });
  const [data, setData] = useState<API.ExhibitionPage.Data>({
    size: 10,
    pages: 0,
    total: 0,
    records: [],
    current: 0,
  });

  const uiCurrent = Math.max(1, Number(params.current || 0) + 1);

  const load = async (next?: Partial<API.ExhibitionPage.Params>): Promise<void> => {
    const merged: API.ExhibitionPage.Params = { ...params, ...(next || {}) };
    setLoading(true);
    const [err, res] = await api.getExhibitionPage(merged);
    setLoading(false);
    if (err) return;
    setParams(merged);
    setData(res);
  };

  useEffect(() => {
    void load({ current: 0 });
  }, []);

  const openAddModal = (): void => {
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <ExhibitionFormModal
          {...state}
          title="新增展会"
          showAttachments
          init={{ date: "", name: "", location: "", distList: [] }}
          onCancel={() => modal.unmount()}
          onOk={async (values) => {
            modal.setState({ loading: true });
            const [err] = await api.addExhibition(values);
            modal.setState({ loading: false });
            if (toastRequestResult(err, "新增成功", "新增失败")) {
              modal.unmount();
              await load({ current: 0 });
            }
          }}
        />
      ),
    });
  };

  const openEditModal = (record: API.ExhibitionPage.RecordItem): void => {
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <ExhibitionFormModal
          {...state}
          title="修改展会"
          init={{
            date: record.date,
            name: record.name,
            location: record.location,
          }}
          onCancel={() => modal.unmount()}
          onOk={async (values) => {
            modal.setState({ loading: true });
            const [err] = await api.editExhibition({
              id: record.id,
              ...values,
            });
            modal.setState({ loading: false });
            if (toastRequestResult(err, "修改成功", "修改失败")) {
              modal.unmount();
              await load();
            }
          }}
        />
      ),
    });
  };

  const openAttachmentModal = (record: API.ExhibitionPage.RecordItem): void => {
    const modal = new RunComponents({
      render: () => (
        <ExhibitionAttachmentModal
          exhibitionId={record.id}
          exhibitionName={record.name}
          fetchAttachments={async (exhibitionId) => {
            const [err, list] = await api.getExhibitionAttachmentList({ exhibitionId });
            if (err) return [];
            return list || [];
          }}
          addAttachment={async (p) => {
            const [err] = await api.addExhibitionAttachment(p);
            return !err;
          }}
          delAttachment={async (id) => {
            const [err] = await api.delExhibitionAttachment({ id });
            return !err;
          }}
          onCancel={() => modal.unmount()}
        />
      ),
    });
  };

  const columns = [
    { title: "展会名称", dataIndex: "name" },
    { title: "日期", dataIndex: "date", width: 140 },
    { title: "年份", dataIndex: "year", width: 100 },
    { title: "月份", dataIndex: "month", width: 100 },
    { title: "地点", dataIndex: "location" },
    {
      title: "操作",
      width: 220,
      fixed: "right" as const,
      render: (_: unknown, record: API.ExhibitionPage.RecordItem) => (
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
              const [err] = await api.delExhibition({ id: record.id });
              if (toastRequestResult(err, "删除成功", "删除失败")) {
                await load();
              }
            }}
          >
            删除
          </Button>
        </Button.Group>
      ),
    },
  ];

  const toolbar = useMemo(
    () => (
      <PageToolbar
        actions={
          <Space>
            <Button type="primary" action="add" onClick={openAddModal}>
              新增展会
            </Button>
            <Button action="reset" onClick={() => void load({ current: 0 })}>
              刷新
            </Button>
          </Space>
        }
      />
    ),
    []
  );

  useRegisterUserPageToolbar(toolbar);

  return (
    <UserTablePanel
      loading={loading}
      title="我的展会"
      pagination={{
        current: uiCurrent,
        pageSize: params.size,
        total: data.total || 0,
        onChange: (current, pageSize) => {
          void load({
            current: Math.max(0, current - 1),
            size: pageSize,
          });
        },
      }}
    >
      <MorTable
        auto
        rowKey="id"
        columns={columns as any}
        dataSource={data.records || []}
        pagination={false}
      />
    </UserTablePanel>
  );
};

export default observer(ExhibitionTab);
