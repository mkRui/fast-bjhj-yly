import { Select } from "antd";
import { observer } from "mobx-react";
import { FC, JSX, useContext, useEffect } from "react";

import StoreContext from "../store";

const Option = Select.Option;

export interface LeavePeriodSelectProps extends JSX.IntrinsicAttributes {
  value?: string;
  onChange?: (value?: string) => void;
  onInitChange?: (value?: string, list?: any[]) => void;
  placeholder?: string;
  allowClear?: boolean;
}

const LeavePeriodSelect: FC<LeavePeriodSelectProps> = (props) => {
  const { value, placeholder, allowClear } = props;
  const store = useContext(StoreContext);

  const handleInit = async (): Promise<void> => {
    await store.getData();
    if (!store.data.length) return;
    if (value) return;
    const current = store.data.find((i) => i.currentFlag);
    const next = current?.id ?? store.data[0].id;
    props.onInitChange?.(next, store.data);
  };

  useEffect(() => {
    void handleInit();
  }, []);

  return (
    <Select
      value={value}
      onChange={(v) => props.onChange?.(typeof v === "string" ? v : undefined)}
      style={{ width: "100%", minWidth: "200px" }}
      placeholder={placeholder || "请选择周期"}
      allowClear={allowClear}
    >
      {store.data.map((item) => (
        <Option value={item.id} key={item.id}>
          <span aria-label={item.name}>
            {item.name}
            {item.currentFlag ? "（当前）" : ""}
          </span>
        </Option>
      ))}
    </Select>
  );
};

export default observer(LeavePeriodSelect);

