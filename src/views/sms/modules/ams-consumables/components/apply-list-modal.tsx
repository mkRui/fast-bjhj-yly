import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { Form, Input, Modal, Pagination, Radio } from "antd";
import type { ModalProps } from "antd/lib/modal";

import axios from "@/api";
import Button from "@/components/button";
import MorTable from "@/components/table";
import { toast } from "@/components/message";
import { Api } from "../api";
import { API } from "../types/api";

const Item = Form.Item;

export interface ConsumablesApplyListModalProps {
  title: string;
  consumablesId: string;
  onCancel: ModalProps["onCancel"];
}

interface CheckModalState {
  open: boolean;
  applyId: string;
}

const ConsumablesApplyListModal: FC<ConsumablesApplyListModalProps> = (props) => {
  const { title, consumablesId, onCancel } = props;
  const api = useMemo(() => new Api(axios), []);

  const [params, setParams] = useState<API.ApplyPage.Params>({ consumablesId, current: 1, size: 10 });
  const [data, setData] = useState<API.ApplyPage.Data>({ size: 10, pages: 0, total: 0, records: [], current: 1 });
  const [loading, setLoading] = useState(false);

  const [checkForm] = Form.useForm();
  const [checkModal, setCheckModal] = useState<CheckModalState>({ open: false, applyId: "" });
  const [checkLoading, setCheckLoading] = useState(false);

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

  const openCheck = (applyId: string) => {
    checkForm.resetFields();
    checkForm.setFieldsValue({ checkedFlag: true, comment: "" });
    setCheckModal({ open: true, applyId: String(applyId || "") });
  };

  const submitCheck = async () => {
    void checkForm.validateFields().then(async (values: any) => {
      const applyId = String(checkModal.applyId || "");
      if (!applyId) return;
      const checkedFlag = Boolean(values.checkedFlag);
      const comment = String(values.comment || "");

      setCheckLoading(true);
      const [err] = await api.applyCheck({ applyId, checkedFlag, comment });
      setCheckLoading(false);
      if (err) return;
      toast("success", "审核成功");
      setCheckModal({ open: false, applyId: "" });
      await loadList();
    });
  };

  const isChecked = (val: any) => typeof val === "boolean";

  const columns = [
    { title: "申请时间", dataIndex: "applyTime", width: 180 },
    { title: "申请人", dataIndex: "applyUserName", width: 140 },
    { title: "申请原因", dataIndex: "applyReason" },
    {
      title: "审核结果",
      width: 140,
      render: (_: any, record: API.ApplyPage.RecordItem) => {
        if (!isChecked(record.checkedFlag)) return "-";
        return record.checkedFlag ? "通过" : "不通过";
      },
    },
    { title: "审核意见", dataIndex: "checkedComment", width: 200 },
    {
      title: "操作",
      width: 140,
      fixed: "right" as const,
      render: (_: any, record: API.ApplyPage.RecordItem) => (
        <Button.Group>
          <Button
            type="link"
            linkType="warning"
            disabled={isChecked(record.checkedFlag)}
            onClick={() => openCheck(record.id)}
          >
            审核
          </Button>
        </Button.Group>
      ),
    },
  ];

  return (
    <>
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

      <Modal
        title="易耗品审核"
        open={checkModal.open}
        onCancel={() => setCheckModal((s) => ({ ...s, open: false }))}
        onOk={submitCheck}
        confirmLoading={checkLoading}
        okText="提交"
        cancelText="取消"
        width={520}
      >
        <Form form={checkForm} layout="vertical">
          <Item label="审核结果" name="checkedFlag" rules={[{ required: true, message: "请选择审核结果" }]}>
            <Radio.Group
              options={[
                { label: "通过", value: true },
                { label: "不通过", value: false },
              ]}
            />
          </Item>
          <Item label="审核意见" name="comment">
            <Input.TextArea rows={3} placeholder="请输入审核意见" />
          </Item>
        </Form>
      </Modal>
    </>
  );
};

export default observer(ConsumablesApplyListModal);

