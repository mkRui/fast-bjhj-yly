import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { Modal, Pagination } from "antd";
import type { ModalProps } from "antd/lib/modal";

import axios from "@/api";
import Button from "@/components/button";
import CheckStatusTag from "@/components/check-status-tag";
import MorTable from "@/components/table";
import { Api } from "../api";
import { API } from "../types/api";

export interface ConsumablesApplyListModalProps {
  title: string;
  consumablesId: string;
  onCancel: ModalProps["onCancel"];
}

const ConsumablesApplyListModal: FC<ConsumablesApplyListModalProps> = (props) => {
  const { title, consumablesId, onCancel } = props;
  const api = useMemo(() => new Api(axios), []);

  const [params, setParams] = useState<API.ApplyPage.Params>({ consumablesId, current: 1, size: 10 });
  const [data, setData] = useState<API.ApplyPage.Data>({ size: 10, pages: 0, total: 0, records: [], current: 1 });
  const [loading, setLoading] = useState(false);

  const loadList = async (next?: Partial<API.ApplyPage.Params>) => {
    const merged = { ...params, ...(next || {}) };
    setLoading(true);
    const [err, res] = await api.getApplyPage(merged);
    setLoading(false);
    if (err) return;
    setParams(merged);
    setData(res);
  };

  useEffect(() => {
    void loadList({ consumablesId, current: 1 });
  }, [consumablesId]);

  const columns = [
    { title: "审核意见", dataIndex: "checkedComment", width: 200 },
    {
      title: "审核状态",
      width: 120,
      render: (_: any, record: API.ApplyPage.RecordItem) => (
        <CheckStatusTag checkedFlag={record.checkedFlag} />
      ),
    },
    { title: "申请时间", dataIndex: "applyTime", width: 180 },
    { title: "申请人", dataIndex: "applyUserName", width: 140 },
    { title: "申请原因", dataIndex: "applyReason" },
  ];

  return (
    <Modal title={title} open={true} onCancel={onCancel} footer={null} width={1100}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary" onClick={() => void loadList({ current: 1 })}>
            刷新
          </Button>
        </div>
        <div style={{ height: 520 }}>
          <MorTable
            bordered
            pagination={false}
            dataSource={data.records}
            columns={columns as any}
            rowKey={(record: any) => record.id}
            loading={loading}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Pagination
            showTotal={(total) => `共有 ${total} 条`}
            showSizeChanger={true}
            showQuickJumper={true}
            total={data.total}
            current={data.current}
            onChange={(page) => void loadList({ current: page })}
            onShowSizeChange={(_c, size) => void loadList({ current: 1, size })}
          />
        </div>
      </div>
    </Modal>
  );
};

export default observer(ConsumablesApplyListModal);
