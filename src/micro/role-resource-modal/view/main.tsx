import { FC, useContext, useEffect, useState, JSX } from "react";
import { Tree, Modal } from "antd";
import { ModalProps } from "antd/lib/modal";
import { observer } from "mobx-react";

import { Tree as TreeFn } from "@/utils/data-structure/tree";

import Store from "../store";
import { toast } from "@/components/message";

export interface ModalContainer extends JSX.IntrinsicAttributes {
  onCancel: ModalProps["onCancel"];
  onOk: any;
  id: number;
}

const RoleResourceModal: FC<ModalContainer> = (props) => {
  const { onCancel, id } = props;

  const store = useContext(Store);

  const [checkList, setCheckList] = useState<number[]>([]);

  const init = async (): Promise<void> => {
    store.$setParams({ roleId: id });
    await store.getData();
    if (store.data.length) {
      const selected = store.data.filter((item) => item.selected);
      const checked = selected.map((item) => item.id);
      setCheckList(checked);
    }
  };

  useEffect(() => {
    void init();
  }, []);

  const onSetCheck = async (resId: string, checked: boolean): Promise<void> => {
    const res = await store.setData({
      roleId: id,
      resId,
      act: checked ? "ASSOCIATION" : "DISASSOCIATION",
    });
    if (res) {
      toast("success", "操作成功");
    }
  };

  const onCheck = (checkedKeys: any, info: any): void => {
    void onSetCheck(info.node.id, info.checked);
    setCheckList(checkedKeys.checked);
  };

  return (
    <Modal title={"关联资源"} open={true} onCancel={onCancel}>
      <div style={{ maxHeight: 300, overflow: "auto" }}>
        {!!store.data.length && (
          <Tree
            checkStrictly
            defaultExpandAll={true}
            defaultExpandParent={true}
            onCheck={onCheck}
            treeData={new TreeFn(store.data).loop("0")}
            checkedKeys={checkList}
            checkable
            fieldNames={{
              title: "name",
              key: "id",
            }}
          ></Tree>
        )}
      </div>
    </Modal>
  );
};

export default observer(RoleResourceModal);
