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
import RoleResourceModal from "@/micro/role-resource-modal";

const AccountMain: FC = () => {
  const store = useContext(AccountStore);

  const columns = [
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "代码",
      dataIndex: "code",
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
              linkType="primary"
              onClick={() => handleConcatRes(record)}
            >
              关联资源
            </Button>
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
          title="新增角色"
          onCancel={() => {
            modal.unmount();
          }}
          onOk={async (params: API.AddRole.Params): Promise<void> => {
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

  const handleConcatRes = (item: API.List.Data) => {
    const modal = new RunComponents({
      render: () => (
        <RoleResourceModal
          id={item.id}
          onCancel={() => {
            modal.unmount();
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
          title="编辑角色"
          info={item}
          onCancel={() => {
            modal.unmount();
          }}
          onOk={async (params: API.AddRole.Params): Promise<void> => {
            modal.setState({ loading: true });
            const res = await store.setItem({
              ...params,
              roleId: item.id,
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
                新增角色
              </Button>
            }
          >
            角色管理
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

export default observer(AccountMain);
