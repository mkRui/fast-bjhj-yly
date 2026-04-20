import { Select } from "antd";
import { observer } from "mobx-react";
import { FC, useContext, useEffect, JSX } from "react";

import BranchStoreContext from "../store";

const Option = Select.Option;

const OptGroup = Select.OptGroup;

export interface SelectTemplateProp extends JSX.IntrinsicAttributes {
  value?: string;
  onChange?: (name: string) => void;
}

const SelectTemplate: FC<SelectTemplateProp> = (props) => {
  const { value } = props;

  const store = useContext(BranchStoreContext);

  const handleChange = (id: string): void => {
    props.onChange?.(id);
  };

  // methods
  const handleInit = async (): Promise<void> => {
    await store.getData();
  };

  useEffect(() => {
    void handleInit();
  }, []);

  return (
    <Select
      value={value}
      onChange={handleChange}
      style={{ width: "100%" }}
      placeholder="请选择模版角色"
    >
      {store.data.map((item) => (
        <OptGroup label={item.desc}>
          {item.entityList.map((elem) => (
            <Option value={elem.id} key={elem.id}>
              <span aria-label={elem.name}>{elem.name}</span>
            </Option>
          ))}
        </OptGroup>
      ))}
    </Select>
  );
};

export default observer(SelectTemplate);
