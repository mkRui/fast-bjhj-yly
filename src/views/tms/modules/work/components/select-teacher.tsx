import { FC } from "react";
import { Select, Space } from "antd";

import type { Teacher } from "@/views/personal-info/types/api";

export interface SelectTeacherProps {
  value?: string;
  onChange?: (value?: string) => void;
  options: Teacher[];
  loading?: boolean;
  placeholder?: string;
  onSearch?: (keyword: string) => void;
}

const genderText = (gender: number): string => {
  if (gender === 1) return "男";
  if (gender === 2) return "女";
  return "未知";
};

const SelectTeacher: FC<SelectTeacherProps> = (props) => {
  const { value, onChange, options, loading, placeholder, onSearch } = props;

  return (
    <Select
      value={value}
      loading={loading}
      placeholder={placeholder || "请选择教师"}
      style={{ width: 360 }}
      allowClear
      showSearch
      filterOption={false}
      onSearch={(v) => onSearch?.(v)}
      onChange={(v) => onChange?.(typeof v === "number" ? v : undefined)}
      optionLabelProp="label"
    >
      {options.map((t) => (
        <Select.Option
          key={t.id}
          value={t.id}
          label={`${t.name || ""}（${genderText(Number(t.gender || 0))}）`}
        >
          <Space>
            {t.idPhoto ? (
              <img
                src={t.idPhoto}
                alt={t.name}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  background: "#f0f0f0",
                }}
              />
            )}
            <span>{t.name}</span>
            <span style={{ color: "#999" }}>{genderText(Number(t.gender || 0))}</span>
          </Space>
        </Select.Option>
      ))}
    </Select>
  );
};

export default SelectTeacher;

