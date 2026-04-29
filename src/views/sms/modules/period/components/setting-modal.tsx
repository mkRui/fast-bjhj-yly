import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { Col, Divider, Form, InputNumber, Modal, Row } from "antd";
import type { ModalProps } from "antd/lib/modal";

import { API } from "../types/api";

const Item = Form.Item;

export interface SettingModalProps {
  title: string;
  loading?: boolean;
  init?: Partial<API.SettingEdit.Params>;
  onCancel: ModalProps["onCancel"];
  onOk: (params: API.SettingEdit.Params) => void | Promise<void>;
}

const SettingModal: FC<SettingModalProps> = (props) => {
  const { title, loading, init, onCancel, onOk } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      leaveMinUnit: 0,
      leaveMinNum: 0,
      leaveMaxNum: 0,
      bonusPerUnit: 0,
      bonusMaxLimitPerYear: 0,
      bonusMaxLimitPerMonth: 0,
      salaryMorningReading: 0,
      salaryEveningStudy: 0,
      salaryClassHour: 0,
      salaryChalkbox: 0,
      salaryOralPractice: 0,
      salaryCollegeCounseling: 0,
      salaryOvertime: 0,
      salaryExhibition: 0,
      ...init,
    });
  }, [form, init]);

  const handleOk = (): void => {
    void form.validateFields().then(async (values: any) => {
      await onOk({
        id: String(values.id || ""),
        leaveMinUnit: Number(values.leaveMinUnit || 0),
        leaveMinNum: Number(values.leaveMinNum || 0),
        leaveMaxNum: Number(values.leaveMaxNum || 0),
        bonusPerUnit: Number(values.bonusPerUnit || 0),
        bonusMaxLimitPerYear: Number(values.bonusMaxLimitPerYear || 0),
        bonusMaxLimitPerMonth: Number(values.bonusMaxLimitPerMonth || 0),
        salaryMorningReading: Number(values.salaryMorningReading || 0),
        salaryEveningStudy: Number(values.salaryEveningStudy || 0),
        salaryClassHour: Number(values.salaryClassHour || 0),
        salaryChalkbox: Number(values.salaryChalkbox || 0),
        salaryOralPractice: Number(values.salaryOralPractice || 0),
        salaryCollegeCounseling: Number(values.salaryCollegeCounseling || 0),
        salaryOvertime: Number(values.salaryOvertime || 0),
        salaryExhibition: Number(values.salaryExhibition || 0),
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
        <Divider orientation="left">请假规则</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Item
              label="请假最小天数"
              name="leaveMinUnit"
              rules={[{ required: true, message: "请输入请假最小天数" }]}
            >
              <InputNumber style={{ width: "100%" }} min={0} />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label="请假最小扣钱天数"
              name="leaveMinNum"
              rules={[{ required: true, message: "请输入请假最小扣钱天数" }]}
            >
              <InputNumber style={{ width: "100%" }} min={0} />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label="请假最大天数"
              name="leaveMaxNum"
              rules={[{ required: true, message: "请输入请假最大天数" }]}
            >
              <InputNumber style={{ width: "100%" }} min={0} />
            </Item>
          </Col>
        </Row>

        <Divider orientation="left">奖金规则</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Item label="请假一天扣除全勤奖金额" name="bonusPerUnit">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Item>
          </Col>
          <Col span={12}>
            <Item label="每年请假全勤奖天数阈值" name="bonusMaxLimitPerYear">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Item>
          </Col>
          <Col span={12}>
            <Item label="每月请假全勤奖天数阈值" name="bonusMaxLimitPerMonth">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Item>
          </Col>
        </Row>

        <Divider orientation="left">工资规则</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Item label="工资-早读" name="salaryMorningReading">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Item>
          </Col>
          <Col span={12}>
            <Item label="工资-晚自习" name="salaryEveningStudy">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Item>
          </Col>
          <Col span={12}>
            <Item label="工资-课时" name="salaryClassHour">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Item>
          </Col>
          <Col span={12}>
            <Item label="工资-粉笔字" name="salaryChalkbox">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Item>
          </Col>
          <Col span={12}>
            <Item label="工资-口语" name="salaryOralPractice">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Item>
          </Col>
          <Col span={12}>
            <Item label="工资-大学咨询" name="salaryCollegeCounseling">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Item>
          </Col>
          <Col span={12}>
            <Item label="工资-加班" name="salaryOvertime">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Item>
          </Col>
          <Col span={12}>
            <Item label="工资-展会" name="salaryExhibition">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default observer(SettingModal);
