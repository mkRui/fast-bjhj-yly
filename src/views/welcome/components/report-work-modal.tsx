import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { Form, Input, InputNumber, Modal } from "antd";
import type { ModalProps } from "antd/lib/modal";

import SelectEnum from "@/micro/select-enum";
import { API } from "../types/api";

const Item = Form.Item;

export interface ReportWorkModalProps {
  title: string;
  loading?: boolean;
  init?: Partial<API.SubmitWork.Params>;
  onCancel: ModalProps["onCancel"];
  onOk: (params: API.SubmitWork.Params) => void | Promise<void>;
}

const ReportWorkModal: FC<ReportWorkModalProps> = (props) => {
  const { title, loading, init, onCancel, onOk } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (init) {
      form.setFieldsValue(init);
    }
  }, [init, form]);

  const handleOk = (): void => {
    void form.validateFields().then(async (values: any) => {
      await onOk({
        date: String(values.date || ""),
        year: Number(values.year || 0),
        month: Number(values.month || 0),
        subject: Number(values.subject || 0),
        num: Number(values.num || 0),
      });
    });
  };

  return (
    <Modal
      title={title}
      open={true}
      onCancel={onCancel}
      onOk={handleOk}
      okText="提交"
      cancelText="取消"
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Item
          label="上报日期"
          name="date"
          rules={[{ required: true, message: "请输入上报日期" }]}
        >
          <Input placeholder="例如：2026-04-21" />
        </Item>
        <Item
          label="年份"
          name="year"
          rules={[{ required: true, message: "请输入年份" }]}
        >
          <InputNumber style={{ width: "100%" }} min={2000} max={2100} />
        </Item>
        <Item
          label="月份"
          name="month"
          rules={[{ required: true, message: "请输入月份" }]}
        >
          <InputNumber style={{ width: "100%" }} min={1} max={12} />
        </Item>
        <Item
          label="上报科目"
          name="subject"
          rules={[{ required: true, message: "请选择上报科目" }]}
        >
          <SelectEnum
            name="TEACHER_WORK_SUBJECT"
            placeholder="请选择上报科目"
            allowClear
            handleInitChange={(code) => {
              form.setFieldValue("subject", code);
            }}
          />
        </Item>
        <Item
          label="数量"
          name="num"
          rules={[{ required: true, message: "请输入数量" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(ReportWorkModal);

