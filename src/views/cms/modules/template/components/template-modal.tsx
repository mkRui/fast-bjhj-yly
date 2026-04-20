import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { Form, Input, Modal, Switch } from "antd";
import { ModalProps } from "antd/lib/modal";
import SelectEnum from "@/micro/select-enum";

import { MinusCircleOutlined } from "@ant-design/icons";

import Button from "@/components/button";

const Item = Form.Item;

export interface TemplateModalComponentType {
  onCancel: ModalProps["onCancel"];
  onOk: (params: any) => void;
  title: string;
  info?: any;
}

const TemplateModal: FC<TemplateModalComponentType> = (props) => {
  const { onCancel, onOk, title, info } = props;

  const [form] = Form.useForm();

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
        metaList: info.metaList.map((item: any) => {
          return {
            ...item,
            type: `${item.type}`,
          };
        }),
        type: `${info.type}`,
      });
    }
  }, [info]);

  return (
    <Modal
      title={title}
      open={true}
      width={800}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Item
          rules={[
            {
              required: true,
              message: "请输入模板名称",
            },
          ]}
          name="name"
          label="模板名称"
        >
          <Input placeholder="请输入模版名称"></Input>
        </Item>
        <Item
          rules={[
            {
              required: true,
              message: "请选择模板类型",
            },
          ]}
          name="type"
          label="模板类型"
        >
          <SelectEnum name="TEMPLATE_TYPE"></SelectEnum>
        </Item>
        <Item
          rules={[
            {
              required: true,
              message: "请选择是否已启用",
            },
          ]}
          initialValue={false}
          name="enableFlag"
          label="是否已启用"
        >
          <Switch />
        </Item>
        <Form.List name="metaList">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Form.Item noStyle>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Form.Item
                      name={[field.name, "name"]}
                      style={{ marginRight: "10px" }}
                    >
                      <Input placeholder="请输入name"></Input>
                    </Form.Item>
                    <Form.Item
                      name={[field.name, "keyName"]}
                      style={{ marginRight: "10px" }}
                    >
                      <Input placeholder="key名称"></Input>
                    </Form.Item>
                    <Form.Item
                      name={[field.name, "type"]}
                      style={{ marginRight: "10px" }}
                    >
                      <SelectEnum name="TEMPLATE_META_TYPE"></SelectEnum>
                    </Form.Item>
                    <Form.Item
                      style={{ marginRight: "10px" }}
                      initialValue={false}
                      name={[field.name, "requiredFlag"]}
                    >
                      <Switch />
                    </Form.Item>
                    <Form.Item>
                      <MinusCircleOutlined
                        style={{ color: "#ff4d4f" }}
                        onClick={() => remove(field.name)}
                      />
                    </Form.Item>
                  </div>
                </Form.Item>
              ))}
              <Form.Item>
                <Button onClick={() => add()}>新增META</Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default observer(TemplateModal);
