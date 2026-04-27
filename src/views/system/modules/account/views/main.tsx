import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Pagination, Form, Input } from "antd";

import { Content } from "@/components/container";
import RunComponents from "@/components/run-component";
import HeaderTitle from "@/components/card-header";
import MorTable from "@/components/table";
import { fullDateFormat } from "@/utils/common/time-format";
import Button from "@/components/button";
import { toast } from "@/components/message";

import AccountStore from "../store/index";
import { API } from "../types/api";
import OverallSituationSearch from "@/components/overall-situation-search";
import AccountModal from "../components/account-modal";

const Item = Form.Item;
const AccountMain: FC = () => {
  const store = useContext(AccountStore);

  const columns = [
    {
      title: "昵称",
      dataIndex: "nickname",
    },
    {
      title: "账号",
      dataIndex: "account",
    },
    {
      title: "创建时间",
      dataIndex: "createdTime",
      render: (time: string) => {
        return fullDateFormat(time);
      },
    },
    {
      title: "操作",
      dataIndex: "",
      width: 170,
      fixed: "right" as const,
      render: (_text: any, record: API.Account.Records) => {
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
              title="确定重置密码吗?"
              linkType="danger"
              onConfirm={() => handleResetAccountPassword(record.id)}
            >
              重置密码
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
          title="新增用户"
          onCancel={() => {
            modal.unmount();
          }}
          onOk={async (params: API.AddAccount.Params): Promise<void> => {
            const res = await store.addItem({
              ...params,
            });
            if (res) {
              toast("success", "新增成功");
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const handleEditAccount = (item: API.Account.Records): void => {
    const modal = new RunComponents({
      state: {},
      render: () => (
        <AccountModal
          title="编辑用户"
          onCancel={() => {
            modal.unmount();
          }}
          info={item}

          onOk={async (params: API.AddAccount.Params): Promise<void> => {
            const res = await store.setItem({
              id: item.id,
              user: params,
            });
            if (res) {
              toast("success", "编辑成功");
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const handleResetAccountPassword = async (id: string): Promise<void> => {
    const res = await store.resetPassword({ id });
    if (res) {
      toast("success", "重置密码成功");
    }
  };

  const handleChange = (page: number): void => {
    store.$setParams({
      current: page,
    });
  };

  const handlePageSize = (_current: number, size: number): void => {
    store.$setParams({
      current: 1,
      size,
    });
    void store.getList();
  };

  const onFinish = (params: any) => {
    store.$setParams({
      ...params,
      current: 1,
    });
    void store.getList();
  };

  const onReset = () => {
    store.$setParams({
      current: 1,
      size: store.params.size,
      keyword: undefined,
    });
    void store.getList();
  };

  useEffect(() => {
    void store.getList();
  }, []);

  return (
    <Content>
      <Content.Layout>
        <Content.Header>
          <HeaderTitle
            insert={
              <Button type="primary" onClick={handleAddAccount}>
                新增用户
              </Button>
            }
          >
            用户管理
          </HeaderTitle>
        </Content.Header>
        <Content.Header>
          <OverallSituationSearch
            info={store.params}
            onFinish={onFinish}
            onReset={onReset}
          >
            <Item name="keyword">
              <Input placeholder="请搜索用户名关键字" />
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
      <Content.Footer>
        <div
          style={{
            height: "49px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 12px",
            boxSizing: "border-box",
          }}
        >
          <div></div>
          <Pagination
            showTotal={(total) => `共有 ${total} 条`}
            showSizeChanger={true}
            showQuickJumper={true}
            onChange={handleChange}
            onShowSizeChange={handlePageSize}
            total={store.data.total}
            current={store.data.current}
          />
        </div>
      </Content.Footer>
    </Content>
  );
};

export default observer(AccountMain);
