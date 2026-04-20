import { Select } from "antd";
import { observer } from "mobx-react";
import { FC, useContext, useEffect, useState, JSX } from "react";

import BranchStoreContext from "../store";

const Option = Select.Option;

export interface SelectBranchProp extends JSX.IntrinsicAttributes {
  value?: number[];
  onChange?: (name: number[]) => void;
  getUid?: (id: number) => void;
  userId?: number;
}

const SelectUserAccount: FC<SelectBranchProp> = (props) => {
  const { value, userId } = props;

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
    if (userId) {
      store.$setParams({ userId });
      await store.getUserRoleList();
      const SelectRoleId = store.userRoleList.map((item) => item.roleId);
      const ids = store.data
        .filter((item) => SelectRoleId.includes(item.id))
        .map((item) => item.id);
      setRole(ids);
      handleChange(ids);
    }
  };

  useEffect(() => {
    void handleInit();
  }, [userId]);

  useEffect(() => {
    if (value) {
      setRole(value);
    } else {
      // setRole([]);
    }
  }, [value]);

  useEffect(() => {
    return () => {
      store.$setUserRoleList([]);
    };
  }, []);

  return (
    <Select
      mode="multiple"
      value={role}
      onChange={handleChange}
      style={{ width: "100%" }}
      placeholder="请选择用户角色"
    >
      {store.data.map((item) => (
        <Option value={String(item.id)} key={item.id}>
          <span aria-label={item.name}>{item.name}</span>
        </Option>
      ))}
    </Select>
  );
};

export default observer(SelectUserAccount);
