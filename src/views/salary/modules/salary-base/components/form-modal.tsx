import { FC } from "react";
import { Col, Form, InputNumber, Modal, Row } from "antd";
import type { ModalProps } from "antd/lib/modal";

import { useFormInitialValues } from "@/hooks/use-form-initial-values";
import { API } from "../types/api";

const Item = Form.Item;

interface SalaryBaseFormModalProps {
  title: string;
  loading?: boolean;
  init?: Partial<API.Edit.Params>;
  onCancel: ModalProps["onCancel"];
  onOk: (params: API.Edit.Params) => void | Promise<void>;
}

const SalaryBaseFormModal: FC<SalaryBaseFormModalProps> = (props) => {
  const { title, loading, init, onCancel, onOk } = props;
  const [form] = Form.useForm<API.Edit.Params>();

  useFormInitialValues(form, {
    id: init?.id,
    salaryBase: init?.salaryBase ?? 0,
    salaryPosition: init?.salaryPosition ?? 0,
    salaryBonus: init?.salaryBonus ?? 0,
    salarySeniority: init?.salarySeniority ?? 0,
    salaryHousing: init?.salaryHousing ?? 0,
    salaryTransportation: init?.salaryTransportation ?? 0,
    salaryCrossing: init?.salaryCrossing ?? 0,
  });

  const handleOk = (): void => {
    void form.validateFields().then(async (values) => {
      await onOk({
        id: String(values.id),
        salaryBase: Number(values.salaryBase || 0),
        salaryPosition: Number(values.salaryPosition || 0),
        salaryBonus: Number(values.salaryBonus || 0),
        salarySeniority: Number(values.salarySeniority || 0),
        salaryHousing: Number(values.salaryHousing || 0),
        salaryTransportation: Number(values.salaryTransportation || 0),
        salaryCrossing: Number(values.salaryCrossing || 0),
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
      width={720}
    >
      <Form form={form} layout="vertical">
        <Item name="id" hidden>
          <InputNumber />
        </Item>
        <Row gutter={16}>
          <Col span={12}>
            <Item label="基本工资" name="salaryBase" rules={[{ required: true, message: "请输入基本工资" }]}>
              <InputNumber style={{ width: "100%" }} min={0} precision={2} />
            </Item>
          </Col>
          <Col span={12}>
            <Item label="岗位工资" name="salaryPosition" rules={[{ required: true, message: "请输入岗位工资" }]}>
              <InputNumber style={{ width: "100%" }} min={0} precision={2} />
            </Item>
          </Col>
          <Col span={12}>
            <Item label="全勤奖" name="salaryBonus" rules={[{ required: true, message: "请输入全勤奖" }]}>
              <InputNumber style={{ width: "100%" }} min={0} precision={2} />
            </Item>
          </Col>
          <Col span={12}>
            <Item label="校龄工资" name="salarySeniority" rules={[{ required: true, message: "请输入校龄工资" }]}>
              <InputNumber style={{ width: "100%" }} min={0} precision={2} />
            </Item>
          </Col>
          <Col span={12}>
            <Item label="住房补贴" name="salaryHousing" rules={[{ required: true, message: "请输入住房补贴" }]}>
              <InputNumber style={{ width: "100%" }} min={0} precision={2} />
            </Item>
          </Col>
          <Col span={12}>
            <Item label="交通补贴" name="salaryTransportation" rules={[{ required: true, message: "请输入交通补贴" }]}>
              <InputNumber style={{ width: "100%" }} min={0} precision={2} />
            </Item>
          </Col>
          <Col span={12}>
            <Item label="跨年级/学科补助" name="salaryCrossing" rules={[{ required: true, message: "请输入跨年级/学科补助" }]}>
              <InputNumber style={{ width: "100%" }} min={0} precision={2} />
            </Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default SalaryBaseFormModal;
