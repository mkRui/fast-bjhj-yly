import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { Form, Input, Modal } from "antd";
import { ModalProps } from "antd/lib/modal";

import { API } from "../types/api";

const Item = Form.Item;

export interface NoticeModalComponentType {
  onCancel: ModalProps["onCancel"];
  onOk: (params: any) => void;
  info?: API.List.Data;
  title: string;
}

const NoticeModal: FC<NoticeModalComponentType> = (props) => {
  const { onCancel, info, onOk, title } = props;

  const [form] = Form.useForm();

  const handleOk = (): void => {
    void form.validateFields().then(async (data: any) => {
      onOk({
        ...data,
        enableFlag: data.enableFlag ?? true,
        lockFlag: data.lockFlag ?? false,
      });
    });
  };

  useEffect(() => {
    if (info?.id) {
      form.setFieldsValue({
        ...info,
        code: info.selfCode
      });
    }
  }, [info]);

  return (
    <Modal title={title} visible={true} onCancel={onCancel} onOk={handleOk}>
      <Form form={form} layout="vertical">
        <Item
          rules={[
            {
              required: true,
              message: "请输入资源名称",
            },
          ]}
          name="name"
          label="资源名称"
        >
          <Input placeholder="请输入资源名称"></Input>
        </Item>
        <Item
          rules={[
            {
              required: true,
              message: "请输入资源代码",
            },
          ]}
          name="code"
          label="资源代码"
        >
          <Input placeholder="请输入资源代码"></Input>
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(NoticeModal);
