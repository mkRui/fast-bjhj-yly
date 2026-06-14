import { Select } from "antd";
import { observer } from "mobx-react";
import { FC, useContext, JSX, useState, useEffect } from "react";
import root from "@/stores/root-context";
import { API } from "@/api/type";

const Option = Select.Option;

export interface SelectEnumProps extends JSX.IntrinsicAttributes {
  value?: string | number;
  onChange?: (value: string | number) => void;
  handleInitChange?: (value: string | number) => void;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  valueType?: "string" | "number";
}

const SelectEnum: FC<SelectEnumProps> = (props) => {
  const {
    value,
    name,
    placeholder,
    disabled,
    handleInitChange,
    allowClear,
    valueType = "string",
    onChange,
  } = props;

  const [data, setData] = useState<API.GetEnum.Dict[]>([]);

  const store = useContext(root);

  const parseValue = (code: string): string | number =>
    valueType === "number" ? Number(code) : code;

  const handleChange = (next: string | number): void => {
    onChange?.(next);
    handleInitChange?.(next);
  };

  useEffect(() => {
    const list = store.getEnumData(name) || [];
    setData(list);
  }, [store.enumList, name]);

  return (
    <Select
      disabled={disabled}
      value={value}
      onChange={handleChange}
      style={{ width: "100%", minWidth: "200px" }}
      placeholder={placeholder || "请选择"}
      allowClear={allowClear}
    >
      {data.map((item) => (
        <Option value={parseValue(item.code)} key={item.code}>
          <span aria-label={item.desc}>{item.desc}</span>
        </Option>
      ))}
    </Select>
  );
};

export default observer(SelectEnum);
