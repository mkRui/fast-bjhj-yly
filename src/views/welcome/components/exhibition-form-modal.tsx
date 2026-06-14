import { FC, useEffect } from "react";
import { Form, Input, Modal } from "antd";
import type { ModalProps } from "antd/lib/modal";

import DatePicker from "@/components/date-picker";

const Item = Form.Item;

export interface ExhibitionFormValues {
  date: string;
  name: string;
  location: string;
}

interface ExhibitionFormModalProps {
  title: string;
  loading?: boolean;
  init?: Partial<ExhibitionFormValues>;
  onCancel: ModalProps["onCancel"];
  onOk: (params: ExhibitionFormValues) => void | Promise<void>;
}

const ExhibitionFormModal: FC<ExhibitionFormModalProps> = (props) => {
  const { title, loading, init, onCancel, onOk } = props;
  const [form] = Form.useForm<ExhibitionFormValues>();

  useEffect(() => {
    form.setFieldsValue({
      date: init?.date || "",
      name: init?.name || "",
      location: init?.location || "",
    });
  }, [form, init]);

  const handleOk = (): void => {
    void form.validateFields().then(async (values) => {
      await onOk({
        date: String(values.date || ""),
        name: String(values.name || ""),
        location: String(values.location || ""),
      });
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
      width={560}
    >
      <Form form={form} layout="vertical">
        <Item label="日期" name="date" rules={[{ required: true, message: "请选择日期" }]}>
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} placeholder="请选择日期" />
        </Item>
        <Item label="展会名称" name="name" rules={[{ required: true, message: "请输入展会名称" }]}>
          <Input placeholder="请输入展会名称" />
        </Item>
        <Item label="地点" name="location" rules={[{ required: true, message: "请输入地点" }]}>
          <Input placeholder="请输入地点" />
        </Item>
      </Form>
    </Modal>
  );
};

export default ExhibitionFormModal;
