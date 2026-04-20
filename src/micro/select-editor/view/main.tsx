import { Select } from "antd";
import { observer } from "mobx-react";
import { FC, useContext, useEffect, useState, JSX } from "react";

import BranchStoreContext from "../store";

const Option = Select.Option;

export interface SelectBranchProp extends JSX.IntrinsicAttributes {
  value?: number[];
  onChange?: (name: number[]) => void;
}

const SelectEditor: FC<SelectBranchProp> = (props) => {
  const { value } = props;

  const [role, setRole] = useState<number[]>([]);

  const store = useContext(BranchStoreContext);

  const handleChange = (id: number[] | number): void => {
    if (typeof id === "object") {
      props.onChange?.(id);
    }
  };

  // methods
  const handleInit = async (): Promise<void> => {
    await store.getData();
  };

  useEffect(() => {
    void handleInit();
  }, []);

  useEffect(() => {
    if (value) {
      setRole(value);
    }
  }, [value]);

  return (
    <Select
      mode="multiple"
      value={role}
      onChange={handleChange}
      style={{ width: "100%" }}
      placeholder="请选择编辑"
    >
      {store.data.map((item) => (
        <Option value={String(item.id)} key={item.id}>
          <span aria-label={item.nickname}>{item.nickname}</span>
        </Option>
      ))}
    </Select>
  );
};

export default observer(SelectEditor);
