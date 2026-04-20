import { FC, useContext, useState } from "react";
import { observer } from "mobx-react";

import { Content } from "@/components/container";
import RunComponents from "@/components/run-component";
import HeaderTitle from "@/components/card-header";
import MorTable from "@/components/table";
import Button from "@/components/button";
import OverallSituationSearch from "@/components/overall-situation-search";

import AccountStore from "../store/index";
import { API } from "../types/api";
import AccountModal from "../components/account-modal";
import SelectCategory from "@/micro/select-category";

import { Form } from "antd";

const Item = Form.Item;

const CategoryParamMain: FC = () => {
  const store = useContext(AccountStore);
  const [categoryId, setCategoryId] = useState<string>("");

  const columns = [
    {
      title: "分类名称",
      dataIndex: "name",
    },
    {
      title: "展示名称",
      dataIndex: "sname",
    },
    {
      title: "操作",
      dataIndex: "",
      width: 160,
      fixed: "right" as const,
      render: (_text: any, record: API.List.Data) => {
        return (
          <Button.Group>
            <Button
              type="link"
              linkType="warning"
              onClick={() => handleEditAccount(record)}
            >
              编辑
            </Button>
            <Button
              type="link"
              linkType="danger"
              action="del"
              onConfirm={() => store.delItem(record.id)}
            >
              删除
            </Button>
          </Button.Group>
        );
      },
    },
  ];

  const handleAddAccount = (): void => {
    const modal = new RunComponents({
      state: {},
      render: () => (
        <AccountModal
          title="新增分类参数"
          onCancel={() => {
            modal.unmount();
          }}
          onOk={async (params: API.AddItem.Params): Promise<void> => {
            const res = await store.addItem({
              ...params,
              categoryId,
              attr1Desc: params.attr1Desc ?? "",
              attr2Desc: params.attr2Desc ?? "",
              attr3Desc: params.attr3Desc ?? "",
            });
            if (res) modal.unmount();
          }}
        />
      ),
    });
  };

  const handleEditAccount = (item: API.List.Data): void => {
    const modal = new RunComponents({
      state: {},
      render: () => (
        <AccountModal
          title="编辑分类参数"
          info={item}
          onCancel={() => {
            modal.unmount();
          }}
          onOk={async (params: API.AddItem.Params): Promise<void> => {
            const res = await store.setItem({
              id: item.id,
              categoryParam: {
                ...params,
                categoryId,
              },
            });
            if (res) modal.unmount();
          }}
        />
      ),
    });
  };

  const handleChangeCategoryId = (value: string): void => {
    store.$setParams({ categoryId: value });
    void store.getList();
    setCategoryId(value);
  };

  return (
    <Content>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle
            insert={
              <Button type="primary" onClick={handleAddAccount}>
                新增分类参数
              </Button>
            }
          >
            分类参数管理
          </HeaderTitle>
        </Content.Header>
        <Content.Header>
          <OverallSituationSearch info={{ categoryId }}>
            <Item name="categoryId">
              <SelectCategory onChange={handleChangeCategoryId} />
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

export default observer(CategoryParamMain);
