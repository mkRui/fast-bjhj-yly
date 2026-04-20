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
      onOk(data);
    });
  };

  useEffect(() => {
    if (info?.id) {
      form.setFieldsValue({
        ...info,
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
              message: "请输入名称",
            },
          ]}
          name="name"
          label="名称"
        >
          <Input placeholder="请输入名称"></Input>
        </Item>
        <Item
          rules={[
            {
              required: true,
              message: "请输入值",
            },
          ]}
          name="value"
          label="值"
        >
          <Input placeholder="请输入值"></Input>
        </Item>
        <Item name="attr1" label="附加参数1">
          <Input placeholder="请输入附加参数1"></Input>
        </Item>
        <Item name="attr2" label="附加参数2">
          <Input placeholder="请输入附加参数2"></Input>
        </Item>
        <Item name="attr3" label="附加参数3">
          <Input placeholder="请输入附加参数3"></Input>
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(NoticeModal);
