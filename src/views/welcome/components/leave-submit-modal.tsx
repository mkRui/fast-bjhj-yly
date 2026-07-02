import { FC } from "react";
import { observer } from "mobx-react";
import { Form, Input, InputNumber, Modal } from "antd";
import type { ModalProps } from "antd/lib/modal";
import dayjs from "dayjs";

import DatePicker from "@/components/date-picker";
import { useFormInitialValues } from "@/hooks/use-form-initial-values";
import { API } from "../types/api";

const Item = Form.Item;
const LEAVE_NUM_STEP = 0.5;
const LEAVE_NUM_MIN = 0.5;

const isSameMonth = (startDate?: string, endDate?: string): boolean => {
  if (!startDate || !endDate) return true;
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  if (!start.isValid() || !end.isValid()) return true;
  return start.year() === end.year() && start.month() === end.month();
};

export interface LeaveSubmitModalProps {
  title: string;
  loading?: boolean;
  init?: Partial<API.LeaveSubmit.Params>;
  onCancel: ModalProps["onCancel"];
  onOk: (params: API.LeaveSubmit.Params) => void | Promise<void>;
}

const LeaveSubmitModal: FC<LeaveSubmitModalProps> = (props) => {
  const { title, loading, init, onCancel, onOk } = props;
  const [form] = Form.useForm();

  useFormInitialValues(form, {
    leaveNum: LEAVE_NUM_MIN,
    ...init,
  });

  const handleOk = (): void => {
    void form.validateFields().then(async (values: Record<string, unknown>) => {
      await onOk({
        leaveNum: Number(values.leaveNum || 0),
        leaveStartDate: String(values.leaveStartDate || ""),
        leaveEndDate: String(values.leaveEndDate || ""),
        leaveReason: String(values.leaveReason || ""),
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
        <Item
          label="请假天数"
          name="leaveNum"
          rules={[{ required: true, message: "请设置请假天数" }]}
        >
          <InputNumber
            min={LEAVE_NUM_MIN}
            step={LEAVE_NUM_STEP}
            style={{ width: "100%" }}
            controls
            keyboard={false}
            changeOnWheel={false}
            onKeyDown={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
          />
        </Item>

        <Item
          label="请假起始日期"
          name="leaveStartDate"
          rules={[
            { required: true, message: "请选择请假起始日期" },
            {
              validator: async (_rule, value) => {
                const endDate = form.getFieldValue("leaveEndDate");
                if (!value || !endDate) return;
                if (dayjs(value).isAfter(dayjs(endDate), "day")) {
                  throw new Error("起始日期不能晚于结束日期");
                }
                if (!isSameMonth(value, endDate)) {
                  throw new Error("请假起始日期与结束日期不能跨月");
                }
              },
            },
          ]}
        >
          <DatePicker
            format="YYYY-MM-DD"
            style={{ width: "100%" }}
            placeholder="请选择请假起始日期"
            onChange={() => {
              void form.validateFields(["leaveEndDate"]);
            }}
          />
        </Item>

        <Item
          label="请假结束日期"
          name="leaveEndDate"
          rules={[
            { required: true, message: "请选择请假结束日期" },
            {
              validator: async (_rule, value) => {
                const startDate = form.getFieldValue("leaveStartDate");
                if (!value || !startDate) return;
                if (dayjs(startDate).isAfter(dayjs(value), "day")) {
                  throw new Error("结束日期不能早于起始日期");
                }
                if (!isSameMonth(startDate, value)) {
                  throw new Error("请假起始日期与结束日期不能跨月");
                }
              },
            },
          ]}
        >
          <DatePicker
            format="YYYY-MM-DD"
            style={{ width: "100%" }}
            placeholder="请选择请假结束日期"
            onChange={() => {
              void form.validateFields(["leaveStartDate"]);
            }}
          />
        </Item>

        <Item
          label="请假事由"
          name="leaveReason"
          rules={[{ required: true, message: "请输入请假事由" }]}
        >
          <Input.TextArea rows={4} placeholder="请输入请假事由" />
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(LeaveSubmitModal);
