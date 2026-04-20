import { FC, useContext } from "react";
import { observer } from "mobx-react";
import { Pagination, Form, Input } from "antd";

import Layout, { Aside, Content, Main } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import MorTable from "@/components/table";
import Button from "@/components/button";
import RunComponents from "@/components/run-component/portal-component";

import AccountStore from "../store/index";
import { API } from "../types/api";
import OverallSituationSearch from "@/components/overall-situation-search";
import FormModal from "../components/form-modal";
import ChannelTree from "@/micro/channel-tree";
import Root from "@/stores/root-context";

const Item = Form.Item;
const Page: FC = () => {
  const store = useContext(AccountStore);

  const root = useContext(Root);

  const columns = [
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "操作",
      dataIndex: "",
      width: 170,
      fixed: "right" as const,
      render: (text: any, record: API.Pages.Records) => {
        console.log(text, record);
        return (
          <Button.Group>
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

  const handleAddPage = () => {
    const modal = new RunComponents({
      state: {
        loading: false,
      },
      render: (state) => (
        <FormModal
          {...state}
          title="新增页面"
          onCancel={() => {
            modal.unmount();
          }}
          onOk={async (params: API.AddItem.Params): Promise<void> => {
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

  const handleEdit = async (item: API.Pages.Records): Promise<void> => {
    const language = root.getEnumData("LANGUAGE")?.[0]?.code || "EN";
    const metaData = await store.getItem({ pageId: item.id, language });
    const modal = new RunComponents({
      state: {
        loading: false,
      },
      render: (state) => (
        <FormModal
          {...state}
          title="编辑页面"
          info={{
            ...item,
            channelIdList: store.params.query.channelId ? [store.params.query.channelId] : [],
            metaData: Array.isArray(metaData) ? metaData : [],
          }}
          onCancel={() => {
            modal.unmount();
          }}
          onOk={async (params: API.AddItem.Params): Promise<void> => {
            modal.setState({ loading: true });
            const res = await store.setItem({
              page: {
                ...params,
              },
              id: item.id,
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

  const onFinish = (params: any) => {
    store.$setParams({
      ...params,
      current: 1,
    });
    void store.getList();
  };

  const onReset = () => {
    store.$setParams({
      query: {
        current: 1,
        size: store.params.query.size,
        keyword: undefined,
      },
    });
    void store.getList();
  };

  const handleChange = (page: number): void => {
    store.$setParams({
      query: {
        current: page,
        size: store.params.query.size,
      },
    });
  };

  const handlePageSize = (_current: number, size: number): void => {
    store.$setParams({
      query: {
        current: 1,
        size,
      },
    });
    void store.getList();
  };

  return (
    <Content>
      <Content.Layout>
        <Content.Header>
          <HeaderTitle
            insert={
              <Button type="primary" onClick={handleAddPage}>
                新增页面
              </Button>
            }
          >
            页面管理
          </HeaderTitle>
        </Content.Header>
        <Content.Main>
          <Layout style={{ height: "100%", minHeight: "auto" }}>
            <Aside collapsed={false}>
              <div
                style={{
                  height: "100%",
                  paddingRight: 12,
                  boxSizing: "border-box",
                }}
              >
                <ChannelTree
                  mode="single"
                  value={store.params.query.channelId || undefined}
                  height="100%"
                  maxHeight="none"
                  onLoad={(firstId: string | undefined) => {
                    if (firstId) {
                      store.$setParams({
                        query: {
                          ...store.params.query,
                          current: 1,
                          channelId: firstId,
                        },
                      });
                      void store.getList();
                    }
                  }}
                  onChange={(id: string | string[]) => {
                    const channelId = Array.isArray(id) ? id[0] : id;
                    store.$setParams({
                      query: {
                        ...store.params.query,
                        current: 1,
                        channelId,
                      },
                    });
                    void store.getList();
                  }}
                />
              </div>
            </Aside>
            <Main
              style={{
                backgroundColor: "transparent",
                width: "calc(100% - 256px)",
              }}
            >
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ marginBottom: 12 }}>
                  <OverallSituationSearch onFinish={onFinish} onReset={onReset}>
                    <Item name="keyword">
                      <Input placeholder="请搜索关键字" />
                    </Item>
                  </OverallSituationSearch>
                </div>

                <MorTable
                  bordered
                  pagination={false}
                  dataSource={store.list}
                  columns={columns}
                  rowKey={(record) => record.id}
                  loading={store.loading}
                />
              </div>
            </Main>
          </Layout>
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
            current={store.data.current}
            showTotal={(total) => `共有 ${total} 条`}
            showSizeChanger={true}
            showQuickJumper={true}
            onChange={handleChange}
            onShowSizeChange={handlePageSize}
          />
        </div>
      </Content.Footer>
    </Content>
  );
};

export default observer(Page);
