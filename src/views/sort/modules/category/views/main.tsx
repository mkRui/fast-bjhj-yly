import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";

import { Content } from "@/components/container";
import RunComponents from "@/components/run-component";
import HeaderTitle from "@/components/card-header";
import MorTable from "@/components/table";
import Button from "@/components/button";

import AccountStore from "../store";
import { API } from "../types/api";
import AccountModal from "../components/form-modal";

const CategoryMain: FC = () => {
  const store = useContext(AccountStore);

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
              onConfirm={() => store.delItem({ id: record.id })}
            >
              删除
            </Button>
          </Button.Group>
        );
      },
    },
  ];

  // handleMethods
  const handleAddAccount = (): void => {
    const modal = new RunComponents({
      state: {
        loading: false,
      },
      render: (state) => (
        <AccountModal
          {...state}
          title="新增分类"
          onCancel={() => {
            modal.unmount();
          }}
          onOk={async (params: API.AddCategory.Params): Promise<void> => {
            modal.setState({ loading: true });
            const res = await store.addItem({
              ...params,
            });
            modal.setState({ loading: false });
            if (res) {
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const handleEditAccount = (item: API.List.Data): void => {
    const modal = new RunComponents({
      state: {
        loading: false,
      },
      render: (state) => (
        <AccountModal
          {...state}
          title="编辑分类"
          info={item}
          onCancel={() => {
            modal.unmount();
          }}
          onOk={async (params: API.AddCategory.Params): Promise<void> => {
            modal.setState({ loading: true });
            const res = await store.setItem({
              id: item.id,
              category: {
                ...params,
              },
            });
            modal.setState({ loading: false });
            if (res) {
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  useEffect(() => {
    store.getList();
  }, []);

  return (
    <Content>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle
            insert={
              <Button type="primary" onClick={handleAddAccount}>
                新增分类
              </Button>
            }
          >
            分类管理
          </HeaderTitle>
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

export default observer(CategoryMain);
