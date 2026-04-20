import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { Form, Input, Modal, Switch } from "antd";
import { ModalProps } from "antd/lib/modal";
import SelectRole from "@/micro/select-role";

import { API } from "../types/api";

const Item = Form.Item;

export interface NoticeModalComponentType {
  onCancel: ModalProps["onCancel"];
  onOk: (params: any) => void;
  info?: API.Account.Records;
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
        <Item name="phone" label="手机号码">
          <Input placeholder="请输入手机号码"></Input>
        </Item>
        <Item name="email" label="电子邮箱">
          <Input placeholder="请输入电子邮箱"></Input>
        </Item>
        <Item name="avatar" label="头像地址">
          <Input placeholder="请输入头像地址"></Input>
        </Item>
        <Item name="enableFlag" label="是否启用">
          <Switch defaultChecked={info?.enableFlag ?? true}></Switch>
        </Item>
        <Item name="lockFlag" label="是否锁定">
          <Switch defaultChecked={info?.lockFlag ?? false}></Switch>
        </Item>
        <Item
          name="roleList"
          rules={[
            {
              required: true,
              message: "请选择角色列表",
            },
          ]}
          label="角色列表"
        >
          <SelectRole userId={info?.id} />
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(NoticeModal);
