import { Select } from "antd";
import { observer } from "mobx-react";
import { FC, useContext, useEffect, JSX } from "react";

import BranchStoreContext from "../store";

const Option = Select.Option;

export interface SelectTemplateProp extends JSX.IntrinsicAttributes {
  value?: string;
  onChange?: (name: string) => void;
  onInitChange?: (name: string) => void;
}

const SelectCategory: FC<SelectTemplateProp> = (props) => {
  const { value } = props;

  const store = useContext(BranchStoreContext);

  const handleChange = (id: string): void => {
    props.onChange?.(id);
  };

  // methods
  const handleInit = async (): Promise<void> => {
    await store.getData();
    if (store.data.length) {
      props.onInitChange?.(`${store.data[0].id}`);
    }
  };

  useEffect(() => {
    void handleInit();
  }, []);

  return (
    <Select
      value={value}
      onChange={handleChange}
      style={{ width: "100%", minWidth: "200px" }}
      placeholder="请选择分类"
    >
      {store.data.map((elem) => (
        <Option value={String(elem.id)} key={elem.id}>
          <span aria-label={elem.name}>
            {elem.name}（{elem.sname}）
          </span>
        </Option>
      ))}
    </Select>
  );
};

export default observer(SelectCategory);
