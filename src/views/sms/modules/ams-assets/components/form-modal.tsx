import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { Form, Input, Modal } from "antd";
import type { ModalProps } from "antd/lib/modal";

import AssetsCategorySelect from "@/micro/assets-category-select";
import { API } from "../types/api";

const Item = Form.Item;

export interface AssetsFormModalProps {
  title: string;
  loading?: boolean;
  init?: Partial<API.Page.RecordItem>;
  onCancel: ModalProps["onCancel"];
  onOk: (params: API.Add.Params | API.Edit.Params) => void | Promise<void>;
}

const AssetsFormModal: FC<AssetsFormModalProps> = (props) => {
  const { title, loading, init, onCancel, onOk } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      id: init?.id,
      categoryId: init?.categoryId,
      name: init?.name || "",
      selfCode: init?.selfCode || "",
      remark: init?.remark || "",
    });
  }, [form, init]);

  const handleOk = (): void => {
    void form.validateFields().then(async (values: any) => {
      const id = String(values.id || "");
      const categoryId = String(values.categoryId || "");
      const name = String(values.name || "");
      const selfCode = String(values.selfCode || "");
      const remark = String(values.remark || "");

      if (id) {
        await onOk({
          id,
          assets: { categoryId, name, selfCode, remark },
        } as API.Edit.Params);
      } else {
        await onOk({
          assetsDTO: { categoryId, name, selfCode, remark },
        } as API.Add.Params);
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
      width={620}
    >
      <Form form={form} layout="vertical">
        <Item name="id" hidden>
          <Input />
        </Item>
        <Item label="资产分类" name="categoryId" rules={[{ required: true, message: "请选择资产分类" }]}>
          <AssetsCategorySelect
            allowClear
            onInitChange={(v?: string) => form.setFieldValue("categoryId", v)}
            onChange={(v?: string) => form.setFieldValue("categoryId", v)}
          />
        </Item>
        <Item label="固定资产名称" name="name" rules={[{ required: true, message: "请输入固定资产名称" }]}>
          <Input placeholder="请输入固定资产名称" />
        </Item>
        <Item label="固定资产代码" name="selfCode">
          <Input placeholder="请输入固定资产代码" />
        </Item>
        <Item label="备注" name="remark">
          <Input.TextArea rows={3} placeholder="请输入备注" />
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(AssetsFormModal);

