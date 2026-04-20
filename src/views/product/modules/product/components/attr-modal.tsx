import { FC, useRef, useState } from "react";
import { observer } from "mobx-react";
import { Modal } from "antd";
import { ModalProps } from "antd/lib/modal";

import ProductAttr from "../../product-attr";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";

export interface ProductAttrModal {
  onCancel: ModalProps["onCancel"];
  onOk: (list?: any[]) => void;
  productId: string;
  title: string;
}

const ProductAttrModal: FC<ProductAttrModal> = (props) => {
  const { onCancel, onOk, title, productId } = props;

  const [isFull, setIsFull] = useState(false);
  const getListRef = useRef<() => any[]>(() => []);

  const handleOk = (): void => {
    const list = getListRef.current?.() || [];
    onOk?.(list);
  };

  return (
    <Modal
      title={
        <div
          style={{
            position: "relative",
          }}
        >
          <span>{title}</span>
          <div
            style={{
              position: "absolute",
              top: "-4px",
              right: "24px",
              cursor: "pointer",
            }}
            onClick={() => setIsFull(!isFull)}
          >
            {isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          </div>
        </div>
      }
      open={true}
      width={1000}
      onCancel={onCancel}
      onOk={handleOk}
      wrapClassName={isFull ? "fullModal" : ""}
    >
      <ProductAttr
        productId={productId}
        onExpose={(getter: () => any[]) => {
          getListRef.current = getter;
        }}
      />
    </Modal>
  );
};

export default observer(ProductAttrModal);
