import { FC } from "react";
import { Select, Space } from "antd";

import { EnumLabel } from "@/micro/select-enum";
import { DictCode } from "@/constants/dict-code";
import { useDict } from "@/hooks/use-dict";
import type { Teacher } from "@/views/personal-info/types/api";

export interface SelectTeacherProps {
  value?: string;
  onChange?: (value?: string) => void;
  options: Teacher[];
  loading?: boolean;
  placeholder?: string;
  onSearch?: (keyword: string) => void;
}

const SelectTeacher: FC<SelectTeacherProps> = (props) => {
  const { value, onChange, options, loading, placeholder, onSearch } = props;
  const genderDict = useDict(DictCode.GENDER);

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
      onChange={(v) => onChange?.(v ? String(v) : undefined)}
      optionLabelProp="label"
    >
      {options.map((t) => (
        <Select.Option
          key={t.id}
          value={t.id}
          label={`${t.name || ""}（${genderDict.label(t.gender)}）`}
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
            <EnumLabel name={DictCode.GENDER} value={t.gender} style={{ color: "#999" }} />
          </Space>
        </Select.Option>
      ))}
    </Select>
  );
};

export default SelectTeacher;
