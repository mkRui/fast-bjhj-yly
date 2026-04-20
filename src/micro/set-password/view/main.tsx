import React, { FC, useContext, useState, JSX } from "react";
import { Form, Input, Modal } from "antd";
import { ModalProps } from "antd/lib/modal";
import { observer } from "mobx-react";

import { toast } from "@/components/message";

import Store from "../store";

const Item = Form.Item;

export interface ModalContainer extends JSX.IntrinsicAttributes {
  onCancel: ModalProps["onCancel"];
  onOk: any;
}

const RoleResourceModal: FC<ModalContainer> = (props) => {
  const { onCancel, onOk } = props;

  const [form] = Form.useForm();

  const store = useContext(Store);

  const [now, setNow] = useState("");

  const handleOk = (): void => {
    void form.validateFields().then(async (data: any) => {
      const { confirmPassword, newPassword, oldPassword } = data;
      if (confirmPassword !== newPassword) {
        toast("error", "确认密码与新密码不一致");
      }
      const res = await store.changePassword({
        newPassword,
        oldPassword,
      });
      if (res) {
        toast("success", "修改成功");
        onOk();
      }
    });
  };

  return (
    <Modal title={"修改密码"} onCancel={onCancel} onOk={handleOk}>
      <Form form={form} layout="vertical">
        <Item
          rules={[
            {
              required: true,
              message: "请输入旧密码",
            },
          ]}
          name="oldPassword"
          label="旧密码"
        >
          <Input.Password placeholder="请输入旧密码"></Input.Password>
        </Item>
        <Item
          rules={[
            {
              required: true,
              message: "请输入新密码",
            },
          ]}
          name="newPassword"
          label="新密码"
        >
          <Input.Password
            placeholder="请输入新密码"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNow(e.target.value)
            }
          ></Input.Password>
        </Item>
        <Item
          rules={[
            {
              required: true,
              message: "请确认新密码",
            },
            {
              validator(_rule, value, callback) {
                if (value !== now) {
                  callback("确认密码请与新密码保持一致");
                } else {
                  callback();
                }
              },
            },
          ]}
          name="confirmPassword"
          label="确认密码"
        >
          <Input.Password placeholder="请输入确认密码"></Input.Password>
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(RoleResourceModal);
