import { FC } from "react";
import { observer } from "mobx-react";
import { Form, Input, Modal, Radio, TimePicker } from "antd";
import type { ModalProps } from "antd/lib/modal";
import dayjs from "dayjs";

import DatePicker from "@/components/date-picker";
import SelectEnum from "@/micro/select-enum";
import { DictCode } from "@/constants/dict-code";
import { useFormInitialValues } from "@/hooks/use-form-initial-values";
import { API } from "../types/api";

const Item = Form.Item;
const TIME_FORMAT = "HH:mm";
const HALF_DAY_LEAVE_NUM = 1;
const FULL_DAY_LEAVE_NUM = 2;
const HALF_DAY_HOURS = 4;

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
  const leaveNum = Form.useWatch("leaveNum", form);

  useFormInitialValues(form, {
    leaveNum: HALF_DAY_LEAVE_NUM,
    leaveStartTime: "08:00",
    leaveEndTime: "12:00",
    ...init,
    leaveType:
      init?.leaveType === null || init?.leaveType === undefined
        ? undefined
        : String(init.leaveType),
  });

  const isHalfDay = Number(leaveNum) === HALF_DAY_LEAVE_NUM;

  const handleLeaveNumChange = (value: number): void => {
    if (value === HALF_DAY_LEAVE_NUM) {
      form.setFieldsValue({
        leaveStartTime: form.getFieldValue("leaveStartTime") || "08:00",
        leaveEndTime: form.getFieldValue("leaveEndTime") || "12:00",
      });
    } else {
      form.setFieldsValue({
        leaveStartTime: undefined,
        leaveEndTime: undefined,
      });
    }
  };

  const handleStartTimeChange = (time: dayjs.Dayjs | null): void => {
    if (time) {
      form.setFieldValue("leaveEndTime", time.add(HALF_DAY_HOURS, "hour").format(TIME_FORMAT));
    }
  };

  const handleOk = (): void => {
    void form.validateFields().then(async (values: any) => {
      const isHalfDayLeave = Number(values.leaveNum) === HALF_DAY_LEAVE_NUM;

      await onOk({
        leaveNum: Number(values.leaveNum || 0),
        leaveDate: String(values.leaveDate || ""),
        leaveStartTime: isHalfDayLeave ? `${values.leaveStartTime || ""}:00` : "",
        leaveEndTime: isHalfDayLeave ? `${values.leaveEndTime || ""}:00` : "",
        leaveType: String(values.leaveType || ""),
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
          label="请假数量"
          name="leaveNum"
          rules={[{ required: true, message: "请选择请假数量" }]}
        >
          <Radio.Group
            options={[
              { label: "半天", value: HALF_DAY_LEAVE_NUM },
              { label: "全天", value: FULL_DAY_LEAVE_NUM },
            ]}
            onChange={(e) => handleLeaveNumChange(e.target.value)}
          />
        </Item>

        <Item
          label="请假日期"
          name="leaveDate"
          rules={[{ required: true, message: "请选择请假日期" }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} placeholder="请选择请假日期" />
        </Item>

        {isHalfDay ? (
          <>
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
                onChange={handleStartTimeChange}
              />
            </Item>

            <Item
              label="结束时间"
              name="leaveEndTime"
              rules={[
                { required: true, message: "请选择结束时间" },
                {
                  validator: async (_rule, value) => {
                    const start = form.getFieldValue("leaveStartTime");
                    if (!start || !value) return;
                    const startTime = toTimeValue(start);
                    const endTime = toTimeValue(value);
                    if (!startTime || !endTime) return;
                    if (endTime.diff(startTime, "hour", true) !== HALF_DAY_HOURS) {
                      throw new Error("半天请假时间范围固定为4小时");
                    }
                  },
                },
              ]}
              getValueProps={(value) => ({ value: toTimeValue(value) })}
              getValueFromEvent={(_time: any, timeString: string) => timeString || ""}
            >
              <TimePicker
                format={TIME_FORMAT}
                placeholder="请选择结束时间"
                style={{ width: "100%" }}
              />
            </Item>
          </>
        ) : null}

        <Item
          label="请假类型"
          name="leaveType"
          rules={[{ required: true, message: "请选择请假类型" }]}
        >
          <SelectEnum
            name={DictCode.LEAVE_TYPE}
            allowClear
            handleInitChange={(v) => form.setFieldValue("leaveType", v)}
            onChange={(v) => form.setFieldValue("leaveType", v)}
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
