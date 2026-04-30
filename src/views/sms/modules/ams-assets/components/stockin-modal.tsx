import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { Form, Input, InputNumber, Modal } from "antd";
import type { ModalProps } from "antd/lib/modal";

import { API } from "../types/api";

const Item = Form.Item;

export interface StockInModalProps {
  title: string;
  loading?: boolean;
  init: { assetsId: string };
  onCancel: ModalProps["onCancel"];
  onOk: (params: API.StockIn.Params) => void | Promise<void>;
}

const StockInModal: FC<StockInModalProps> = (props) => {
  const { title, loading, init, onCancel, onOk } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ assetsId: init.assetsId, num: 1 });
  }, [form, init.assetsId]);

  const handleOk = (): void => {
    void form.validateFields().then(async (values: any) => {
      await onOk({
        assetsId: String(values.assetsId || ""),
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
      confirmLoading={loading}
      okText="提交"
      cancelText="取消"
      width={520}
    >
      <Form form={form} layout="vertical">
        <Item name="assetsId" hidden>
          <Input />
        </Item>
        <Item label="数量" name="num" rules={[{ required: true, message: "请输入数量" }]}>
          <InputNumber style={{ width: "100%" }} min={1} />
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(StockInModal);

