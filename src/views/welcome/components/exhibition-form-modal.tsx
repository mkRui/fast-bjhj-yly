import { FC } from "react";
import { Form, Input, Modal } from "antd";
import type { ModalProps } from "antd/lib/modal";

import DatePicker from "@/components/date-picker";
import { UploadList } from "@/components/upload";
import { useFormInitialValues } from "@/hooks/use-form-initial-values";

const Item = Form.Item;

export interface ExhibitionFormValues {
  date: string;
  name: string;
  location: string;
  distList?: string[];
}

interface ExhibitionFormModalProps {
  title: string;
  loading?: boolean;
  init?: Partial<ExhibitionFormValues>;
  showAttachments?: boolean;
  onCancel: ModalProps["onCancel"];
  onOk: (params: ExhibitionFormValues) => void | Promise<void>;
}

const ExhibitionFormModal: FC<ExhibitionFormModalProps> = (props) => {
  const { title, loading, init, showAttachments = false, onCancel, onOk } = props;
  const [form] = Form.useForm<ExhibitionFormValues>();

  useFormInitialValues(form, {
    date: init?.date || "",
    name: init?.name || "",
    location: init?.location || "",
    distList: init?.distList || [],
  });

  const handleOk = (): void => {
    void form.validateFields().then(async (values) => {
      await onOk({
        date: String(values.date || ""),
        name: String(values.name || ""),
        location: String(values.location || ""),
        distList: values.distList || [],
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
        {showAttachments ? (
          <Item label="附件" name="distList">
            <UploadList action="/common/upload" dataType="array" fileMode />
          </Item>
        ) : null}
      </Form>
    </Modal>
  );
};

export default ExhibitionFormModal;
