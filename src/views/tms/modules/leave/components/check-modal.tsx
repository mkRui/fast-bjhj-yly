import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { Form, Input, Modal, Switch } from "antd";
import type { ModalProps } from "antd/lib/modal";

import { API } from "../types/api";

const Item = Form.Item;

export interface CheckLeaveModalProps {
  title: string;
  loading?: boolean;
  init: Pick<API.Check.Params, "id"> & Partial<API.Check.Params>;
  onCancel: ModalProps["onCancel"];
  onOk: (params: API.Check.Params) => void | Promise<void>;
}

const CheckLeaveModal: FC<CheckLeaveModalProps> = (props) => {
  const { title, loading, init, onCancel, onOk } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      id: init.id,
      checkedFlag: typeof init.checkedFlag === "boolean" ? init.checkedFlag : true,
      checkedComment: init.checkedComment || "",
    });
  }, [form, init]);

  const handleOk = (): void => {
    void form.validateFields().then(async (values: any) => {
      await onOk({
        id: Number(values.id || 0),
        checkedFlag: !!values.checkedFlag,
        checkedComment: String(values.checkedComment || ""),
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
        <Item name="id" hidden>
          <Input />
        </Item>
        <Item label="审核结果" name="checkedFlag" valuePropName="checked">
          <Switch checkedChildren="通过" unCheckedChildren="驳回" />
        </Item>
        <Item label="审核意见" name="checkedComment">
          <Input.TextArea rows={4} placeholder="请输入审核意见" />
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(CheckLeaveModal);
