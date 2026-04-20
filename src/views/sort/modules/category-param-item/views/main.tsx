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
import AccountModal from "../components/form-modal";
import SelectCategory from "@/micro/select-category";
import SelectCategoryParam from "@/micro/select-category-param";

import { Form } from "antd";

const Item = Form.Item;

const CategoryParamItemMain: FC = () => {
  const store = useContext(AccountStore);
  const [categoryId, setCategoryId] = useState<string>("");
  const [paramId, setParamId] = useState<string>("");

  const columns = [
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "值",
      dataIndex: "value",
    },
    {
      title: "附加参数1",
      dataIndex: "attr1",
    },
    {
      title: "附加参数2",
      dataIndex: "attr2",
    },
    {
      title: "附加参数3",
      dataIndex: "attr3",
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
    if (!categoryId || !paramId) {
      return;
    }
    const modal = new RunComponents({
      state: {},
      render: () => (
        <AccountModal
          title="新增分类参数选项"
          onCancel={() => {
            modal.unmount();
          }}
          onOk={async (params: API.AddItem.Params): Promise<void> => {
            const res = await store.addItem({
              ...params,
              categoryId,
              paramId,
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
          title="编辑分类参数选项"
          info={item}
          onCancel={() => {
            modal.unmount();
          }}
          onOk={async (params: API.AddItem.Params): Promise<void> => {
            const res = await store.setItem({
              id: item.id,
              categoryParamItem: {
                ...params,
                paramId,
              },
            });
            if (res) modal.unmount();
          }}
        />
      ),
    });
  };

  const handleChangeCategoryId = (value: string): void => {
    setCategoryId(value);
    setParamId(""); // 重置 paramId
    store.$setParams({ categoryId: value, paramId: "" });
    store.$setList([]); // 清空列表
  };

  const handleChangeParamId = (value: string): void => {
    setParamId(value);
    store.$setParams({ categoryId, paramId: value });
    void store.getList();
  };

  return (
    <Content>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle
            insert={
              <Button
                type="primary"
                onClick={handleAddAccount}
                disabled={!categoryId || !paramId}
              >
                新增分类参数选项
              </Button>
            }
          >
            分类参数选项管理
          </HeaderTitle>
        </Content.Header>
        <Content.Header>
          <OverallSituationSearch info={{ categoryId, paramId }}>
            <Item name="categoryId">
              <SelectCategory onChange={handleChangeCategoryId} />
            </Item>
            <Item name="paramId">
              <SelectCategoryParam
                categoryId={categoryId}
                onChange={handleChangeParamId}
                key={categoryId} // 添加 key 以强制重新渲染
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

export default observer(CategoryParamItemMain);
