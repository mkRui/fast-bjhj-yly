import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";

import { Content } from "@/components/container";
import RunComponents from "@/components/run-component";
import HeaderTitle from "@/components/card-header";
import PageToolbar from "@/components/page-toolbar";
import MorTable, { TablePageMain } from "@/components/table";
import Button from "@/components/button";
import { toastActionResult } from "@/utils/common/mutation-success";

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
              onConfirm={async () => {
                const ok = await store.delItem({ id: record.id });
                toastActionResult(ok, "删除成功", "删除失败");
              }}
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
            if (toastActionResult(res, "新增成功", "新增失败")) {
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
            if (toastActionResult(res, "编辑成功", "编辑失败")) {
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
    <Content style={{ flex: 1 }}>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle>角色管理</HeaderTitle>
        </Content.Header>
        <Content.Header>
          <PageToolbar
            actions={
              <Button type="primary" onClick={handleAddAccount}>
                新增角色
              </Button>
            }
          />
        </Content.Header>
        <TablePageMain loading={store.loading}>
          <MorTable
            bordered
            pagination={false}
            dataSource={store.list}
            columns={columns}
            rowKey={(record) => record.id}
            loading={store.loading}
            auto
          />
        </TablePageMain>
      </Content.Layout>
    </Content>
  );
};

export default observer(AccountMain);
