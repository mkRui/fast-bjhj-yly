import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Form, Modal } from "antd";
import { ModalProps } from "antd/lib/modal";
import Editor from "@/components/editor";
import { API } from "../types/api";

import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";

const Item = Form.Item;

export interface TemplateModalComponentType {
  onCancel: ModalProps["onCancel"];
  onOk: (params: any) => void;
  title: string;
  info?: API.GetTemplateInfo.Content;
}

const TemplateModal: FC<TemplateModalComponentType> = (props) => {
  const { onCancel, onOk, title, info } = props;

  const [isFull, setIsFull] = useState(true);

  const [form] = Form.useForm();

  const handleOk = (): void => {
    void form.validateFields().then(async (data: any) => {
      onOk({
        ...data,
      });
    });
  };

  useEffect(() => {
    if (info) {
      form.setFieldsValue({
        content: info.content,
      });
    }
  });

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
      <Form form={form} layout="vertical">
        <Item
          rules={[
            {
              required: true,
              message: "请输入模版内容",
            },
          ]}
          name="content"
          label="模版内容"
        >
          <Editor full={isFull} />
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(TemplateModal);
