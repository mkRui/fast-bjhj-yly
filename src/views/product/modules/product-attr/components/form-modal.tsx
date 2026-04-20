import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Form, Input, Modal } from "antd";
import { ModalProps } from "antd/lib/modal";
import Upload from "@/components/upload/view/upload-list";

import SelectEnum from "@/micro/select-enum";
import RichEditor from "@/components/rich-editor";

const Item = Form.Item;

export interface NoticeModalComponentType {
  onCancel: ModalProps["onCancel"];
  onOk: (params: any) => void;
  info?: any;
  title: string;
}

const NoticeModal: FC<NoticeModalComponentType> = (props) => {
  const { onCancel, info, onOk, title } = props;

  const [form] = Form.useForm();

  const [type, setType] = useState<string | number>();

  const handleOk = (): void => {
    void form.validateFields().then(async (data: any) => {
      onOk({
        ...data,
      });
    });
  };

  useEffect(() => {
    if (info?.id) {
      form.setFieldsValue({
        ...info,
        attr: `${info.attr}`,
        type: `${info.type}`,
      });
      setType(`${info.type}`);
    }
  }, [info]);

  return (
    <Modal
      title={title}
      open={true}
      width={1000}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Item
          rules={[
            {
              required: true,
              message: "请选择商品分类",
            },
          ]}
          name="attr"
          label="商品分类"
        >
          <SelectEnum name="PRODUCT_ATTR"></SelectEnum>
        </Item>
        <Item
          rules={[
            {
              required: true,
              message: "请选择参数类型",
            },
          ]}
          name="type"
          label="参数类型"
        >
          <SelectEnum
            name="PRODUCT_ATTR_TYPE"
            onChange={(type: string) => setType(type)}
          ></SelectEnum>
        </Item>
        {(type === "1" || type === "4") && (
          <Item name="value" label="内容">
            <Upload action="/common/upload" dataType={"array"}></Upload>
          </Item>
        )}
        {(type === "1" || type === "4") && (
          <div className="mt-[-12px] flex justify-end text-[12px] text-[red]">
            {type === "1"
              ? "图片[png,jpg,jpeg,gif,webp] < 20MB"
              : "视频[mp4] < 200MB"}
          </div>
        )}
        {type === "2" && (
          <Item
            name="value"
            label="内容"
            valuePropName="value"
            trigger="onChange"
            getValueFromEvent={(value: string) => value}
          >
            <RichEditor height={400} />
          </Item>
        )}
        {type === "3" && (
          <Item name="value" label="内容">
            <Input placeholder="请输入链接"></Input>
          </Item>
        )}
        <Item
          rules={[
            {
              required: true,
              message: "请选择排序",
            },
          ]}
          name="sort"
          label="排序"
        >
          <Input placeholder="请输入内容"></Input>
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(NoticeModal);
