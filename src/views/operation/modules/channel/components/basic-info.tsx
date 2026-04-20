import { FC } from "react";
import { Form, Input, Switch, Row, Col } from "antd";
import SelectTemplate from "@/micro/select-template";
import SelectEditor from "@/micro/select-editor";

const Item = Form.Item;

interface BasicInfoProps {
  form: any;
  setTemplateId: (v: string) => void;
}

const BasicInfo: FC<BasicInfoProps> = ({ form, setTemplateId }) => {
  return (
    <div style={{ width: "30%" }}>
      <Form form={form} layout="vertical">
        <Item noStyle>
          <Row>
            <Col span={12}>
              <Item
                rules={[
                  {
                    required: true,
                    message: "请选择模版",
                  },
                ]}
                name="templateId"
                label="模版"
              >
                <SelectTemplate
                  placeholder="请输入频道名称"
                  onChange={(value: string) => setTemplateId(value)}
                ></SelectTemplate>
              </Item>
            </Col>
            <Col span={12}>
              <Item
                rules={[
                  {
                    required: true,
                    message: "请输入频道名称",
                  },
                ]}
                name="name"
                label="频道名称"
              >
                <Input placeholder="请输入频道名称"></Input>
              </Item>
            </Col>
          </Row>
        </Item>

        <Item
          rules={[
            {
              required: true,
              message: "请输入排序",
            },
          ]}
          name="sort"
          label="排序"
        >
          <Input placeholder="请输入排序"></Input>
        </Item>

        <Item
          rules={[
            {
              required: true,
              message: "请输入访问路径",
            },
          ]}
          name="path"
          label="访问路径"
        >
          <Input placeholder="请输入访问路径"></Input>
        </Item>
        <Item name="remark" label="备注">
          <Input.TextArea placeholder="请输入备注"></Input.TextArea>
        </Item>
        <Item
          rules={[
            {
              required: true,
              message: "请输入编辑",
            },
          ]}
          name="editorList"
          label="编辑"
        >
          <SelectEditor placeholder="请输入编辑"></SelectEditor>
        </Item>
        <Item noStyle>
          <Row>
            <Col span={6}>
              <Item name="newWindowFlag" label="是否新窗口打开">
                <Switch></Switch>
              </Item>
            </Col>
            <Col span={6}>
              <Item name="hiddenFlag" label="是否隐藏">
                <Switch></Switch>
              </Item>
            </Col>
            <Col span={6}>
              <Item name="linkFlag" label="是否链接">
                <Switch></Switch>
              </Item>
            </Col>
            <Col span={6}>
              <Item name="accessibleFlag" label="是否可访问">
                <Switch></Switch>
              </Item>
            </Col>
          </Row>
        </Item>
      </Form>
    </div>
  );
};

export default BasicInfo;
