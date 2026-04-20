import { Select } from "antd";
import { observer } from "mobx-react";
import { FC, useContext, useEffect, JSX } from "react";

import BranchStoreContext from "../store";

const Option = Select.Option;

export interface SelectTemplateProp extends JSX.IntrinsicAttributes {
  value?: string;
  categoryId: string | number;
  onChange?: (name: string) => void;
}

const SelectCategoryParam: FC<SelectTemplateProp> = (props) => {
  const { value, categoryId } = props;

  const store = useContext(BranchStoreContext);

  const handleChange = (id: string): void => {
    props.onChange?.(id);
  };

  // methods
  const handleInit = async (): Promise<void> => {
    if (!categoryId) return;
    await store.getData(categoryId);
    if (store.data.length && !value) {
      props.onChange?.(`${store.data[0].id}`);
    }
  };

  useEffect(() => {
    void handleInit();
  }, [categoryId]);

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

export default observer(SelectCategoryParam);
