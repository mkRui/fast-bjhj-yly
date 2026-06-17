import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { Form, Input, Modal, Radio } from "antd";
import type { ModalProps } from "antd/lib/modal";

const Item = Form.Item;

export interface ConsumablesCheckModalProps {
  title: string;
  loading?: boolean;
  applyId: string;
  onCancel: ModalProps["onCancel"];
  onOk: (params: {
    applyId: string;
    checkedFlag: boolean;
    comment: string;
  }) => void | Promise<void>;
}

const ConsumablesCheckModal: FC<ConsumablesCheckModalProps> = (props) => {
  const { title, loading, applyId, onCancel, onOk } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      applyId,
      checkedFlag: true,
      comment: "",
    });
  }, [applyId, form]);

  const handleOk = (): void => {
    void form.validateFields().then(async (values) => {
      await onOk({
        applyId: String(values.applyId),
        checkedFlag: Boolean(values.checkedFlag),
        comment: String(values.comment || ""),
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
      width={520}
    >
      <Form form={form} layout="vertical">
        <Item name="applyId" hidden>
          <Input />
        </Item>
        <Item
          label="审核结果"
          name="checkedFlag"
          rules={[{ required: true, message: "请选择审核结果" }]}
        >
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
  );
};

export default observer(ConsumablesCheckModal);
