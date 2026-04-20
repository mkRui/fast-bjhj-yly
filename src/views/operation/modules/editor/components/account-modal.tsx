import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { Form, Input, Modal } from "antd";
import { ModalProps } from "antd/lib/modal";
import SelectChannel from "@/micro/select-editor-channel";

import { API } from "../types/api";

const Item = Form.Item;

export interface NoticeModalComponentType {
  onCancel: ModalProps["onCancel"];
  onOk: (params: any) => void;
  info?: API.Account.Data;
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
              message: "请输入姓名",
            },
          ]}
          name="nickname"
          label="昵称"
        >
          <Input placeholder="请输入昵称"></Input>
        </Item>
        {!!info && (
          <Item
            rules={[
              {
                required: true,
                message: "请输入账号",
              },
            ]}
            name="account"
            label="账号"
          >
            <Input placeholder="请输入账号"></Input>
          </Item>
        )}
        <Item name="phone" label="手机号码">
          <Input placeholder="请输入手机号码"></Input>
        </Item>
        <Item name="email" label="电子邮箱">
          <Input placeholder="请输入电子邮箱"></Input>
        </Item>
        <Item name="description" label="描述">
          <Input.TextArea placeholder="请输入描述"></Input.TextArea>
        </Item>
        <Item name="channelList">
          <SelectChannel placeholder="请选择频道" />
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(NoticeModal);
