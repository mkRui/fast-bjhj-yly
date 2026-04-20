import { Select } from "antd";
import { observer } from "mobx-react";
import { FC, useContext, JSX, useState, useEffect } from "react";
import root from "@/stores/root-context";
import { API } from "@/api/type";

const Option = Select.Option;

export interface SelectBranchProp extends JSX.IntrinsicAttributes {
  value?: string;
  onChange?: (name: string) => void;
  handleInitChange?: (name: string) => void;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
}

const SelectEnum: FC<SelectBranchProp> = (props) => {
  const { value, name, placeholder, disabled, handleInitChange, allowClear } = props;

  const [data, setData] = useState<API.GetEnum.Dict[]>([]);

  const store = useContext(root);

  const handleChange = (id: string): void => {
    props.onChange?.(id);
    handleInitChange?.(id);
  };

  useEffect(() => {
    const list = store.getEnumData(name) || [];
    if (list.length > 0) {
      setData(list);
      handleInitChange?.(list[0].code);
    }
  }, [store.enumList.length]);

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
        <Option value={item.code} key={item.code}>
          <span aria-label={item.desc}>{item.desc}</span>
        </Option>
      ))}
    </Select>
  );
};

export default observer(SelectEnum);
