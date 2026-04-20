import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";

import { Content } from "@/components/container";
import RunComponents from "@/components/run-component";
import HeaderTitle from "@/components/card-header";
import MorTable from "@/components/table";
import Button from "@/components/button";

import AccountStore from "../store";
import { API } from "../types/api";
import FormModal from "../components/form-modal";

const ResourcesMain: FC = () => {
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
      width: 140,
      fixed: "right" as const,
      render: (_text: any, record: API.List.Data) => {
        return (
          <Button.Group>
            <Button
              type="link"
              linkType="primary"
              onClick={() => handleAdd(record)}
            >
              新增
            </Button>
            <Button
              type="link"
              linkType="warning"
              onClick={() => handleEdit(record)}
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
  const handleAdd = (item?: API.List.Data): void => {
    const modal = new RunComponents({
      state: {
        loading: false,
      },
      render: (state) => (
        <FormModal
          {...state}
          title="新增资源"
          onCancel={() => {
            modal.unmount();
          }}
          onOk={async (params: API.AddRes.Params): Promise<void> => {
            modal.setState({ loading: true });
            const res = await store.addItem({
              ...params,
              parentId: item?.id,
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

  const handleEdit = (item: API.List.Data): void => {
    const modal = new RunComponents({
      state: {
        loading: false,
      },
      render: (state) => (
        <FormModal
          {...state}
          title="编辑资源"
          info={item}
          onCancel={() => {
            modal.unmount();
          }}
          onOk={async (params: API.AddRes.Params): Promise<void> => {
            modal.setState({ loading: true });
            const res = await store.setItem({
              ...params,
              parentId: item.parentId,
              resId: item.id,
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
              <Button type="primary" onClick={() => handleAdd()}>
                新增资源
              </Button>
            }
          >
            资源管理
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
            childrenColumnName="childrenList"
          />
        </Content.Main>
      </Content.Layout>
    </Content>
  );
};

export default observer(ResourcesMain);
