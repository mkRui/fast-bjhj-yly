import { Tag } from "antd";
import { FC } from "react";

export const isCheckFlagSet = (value: unknown): value is boolean => typeof value === "boolean";

export interface CheckStatusTagProps {
  checkedFlag?: boolean | null;
  pendingText?: string;
  passText?: string;
  rejectText?: string;
  /** 未进入审核流程时显示（如处置尚未提交） */
  unsetText?: string;
}

const CheckStatusTag: FC<CheckStatusTagProps> = ({
  checkedFlag,
  pendingText = "未审核",
  passText = "通过",
  rejectText = "未通过",
  unsetText,
}) => {
  if (!isCheckFlagSet(checkedFlag)) {
    if (unsetText !== undefined) {
      return <span>{unsetText}</span>;
    }
    return <Tag color="gold">{pendingText}</Tag>;
  }
  if (checkedFlag) {
    return <Tag color="green">{passText}</Tag>;
  }
  return <Tag color="red">{rejectText}</Tag>;
};

export default CheckStatusTag;
