import { FC, useContext, useEffect, JSX, CSSProperties } from "react";
import { Tree } from "antd";
import { observer } from "mobx-react";

import Store from "../store";

export interface ModalContainer extends JSX.IntrinsicAttributes {
  value?: string[] | string;
  onChange?: (name: string[] | string) => void;
  onLoad?: (firstId: string | undefined) => void;
  mode?: "single" | "multiple";
  style?: CSSProperties;
  className?: string;
  height?: number | string;
  maxHeight?: number | string;
}

const ChannelTree: FC<ModalContainer> = (props) => {
  const { value, onChange, onLoad, mode = "multiple", style, className, height, maxHeight } = props;

  const store = useContext(Store);

  const init = async (): Promise<void> => {
    await store.getData();
    const firstId = store.data[0]?.id;
    onLoad?.(firstId);
  };

  useEffect(() => {
    void init();
  }, []);

  const onCheck = (checkedKeys: any): void => {
    onChange?.(checkedKeys.checked);
  };

  const onSelect = (selectedKeys: any): void => {
    const key = Array.isArray(selectedKeys) ? selectedKeys[0] : selectedKeys;
    onChange?.(key);
  };

  return (
    <div
      className={className}
      style={{
        maxHeight: maxHeight ?? 300,
        height,
        overflow: "auto",
        ...style,
      }}
    >
      {!!store.data.length && (
        <Tree
          checkStrictly
          defaultExpandAll={true}
          defaultExpandParent={true}
          onCheck={mode === "multiple" ? onCheck : undefined}
          onSelect={mode === "single" ? onSelect : undefined}
          treeData={store.data as any}
          checkedKeys={mode === "multiple" ? (value as string[] | undefined) : undefined}
          selectedKeys={mode === "single" ? (Array.isArray(value) ? value : (value ? [value] : [])) : undefined}
          checkable={mode === "multiple"}
          selectable={mode === "single"}
          fieldNames={{
            title: "name",
            key: "id",
          }}
        ></Tree>
      )}
    </div>
  );
};

export default observer(ChannelTree);
