import { FC } from "react";
import { Form, Input, Switch, Row, Col } from "antd";


import SelectTemplate from "@/micro/select-page-template";
import DatePicker from "@/components/date-picker";
import ChannelTree from "@/micro/channel-tree";

const Item = Form.Item;

interface BasicInfoProps {
  form: any;
  setTemplateId: (v: string) => void;
}

const BasicInfo: FC<BasicInfoProps> = ({ form, setTemplateId }) => {
  return (
    <div style={{ width: "30%" }}>
      <Form form={form} layout="vertical">
        <Item
          rules={[
            {
              required: true,
              message: "请输入名称",
            },
          ]}
          name="name"
          label="名称"
        >
          <Input placeholder="请输入来源"></Input>
        </Item>
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
                    message: "请输入发布时间",
                  },
                ]}
                name="publishTime"
                label="发布时间"
              >
                <DatePicker
                  showTime={true}
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: "100%" }}
                  placeholder="请输入发布时间"
                ></DatePicker>
              </Item>
            </Col>
          </Row>
        </Item>

        <Item noStyle>
          <Row>
            <Col span={12}>
              <Item name="source" label="来源">
                <Input placeholder="请输入来源"></Input>
              </Item>
            </Col>
            <Col span={12}>
              <Item name="sourceLink" label="来源链接">
                <Input placeholder="请输入来源链接"></Input>
              </Item>
            </Col>
          </Row>
        </Item>
        <Item name="channelIdList" rules={[
          {
            required: true,
            message: "请选择发布至的频道",
          },
        ]} label="发布至">
          <ChannelTree />
        </Item>
        <Item noStyle>
          <Row>
            <Col span={8}>
              <Item name="topFlag" label="是否置顶" initialValue={false}>
                <Switch></Switch>
              </Item>
            </Col>
            <Col span={8}>
              <Item name="publishFlag" label="是否发布" initialValue={false}>
                <Switch></Switch>
              </Item>
            </Col>
            <Col span={8}>
              <Item name="showSourceFlag" label="是否链接" initialValue={false}>
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
