import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { Form, Input, Modal, Pagination, Radio } from "antd";
import type { ModalProps } from "antd/lib/modal";

import axios from "@/api";
import MorTable from "@/components/table";
import Button from "@/components/button";
import { toast } from "@/components/message";
import { Api } from "../api";
import { API } from "../types/api";

const Item = Form.Item;

interface CheckModalState {
  open: boolean;
  applyId: string;
}

export interface CarApplyAuditModalProps {
  carId: string;
  carName?: string;
  onCancel: ModalProps["onCancel"];
}

const CarApplyAuditModal: FC<CarApplyAuditModalProps> = (props) => {
  const { carId, carName, onCancel } = props;
  const api = useMemo(() => new Api(axios), []);

  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<API.ApplyPage.Params>({ current: 1, size: 10, carId });
  const [data, setData] = useState<API.ApplyPage.Data>({
    size: 10,
    pages: 0,
    total: 0,
    records: [],
    current: 1,
  });

  const [checkModal, setCheckModal] = useState<CheckModalState>({ open: false, applyId: "" });
  const [checkLoading, setCheckLoading] = useState(false);
  const [checkForm] = Form.useForm();

  const load = async (next?: Partial<API.ApplyPage.Params>) => {
    const merged: API.ApplyPage.Params = { ...params, ...(next || {}), carId };
    setLoading(true);
    const [err, res] = await api.getApplyPage(merged);
    setLoading(false);
    if (err) return;
    setParams(merged);
    setData(res);
  };

  useEffect(() => {
    void load({ current: 1, size: 10 });
  }, [carId]);

  const isChecked = (val: any) => typeof val === "boolean";

  const openCheck = (record: API.ApplyPage.RecordItem) => {
    checkForm.resetFields();
    checkForm.setFieldsValue({ checkedFlag: true, comment: "" });
    setCheckModal({ open: true, applyId: String(record.id || "") });
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
      await load();
    });
  };

  const columns = [
    { title: "申请时间", dataIndex: "applyTime", width: 180 },
    { title: "申请人", dataIndex: "applyUserName", width: 140 },
    { title: "用途", dataIndex: "purpose", width: 140 },
    { title: "用车事由", dataIndex: "reason", width: 220 },
    { title: "用车时间", dataIndex: "rentalTime", width: 180 },
    { title: "起始地", dataIndex: "origin", width: 160 },
    { title: "目的地", dataIndex: "destination", width: 160 },
    { title: "乘车人数", dataIndex: "passengerNum", width: 120 },
    { title: "车次", dataIndex: "num", width: 100 },
    { title: "金额", dataIndex: "amountPrice", width: 120 },
    {
      title: "审核状态",
      width: 120,
      render: (_: any, record: API.ApplyPage.RecordItem) => {
        if (!isChecked(record.checkedFlag)) return "未审核";
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
            onClick={() => openCheck(record)}
          >
            审核
          </Button>
        </Button.Group>
      ),
    },
  ];

  return (
    <>
      <Modal
        title={`用车申请审核：${carName || carId}`}
        visible={true}
        onCancel={onCancel}
        footer={null}
        width={"100vw" as any}
        style={{ top: 0, paddingBottom: 0, maxWidth: "100vw" }}
        bodyStyle={{ height: "calc(100vh - 110px)", overflow: "auto" }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <Button type="primary" onClick={() => void load({ current: 1 })}>
            刷新
          </Button>
        </div>
        <div style={{ height: "calc(100vh - 240px)" }}>
          <MorTable
            bordered
            pagination={false}
            dataSource={data.records}
            columns={columns as any}
            rowKey={(record: any) => record.id}
            loading={loading}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
          <Pagination
            showTotal={(total) => `共有 ${total} 条`}
            showSizeChanger={true}
            showQuickJumper={true}
            total={data.total}
            current={data.current}
            onChange={(page) => void load({ current: page })}
            onShowSizeChange={(_c, size) => void load({ current: 1, size })}
          />
        </div>
      </Modal>

      <Modal
        title="用车申请审核"
        visible={checkModal.open}
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
          <Item label="审核意见" name="comment" rules={[{ required: true, message: "请输入审核意见" }]}>
            <Input.TextArea rows={3} placeholder="请输入审核意见" />
          </Item>
        </Form>
      </Modal>
    </>
  );
};

export default observer(CarApplyAuditModal);

