import { FC, useContext, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { Form, InputNumber, Modal, Space, Switch } from "antd";
import type { ModalProps } from "antd/lib/modal";

import DatePicker from "@/components/date-picker";
import { toast } from "@/components/message";
import RootContext from "@/stores/root-context";
import { DictCode } from "@/constants/dict-code";
import { useFormInitialValues } from "@/hooks/use-form-initial-values";
import { API } from "../types/api";

const Item = Form.Item;

export interface ReportWorkModalProps {
  title: string;
  loading?: boolean;
  init?: Partial<API.SubmitWork.Params> & { items?: Record<string, number> };
  onCancel: ModalProps["onCancel"];
  onOk: (params: API.SubmitWork.Params) => void | Promise<void>;
}

const ReportWorkModal: FC<ReportWorkModalProps> = (props) => {
  const { title, loading, init, onCancel, onOk } = props;
  const [form] = Form.useForm();
  const root = useContext(RootContext);

  const subjectList = useMemo(
    () => root.getEnumData(DictCode.WORK_SUBJECT) || [],
    [root.enumList]
  );

  const initMode: "day" | "month" = (() => {
    const hasDate = !!init?.date;
    const hasYearMonth = !!init?.year && !!init?.month;
    if (hasYearMonth && !hasDate) return "month";
    return "day";
  })();

  const [mode, setMode] = useState<"day" | "month">(initMode);

  useFormInitialValues(form, init as Record<string, unknown> | undefined);

  const buildBaseParams = (values: Record<string, unknown>) => {
    const date = String(values.date || "");
    const year = Number(values.year || 0);
    const month = Number(values.month || 0);

    return {
      date: mode === "day" ? date : "",
      year: mode === "day" ? Number(String(date).slice(0, 4) || 0) : year,
      month: mode === "day" ? Number(String(date).slice(5, 7) || 0) : month,
    };
  };

  const handleOk = (): void => {
    void form.validateFields().then(async (values: Record<string, unknown>) => {
      const items = (values.items || {}) as Record<string, number>;
      const workList = subjectList
        .map((item) => ({
          subject: Number(item.code),
          num: Number(items[item.code] || 0),
        }))
        .filter((item) => item.num > 0);

      if (!workList.length) {
        toast("warning", "请至少填写一项课时数量");
        return;
      }

      await onOk({
        ...buildBaseParams(values),
        workList,
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
      width={560}
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
        <Item label="上报种类" required>
          <div className="rounded-lg border border-gray-200 divide-y divide-gray-100">
            {subjectList.map((item) => (
              <div
                key={item.code}
                className="flex items-center justify-between gap-4 px-4 py-3"
              >
                <span className="text-gray-700 shrink-0">{item.desc}</span>
                <Item name={["items", item.code]} noStyle initialValue={0}>
                  <InputNumber min={0} placeholder="0" style={{ width: 120 }} />
                </Item>
              </div>
            ))}
          </div>
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(ReportWorkModal);
