import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { Form, InputNumber, Modal, Space, Switch } from "antd";
import type { ModalProps } from "antd/lib/modal";

import SelectEnum from "@/micro/select-enum";
import DatePicker from "@/components/date-picker";
import { API } from "../types/api";

const Item = Form.Item;

export interface ReportWorkModalProps {
  title: string;
  loading?: boolean;
  init?: Partial<API.SubmitWork.Params>;
  onCancel: ModalProps["onCancel"];
  onOk: (params: API.SubmitWork.Params) => void | Promise<void>;
}

const ReportWorkModal: FC<ReportWorkModalProps> = (props) => {
  const { title, loading, init, onCancel, onOk } = props;
  const [form] = Form.useForm();
  const [mode, setMode] = useState<"day" | "month">("day");

  const initMode = useMemo<"day" | "month">(() => {
    const hasDate = !!init?.date;
    const hasYearMonth = !!init?.year && !!init?.month;
    if (hasYearMonth && !hasDate) return "month";
    return "day";
  }, [init?.date, init?.year, init?.month]);

  useEffect(() => {
    if (init) {
      form.setFieldsValue(init);
    }
    setMode(initMode);
  }, [init, form, initMode]);

  const handleOk = (): void => {
    void form.validateFields().then(async (values: any) => {
      const date = String(values.date || "");
      const year = Number(values.year || 0);
      const month = Number(values.month || 0);

      await onOk({
        date: mode === "day" ? date : "",
        year: mode === "day" ? Number(String(date).slice(0, 4) || 0) : year,
        month:
          mode === "day"
            ? Number(String(date).slice(5, 7) || 0)
            : month,
        subject: Number(values.subject || 0),
        num: Number(values.num || 0),
      });
    });
  };

  return (
    <Modal
      title={title}
      open={true}
      onCancel={onCancel}
      onOk={handleOk}
      okText="提交"
      cancelText="取消"
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Item label="上报方式">
          <Space>
            <Switch
              checked={mode === "day"}
              checkedChildren="按天"
              unCheckedChildren="按月"
              onChange={(checked) => {
                const nextMode: "day" | "month" = checked ? "day" : "month";
                setMode(nextMode);
                if (nextMode === "day") {
                  form.setFieldValue("year", undefined);
                  form.setFieldValue("month", undefined);
                } else {
                  form.setFieldValue("date", "");
                }
              }}
            />
          </Space>
        </Item>
        <Item
          label="上报日期"
          name="date"
          rules={[
            {
              validator: async (_rule, value) => {
                if (mode !== "day") return;
                if (!value) throw new Error("请选择上报日期");
              },
            },
          ]}
          hidden={mode !== "day"}
        >
          <DatePicker
            format="YYYY-MM-DD"
            placeholder="请选择上报日期"
            disabled={mode !== "day"}
          />
        </Item>
        <Item
          label="年份"
          name="year"
          rules={[
            {
              validator: async (_rule, value) => {
                if (mode !== "month") return;
                if (!value) throw new Error("请输入年份");
              },
            },
          ]}
          hidden={mode !== "month"}
        >
          <InputNumber style={{ width: "100%" }} min={2000} max={2100} />
        </Item>
        <Item
          label="月份"
          name="month"
          rules={[
            {
              validator: async (_rule, value) => {
                if (mode !== "month") return;
                if (!value) throw new Error("请输入月份");
              },
            },
          ]}
          hidden={mode !== "month"}
        >
          <InputNumber style={{ width: "100%" }} min={1} max={12} />
        </Item>
        <Item
          label="上报科目"
          name="subject"
          rules={[{ required: true, message: "请选择上报科目" }]}
        >
          <SelectEnum
            name="TEACHER_WORK_SUBJECT"
            placeholder="请选择上报科目"
            allowClear
            handleInitChange={(code) => {
              form.setFieldValue("subject", code);
            }}
          />
        </Item>
        <Item
          label="数量"
          name="num"
          rules={[{ required: true, message: "请输入数量" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(ReportWorkModal);
