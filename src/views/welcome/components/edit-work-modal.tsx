import { FC } from "react";
import { observer } from "mobx-react";
import { Form, Input, InputNumber, Modal } from "antd";
import type { ModalProps } from "antd/lib/modal";

import { useFormInitialValues } from "@/hooks/use-form-initial-values";
import { API } from "../types/api";

const Item = Form.Item;

export interface EditWorkModalProps {
  title: string;
  loading?: boolean;
  init?: Partial<API.WorkEdit.Params>;
  onCancel: ModalProps["onCancel"];
  onOk: (params: API.WorkEdit.Params) => void | Promise<void>;
}

const EditWorkModal: FC<EditWorkModalProps> = (props) => {
  const { title, loading, init, onCancel, onOk } = props;
  const [form] = Form.useForm();

  useFormInitialValues(form, init as Record<string, unknown> | undefined);

  const handleOk = (): void => {
    void form.validateFields().then(async (values: Record<string, unknown>) => {
      await onOk({
        id: String(init?.id || ""),
        num: Number(values.num || 0),
        remark: String(values.remark || ""),
      });
    });
  };

  return (
    <Modal
      title={title}
      open={true}
      onCancel={onCancel}
      onOk={handleOk}
      okText="保存"
      cancelText="取消"
      confirmLoading={loading}
      width={480}
    >
      <Form form={form} layout="vertical">
        <Item
          label="时数数量"
          name="num"
          rules={[{ required: true, message: "请输入时数数量" }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} placeholder="请输入时数数量" />
        </Item>
        <Item label="备注" name="remark">
          <Input.TextArea placeholder="请输入备注" maxLength={200} showCount rows={3} />
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(EditWorkModal);
