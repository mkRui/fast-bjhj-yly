import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { Form, Input, Modal } from "antd";
import { ModalProps } from "antd/lib/modal";
import SelectCategory from "@/micro/select-category";

import { API } from "../types/api";

const Item = Form.Item;

export interface NoticeModalComponentType {
  onCancel: ModalProps["onCancel"];
  onOk: (params: any) => void;
  info?: API.List.Product; // Only pass product info
  init?: API.AddItem.Params;
  title: string;
}

const NoticeModal: FC<NoticeModalComponentType> = (props) => {
  const { onCancel, info, onOk, title, init } = props;

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
    } else if (init) {
      form.setFieldsValue({
        ...init,
      });
    }
  }, [info, init]);

  return (
    <Modal title={title} visible={true} onCancel={onCancel} onOk={handleOk}>
      <Form form={form} layout="vertical">
        <Item
          rules={[
            {
              required: true,
              message: "请选择分类",
            },
          ]}
          name="categoryId"
          label="分类"
        >
          <SelectCategory />
        </Item>
        <Item
          rules={[
            {
              required: true,
              message: "请输入产品名称",
            },
          ]}
          name="name"
          label="产品名称"
        >
          <Input placeholder="请输入产品名称"></Input>
        </Item>
        <Item
          rules={[
            {
              required: true,
              message: "请输入展示名称",
            },
          ]}
          name="sname"
          label="展示名称"
        >
          <Input placeholder="请输入展示名称"></Input>
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(NoticeModal);
