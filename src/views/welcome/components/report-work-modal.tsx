import { FC, useContext, useMemo } from "react";
import { observer } from "mobx-react";
import { Form, Input, InputNumber, Modal } from "antd";
import type { ModalProps } from "antd/lib/modal";

import { toast } from "@/components/message";
import RootContext from "@/stores/root-context";
import { DictCode } from "@/constants/dict-code";
import { useFormInitialValues } from "@/hooks/use-form-initial-values";
import { API } from "../types/api";

const Item = Form.Item;

export interface ReportWorkModalProps {
  title: string;
  loading?: boolean;
  init?: Partial<API.SubmitWork.Params> & {
    items?: Record<string, { num?: number; remark?: string }>;
  };
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

  useFormInitialValues(form, init as Record<string, unknown> | undefined);

  const handleOk = (): void => {
    void form.validateFields().then(async (values: Record<string, unknown>) => {
      const items = (values.items || {}) as Record<string, { num?: number; remark?: string }>;
      const workList = subjectList
        .map((item) => ({
          subject: String(item.code),
          num: Number(items[item.code]?.num || 0),
          remark: String(items[item.code]?.remark || ""),
        }))
        .filter((item) => item.num > 0);

      if (!workList.length) {
        toast("warning", "请至少填写一项课时数量");
        return;
      }

      await onOk({
        year: Number(values.year || 0),
        month: Number(values.month || 0),
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
      width={720}
    >
      <Form form={form} layout="vertical">
        <Item
          label="年份"
          name="year"
          rules={[{ required: true, message: "请输入年份" }]}
        >
          <InputNumber style={{ width: "100%" }} min={2000} max={2100} />
        </Item>
        <Item
          label="月份"
          name="month"
          rules={[{ required: true, message: "请输入月份" }]}
        >
          <InputNumber style={{ width: "100%" }} min={1} max={12} />
        </Item>
        <Item label="上报种类" required>
          <div className="rounded-lg border border-gray-200 divide-y divide-gray-100">
            {subjectList.map((item) => (
              <div
                key={item.code}
                className="flex items-center gap-3 px-4 py-3"
              >
                <span className="text-gray-700 shrink-0 w-24">{item.desc}</span>
                <Item name={["items", item.code, "num"]} noStyle initialValue={0}>
                  <InputNumber min={0} placeholder="0" style={{ width: 100 }} />
                </Item>
                <div className="flex-1 min-w-0">
                  <Item name={["items", item.code, "remark"]} noStyle initialValue="">
                    <Input placeholder="备注" maxLength={200} allowClear />
                  </Item>
                </div>
              </div>
            ))}
          </div>
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(ReportWorkModal);
