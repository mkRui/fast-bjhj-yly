import { FC, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";

import { Content } from "@/components/container";
import RunComponents from "@/components/run-component/portal-component";
import HeaderTitle from "@/components/card-header";
import MorTable from "@/components/table";
import Button from "@/components/button";
import { toast } from "@/components/message";
import OverallSituationSearch from "@/components/overall-situation-search";
import SelectEnum from "@/micro/select-enum";

import { Form } from "antd";

import context from "../store/index";
import { API } from "../types/api";
import TemplateModal from "../components/template-modal";
import ContentModal from "../components/content-modal";

const Item = Form.Item;
const TemplateMain: FC = () => {
  const store = useContext(context);

  const [type, setType] = useState("");

  const columns = [
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "是否启用",
      dataIndex: "enableFlag",
      render: (_text: any) => {
        return _text ? "是" : "否";
      },
    },
    {
      title: "操作",
      dataIndex: "",
      width: 170,
      fixed: "right" as const,
      render: (_text: any, record: API.Template.Data) => {
        return (
          <Button.Group>
            <Button
              type="link"
              linkType="edit"
              onClick={() => handleEditTemplate(record)}
            >
              编辑
            </Button>
            <Button
              type="link"
              action="edit"
              onClick={() => handleEditTemplateContent(record)}
            >
              编辑内容
            </Button>
            <Button
              type="link"
              linkType="danger"
              action="del"
              onConfirm={() => handleDeleteTemplate(record.id)}
            >
              删除
            </Button>
          </Button.Group>
        );
      },
    },
  ];

  const handleDeleteTemplate = async (id: string): Promise<void> => {
    const res = await store.delItem(id);
    if (res) {
      toast("success", "删除成功");
      handleChangeType(type);
    }
  };

  const handleAddTemplate = (): void => {
    const modal = new RunComponents({
      state: {},
      render: () => (
        <TemplateModal
          title="新增模版"
          onCancel={() => {
            modal.unmount();
          }}
          onOk={async (params: API.AddTemplate.Params): Promise<void> => {
            const res = await store.addItem({
              ...params,
            });
            if (res) {
              toast("success", "新增成功");
              handleChangeType(type);
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const handleEditTemplate = async (data: API.Template.Data): Promise<void> => {
    const info = await store.getContent({ templateId: data.id });
    console.log(info);
    const modal = new RunComponents({
      state: {},
      render: () => (
        <TemplateModal
          title="编辑模版"
          onCancel={() => {
            modal.unmount();
          }}
          info={{
            ...info,
            ...data,
          }}
          onOk={async (params: API.AddTemplate.Params): Promise<void> => {
            const res = await store.setItem({
              id: data.id,
              template: {
                ...params,
              },
            });
            if (res) {
              toast("success", "编辑成功");
              handleChangeType(type);
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const handleEditTemplateContent = async (
    data: API.Template.Data
  ): Promise<void> => {
    const info = await store.getContent({ templateId: data.id });
    console.log(info);
    const modal = new RunComponents({
      state: {},
      render: () => (
        <ContentModal
          title="编辑模版内容"
          onCancel={() => {
            modal.unmount();
          }}
          info={info?.content}
          onOk={async (
            params: API.SetTemplateContent.Params
          ): Promise<void> => {
            const res = await store.setContent({
              ...params,
              id: data.id,
            });
            if (res) {
              toast("success", "编辑成功");
              handleChangeType(type);
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const handleChangeType = (value: string): void => {
    void store.getList({ type: value });
    setType(value);
  };

  useEffect(() => {
    void store.getList();
  }, []);

  return (
    <Content>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle
            insert={
              <Button type="primary" onClick={handleAddTemplate}>
                新增模版
              </Button>
            }
          >
            模版管理
          </HeaderTitle>
        </Content.Header>
        <Content.Header>
          <OverallSituationSearch info={{ type }}>
            <Item name="type">
              <SelectEnum
                name="TEMPLATE_TYPE"
                onChange={handleChangeType}
                placeholder="请选择类型"
                allowClear
              />
            </Item>
          </OverallSituationSearch>
        </Content.Header>
        <Content.Main>
          <MorTable
            bordered
            pagination={false}
            dataSource={store.list}
            columns={columns}
            rowKey={(record) => record.id}
            loading={store.loading}
          />
        </Content.Main>
      </Content.Layout>
    </Content>
  );
};

export default observer(TemplateMain);
