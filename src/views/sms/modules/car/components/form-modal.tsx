import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { Form, Input, InputNumber, Modal } from "antd";
import { ModalProps } from "antd/lib/modal";

import { API } from "../types/api";

const Item = Form.Item;

export interface CarFormModalProps {
  onCancel: ModalProps["onCancel"];
  onOk: (params: API.Add.Params | API.Edit.Params) => void | Promise<void>;
  info?: API.List.Data;
  title: string;
  loading?: boolean;
}

const CarFormModal: FC<CarFormModalProps> = (props) => {
  const { onCancel, info, onOk, title, loading } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      id: info?.id,
      name: info?.name || "",
      minPassengerNum: info?.minPassengerNum ?? 1,
      maxPassengerNum: info?.maxPassengerNum ?? 1,
    });
  }, [form, info]);

  const handleOk = (): void => {
    void form.validateFields().then(async (values: any) => {
      const id = String(values.id || "");
      const name = String(values.name || "").trim();
      const minPassengerNum = Number(values.minPassengerNum || 0);
      const maxPassengerNum = Number(values.maxPassengerNum || 0);

      if (id) {
        await onOk({
          id,
          name,
          minPassengerNum,
          maxPassengerNum,
        } as API.Edit.Params);
      } else {
        await onOk({
          name,
          minPassengerNum,
          maxPassengerNum,
        } as API.Add.Params);
      }
    });
  };

  return (
    <Modal
      title={title}
      visible={true}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
      okText="保存"
      cancelText="取消"
      width={520}
    >
      <Form form={form} layout="vertical">
        <Item name="id" hidden>
          <Input />
        </Item>
        <Item label="车型名称" name="name" rules={[{ required: true, message: "请输入车型名称" }]}>
          <Input placeholder="请输入车型名称" />
        </Item>
        <Item
          label="最小乘车人数"
          name="minPassengerNum"
          rules={[{ required: true, message: "请输入最小乘车人数" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Item>
        <Item
          label="最大乘车人数"
          name="maxPassengerNum"
          rules={[{ required: true, message: "请输入最大乘车人数" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(CarFormModal);

