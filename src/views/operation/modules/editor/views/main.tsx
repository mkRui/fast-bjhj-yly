import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";

import { Content } from "@/components/container";
import RunComponents from "@/components/run-component";
import HeaderTitle from "@/components/card-header";
import MorTable from "@/components/table";
import { fullDateFormat } from "@/utils/common/time-format";
import Button from "@/components/button";
import { toast } from "@/components/message";

import AccountStore from "../store/index";
import { API } from "../types/api";
import AccountModal from "../components/account-modal";

const AccountMain: FC = () => {
  const store = useContext(AccountStore);

  const columns = [
    {
      title: "昵称",
      dataIndex: "nickname",
    },
    {
      title: "手机号码",
      dataIndex: "phone",
    },
    {
      title: "邮箱",
      dataIndex: "email",
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
      render: (_text: any, record: API.Account.Data) => {
        return (
          <Button.Group>
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

  // handleMethods
  const handleAddAccount = (): void => {
    const modal = new RunComponents({
      state: {},
      render: () => (
        <AccountModal
          title="新增编辑"
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

  const handleResetAccountPassword = async (id: string): Promise<void> => {
    const res = await store.resetPassword({ id });
    if (res) {
      toast("success", "重置密码成功");
    }
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
              <Button type="primary" onClick={handleAddAccount}>
                新增编辑
              </Button>
            }
          >
            编辑管理
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
