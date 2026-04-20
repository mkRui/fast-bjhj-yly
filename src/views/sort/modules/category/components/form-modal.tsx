/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-06-05 15:22:52
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-24 10:37:28
 * @FilePath: /fast-bjhj-website-admin/src/views/sort/modules/category/components/form-modal.tsx
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

const FormModal: FC<NoticeModalComponentType> = (props) => {
  const { onCancel, info, onOk, title } = props;

  const [form] = Form.useForm();

  const handleOk = (): void => {
    void form.validateFields().then(async (data: any) => {
      const { name, sname } = data;
      onOk({ name, sname });
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
        <Item name="name" label="分类名称">
          <Input placeholder="请输入分类名称"></Input>
        </Item>
        <Item name="sname" label="展示名称">
          <Input placeholder="请输入展示名称"></Input>
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(FormModal);
