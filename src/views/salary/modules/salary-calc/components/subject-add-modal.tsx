import { FC, useEffect } from "react";
import { Form, Input, InputNumber, Modal, Select } from "antd";
import type { ModalProps } from "antd/lib/modal";

import { API } from "../types/api";

const Item = Form.Item;

interface SubjectAddModalProps {
  title: string;
  loading?: boolean;
  salaryId?: string;
  records?: API.Page.RecordItem[];
  onCancel: ModalProps["onCancel"];
  onOk: (params: API.SubjectAdd.Params) => void | Promise<void>;
}

const SubjectAddModal: FC<SubjectAddModalProps> = (props) => {
  const { title, loading, salaryId, records, onCancel, onOk } = props;
  const [form] = Form.useForm<API.SubjectAdd.Params & { teacherKey?: string }>();

  useEffect(() => {
    const defaultSalaryId = salaryId ?? records?.[0]?.id;
    form.setFieldsValue({
      salaryId: defaultSalaryId,
      teacherKey: defaultSalaryId,
      subject: "",
      amount: 0,
    });
  }, [form, salaryId, records]);

  const handleOk = (): void => {
    void form.validateFields().then(async (values) => {
      await onOk({
        salaryId: String(values.salaryId),
        subject: String(values.subject || ""),
        amount: Number(values.amount || 0),
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
      width={480}
    >
      <Form form={form} layout="vertical">
        {records?.length ? (
          <Item
            label="教师"
            name="teacherKey"
            rules={[{ required: true, message: "请选择教师" }]}
          >
            <Select
              placeholder="请选择教师"
              options={records.map((item) => ({
                value: item.id,
                label: item.teacherUserName || `教师${item.teacherId}`,
              }))}
              onChange={(value) => {
                form.setFieldValue("salaryId", value);
              }}
            />
          </Item>
        ) : null}
        <Item name="salaryId" hidden>
          <InputNumber />
        </Item>
        <Item label="项目名" name="subject" rules={[{ required: true, message: "请输入项目名" }]}>
          <Input placeholder="请输入项目名" />
        </Item>
        <Item label="金额" name="amount" rules={[{ required: true, message: "请输入金额" }]}>
          <InputNumber style={{ width: "100%" }} min={0} precision={2} />
        </Item>
      </Form>
    </Modal>
  );
};

export default SubjectAddModal;
