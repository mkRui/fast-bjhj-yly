import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { Form, Input, Modal, Switch } from "antd";
import { ModalProps } from "antd/lib/modal";

import { API } from "../types/api";

const Item = Form.Item;

export interface NoticeModalComponentType {
  onCancel: ModalProps["onCancel"];
  onOk: (params: any) => void;
  info?: API.List.Data;
  title: string;
}

const FormModal: FC<NoticeModalComponentType> = (props) => {
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
      });
    }
  }, [info]);

  return (
    <Modal title={title} open={true} onCancel={onCancel} onOk={handleOk}>
      <Form form={form} layout="vertical">
        <Item name="name" label="角色名称">
          <Input placeholder="请输入角色名称"></Input>
        </Item>
        <Item name="code" label="角色代码">
          <Input placeholder="请输入角色代码"></Input>
        </Item>
        <Item name="defaultFlag" label="默认角色">
          <Switch></Switch>
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(FormModal);
