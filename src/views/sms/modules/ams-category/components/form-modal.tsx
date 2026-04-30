import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { Form, Input, Modal } from "antd";
import type { ModalProps } from "antd/lib/modal";

import { API } from "../types/api";

const Item = Form.Item;

export interface CategoryFormModalProps {
  title: string;
  loading?: boolean;
  init?: Partial<API.Page.RecordItem>;
  onCancel: ModalProps["onCancel"];
  onOk: (params: API.Add.Params | API.Edit.Params) => void | Promise<void>;
}

const CategoryFormModal: FC<CategoryFormModalProps> = (props) => {
  const { title, loading, init, onCancel, onOk } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      id: init?.id,
      name: init?.name || "",
      code: init?.code || "",
    });
  }, [form, init]);

  const handleOk = (): void => {
    void form.validateFields().then(async (values: any) => {
      const id = String(values.id || "");
      const name = String(values.name || "");
      const code = String(values.code || "");

      if (id) {
        await onOk({
          id,
          category: { name, code },
        } as API.Edit.Params);
      } else {
        await onOk({ name, code } as API.Add.Params);
      }
    });
  };

  return (
    <Modal
      title={title}
      open={true}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
      okText="保存"
      cancelText="取消"
      width={520}
    >
      <Form form={form} layout="vertical">
        <Item name="id" hidden>
          <Input />
        </Item>
        <Item label="分类名称" name="name" rules={[{ required: true, message: "请输入分类名称" }]}>
          <Input placeholder="请输入分类名称" />
        </Item>
        <Item label="分类编码" name="code" rules={[{ required: true, message: "请输入分类编码" }]}>
          <Input placeholder="请输入分类编码" />
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(CategoryFormModal);

