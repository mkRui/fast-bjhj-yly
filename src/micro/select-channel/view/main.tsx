import { TreeSelect } from "antd";
import { observer } from "mobx-react";
import { FC, useContext, useEffect, JSX } from "react";

import BranchStoreContext from "../store";

export interface SelectChannelProp extends JSX.IntrinsicAttributes {
  value?: string;
  onChange?: (name: string) => void;
}

const SelectChannel: FC<SelectChannelProp> = (props) => {
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
    <TreeSelect
      style={{ width: "100%", minWidth: "200px" }}
      value={value}
      styles={{
        popup: { root: { maxHeight: 400, overflow: "auto" } },
      }}
      placeholder="请选择频道"
      allowClear
      treeDefaultExpandAll
      onChange={handleChange}
      treeData={store.data}
      fieldNames={{
        label: "name",
        value: "id",
        children: "children",
      }}
    />
  );
};

export default observer(SelectChannel);
