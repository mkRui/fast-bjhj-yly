import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { Form, Input, InputNumber, Modal, TimePicker } from "antd";
import type { ModalProps } from "antd/lib/modal";
import dayjs from "dayjs";

import DatePicker from "@/components/date-picker";
import LeavePeriodSelect from "@/micro/leave-period-list";
import LeavePeriodSetting from "@/micro/leave-period-setting";
import { API as PeriodSettingAPI } from "@/micro/leave-period-setting/types";
import SelectEnum from "@/micro/select-enum";
import { API } from "../types/api";

const Item = Form.Item;
const TIME_FORMAT = "HH:mm";

const toTimeValue = (value?: string) => {
  if (!value) return null;
  const parts = String(value).split(":");
  const hour = Number(parts[0] || 0);
  const minute = Number(parts[1] || 0);
  const second = Number(parts[2] || 0);
  if (Number.isNaN(hour) || Number.isNaN(minute) || Number.isNaN(second)) return null;
  return dayjs().hour(hour).minute(minute).second(second);
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
  const [setting, setSetting] = useState<PeriodSettingAPI.PeriodSetting.Data | null>(null);

  useEffect(() => {
    if (init) {
      form.setFieldsValue({
        ...init,
        leaveType: init.leaveType === null || init.leaveType === undefined ? undefined : String(init.leaveType),
      });
    }
  }, [init, form]);

  const periodId = Form.useWatch("periodId", form);

  const leaveMinUnitLabel = useMemo(() => {
    const unit = Number(setting?.leaveMinUnit || 0);
    if (unit === 1) return "天";
    if (unit === 2) return "小时";
    if (unit === 3) return "分钟";
    return "";
  }, [setting?.leaveMinUnit]);

  const handleOk = (): void => {
    void form.validateFields().then(async (values: any) => {
      await onOk({
        periodId: values.periodId,
        leaveNum: Number(values.leaveNum || 0),
        leaveDate: String(values.leaveDate || ""),
        leaveStartTime: `${values.leaveStartTime || ""}:00`,
        leaveEndTime: `${values.leaveEndTime || ""}:00`,
        leaveType: Number(values.leaveType || 0),
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
          label="周期"
          name="periodId"
          rules={[{ required: true, message: "请选择周期" }]}
        >
          <LeavePeriodSelect
            allowClear
            onInitChange={(v?: string) => form.setFieldValue("periodId", v)}
            onChange={(v?: string) => form.setFieldValue("periodId", v)}
          />
        </Item>

        <LeavePeriodSetting
          periodId={Number(periodId || 0)}
          onInit={(data: PeriodSettingAPI.PeriodSetting.Data) => setSetting(data)}
        />

        <Item
          label={
            setting?.leaveMinNum
              ? `请假数量（最小：${setting.leaveMinNum}${leaveMinUnitLabel || ""}）`
              : "请假数量"
          }
          name="leaveNum"
          rules={[
            {
              required: true,
              message: "请输入请假数量",
            },
            {
              validator: async (_rule, value) => {
                if (!setting?.leaveMinNum) return;
                const min = Number(setting.leaveMinNum || 0);
                if (Number(value || 0) < min) throw new Error(`请假数量不能小于 ${min}`);
              },
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Item>

        <Item
          label="请假日期"
          name="leaveDate"
          rules={[{ required: true, message: "请选择请假日期" }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} placeholder="请选择请假日期" />
        </Item>

        <Item
          label="开始时间"
          name="leaveStartTime"
          rules={[{ required: true, message: "请选择开始时间" }]}
          getValueProps={(value) => ({ value: toTimeValue(value) })}
          getValueFromEvent={(_time: any, timeString: string) => timeString || ""}
        >
          <TimePicker
            format={TIME_FORMAT}
            placeholder="请选择开始时间"
            style={{ width: "100%" }}
          />
        </Item>

        <Item
          label="结束时间"
          name="leaveEndTime"
          rules={[{ required: true, message: "请选择结束时间" }]}
          getValueProps={(value) => ({ value: toTimeValue(value) })}
          getValueFromEvent={(_time: any, timeString: string) => timeString || ""}
        >
          <TimePicker
            format={TIME_FORMAT}
            placeholder="请选择结束时间"
            style={{ width: "100%" }}
          />
        </Item>

        <Item
          label="请假类型"
          name="leaveType"
          rules={[{ required: true, message: "请选择请假类型" }]}
        >
          <SelectEnum
            name="TEACHER_LEAVE_TYPE"
            allowClear
            handleInitChange={(v: string) => form.setFieldValue("leaveType", v)}
            onChange={(v: string) => form.setFieldValue("leaveType", v)}
          />
        </Item>

        <Item
          label="请假原因"
          name="leaveReason"
          rules={[{ required: true, message: "请输入请假原因" }]}
        >
          <Input.TextArea rows={4} placeholder="请输入请假原因" />
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(LeaveSubmitModal);
