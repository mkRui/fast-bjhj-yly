import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Form, Input, Pagination } from "antd";

import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import PageToolbar from "@/components/page-toolbar";
import MorTable, { TablePageMain } from "@/components/table";
import Button from "@/components/button";
import OverallSituationSearch from "@/components/overall-situation-search";
import RunComponents from "@/components/run-component";
import { toastActionResult } from "@/utils/common/mutation-success";

import StoreContext from "../store";
import { API } from "../types/api";
import CategoryFormModal from "../components/form-modal";

const Item = Form.Item;

const AmsCategoryMain: FC = () => {
  const store = useContext(StoreContext);

  const handleAdd = (): void => {
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <CategoryFormModal
          {...state}
          title="新增资产分类"
          onCancel={() => modal.unmount()}
          onOk={async (params) => {
            modal.setState({ loading: true });
            const ok = await store.addItem(params as API.Add.Params);
            modal.setState({ loading: false });
            if (toastActionResult(ok, "保存成功", "保存失败")) {
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const handleEdit = (record: API.Page.RecordItem): void => {
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <CategoryFormModal
          {...state}
          title="编辑资产分类"
          init={record}
          onCancel={() => modal.unmount()}
          onOk={async (params) => {
            modal.setState({ loading: true });
            const ok = await store.editItem(params as API.Edit.Params);
            modal.setState({ loading: false });
            if (toastActionResult(ok, "保存成功", "保存失败")) {
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const columns = [
    { title: "分类名称", dataIndex: "name" },
    { title: "分类编码", dataIndex: "code", width: 180 },
    {
      title: "操作",
      width: 180,
      fixed: "right" as const,
      render: (_: any, record: API.Page.RecordItem) => (
        <Button.Group>
          <Button type="link" linkType="warning" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button
            type="link"
            linkType="danger"
            action="del"
            onConfirm={async () => {
              const ok = await store.delItem(record.id);
              toastActionResult(ok, "删除成功", "删除失败");
            }}
          >
            删除
          </Button>
        </Button.Group>
      ),
    },
  ];

  const handleChange = (page: number): void => {
    store.$setParams({ current: page });
    void store.getList();
  };

  const handlePageSize = (_current: number, size: number): void => {
    store.$setParams({ current: 1, size });
    void store.getList();
  };

  const onFinish = (params: any) => {
    store.$setParams({ ...params, current: 1 });
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
  }, [store]);

  return (
    <Content style={{ flex: 1 }}>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle>资产分类</HeaderTitle>
        </Content.Header>
        <Content.Header>
          <PageToolbar
            filters={
              <OverallSituationSearch info={store.params} onFinish={onFinish} onReset={onReset}>
                <Item name="keyword">
                  <Input placeholder="请输入分类名称/编码关键字" />
                </Item>
              </OverallSituationSearch>
            }
            actions={
              <Button type="primary" onClick={handleAdd}>
                新增资产分类
              </Button>
            }
          />
        </Content.Header>
        <TablePageMain loading={store.loading}>
          <MorTable
            bordered
            pagination={false}
            dataSource={store.list}
            columns={columns as any}
            rowKey={(record: any) => record.id}
            loading={store.loading}
            auto
          />
        </TablePageMain>
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
      </Content.Layout>
    </Content>
  );
};

export default observer(AmsCategoryMain);

