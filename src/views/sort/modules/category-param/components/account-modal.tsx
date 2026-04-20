/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-06-21 19:01:31
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-24 10:37:50
 * @FilePath: /fast-bjhj-website-admin/src/views/sort/modules/category-param/components/account-modal.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
      const { name, sname, attr1Desc, attr2Desc, attr3Desc } = data;
      onOk({ name, sname, attr1Desc, attr2Desc, attr3Desc });
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
              message: "请输入分类名称",
            },
          ]}
          name="name"
          label="分类名称"
        >
          <Input placeholder="请输入分类名称"></Input>
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
        <Item name="attr1Desc" label="附加参数说明1">
          <Input placeholder="请输入附加参数说明1"></Input>
        </Item>
        <Item name="attr2Desc" label="附加参数说明2">
          <Input placeholder="请输入附加参数说明2"></Input>
        </Item>
        <Item name="attr3Desc" label="附加参数说明3">
          <Input placeholder="请输入附加参数说明3"></Input>
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(NoticeModal);
