import { FC } from "react";
import { observer } from "mobx-react";
import { Form, Input, Modal } from "antd";
import type { ModalProps } from "antd/lib/modal";

import { API } from "../types/api";

const Item = Form.Item;

export interface AddModalProps {
  title: string;
  loading?: boolean;
  onCancel: ModalProps["onCancel"];
  onOk: (params: API.Add.Params) => void | Promise<void>;
}

const AddModal: FC<AddModalProps> = (props) => {
  const { title, loading, onCancel, onOk } = props;
  const [form] = Form.useForm();

  const handleOk = (): void => {
    void form.validateFields().then(async (values: any) => {
      await onOk({
        name: String(values.name || ""),
      });
    });
  };

  return (
    <Modal
      title={title}
      open={true}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
      okText="保存"
      cancelText="取消"
    >
      <Form form={form} layout="vertical">
        <Item
          name="name"
          label="周期名称"
          rules={[{ required: true, message: "请输入周期名称" }]}
        >
          <Input placeholder="请输入周期名称" />
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(AddModal);

