import { FC, useContext } from "react";
import { observer } from "mobx-react";
import { Form, Input, Pagination } from "antd";

import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import MorTable from "@/components/table";
import Button from "@/components/button";
import OverallSituationSearch from "@/components/overall-situation-search";
import RunComponents from "@/components/run-component";
import { toast } from "@/components/message";
import AssetsCategorySelect from "@/micro/assets-category-select";

import StoreContext from "../store";
import { API } from "../types/api";
import ConsumablesFormModal from "../components/form-modal";
import StockInModal from "../components/stockin-modal";
import ConsumablesApplyListModal from "../components/apply-list-modal";

const Item = Form.Item;

const AmsConsumablesMain: FC = () => {
  const store = useContext(StoreContext);

  const handleAdd = (): void => {
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <ConsumablesFormModal
          {...state}
          title="新增易耗品"
          init={{ categoryId: store.params.categoryId }}
          onCancel={() => modal.unmount()}
          onOk={async (params) => {
            modal.setState({ loading: true });
            const ok = await store.addItem(params as API.Add.Params);
            modal.setState({ loading: false });
            if (ok) {
              toast("success", "保存成功");
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
        <ConsumablesFormModal
          {...state}
          title="编辑易耗品"
          init={record}
          onCancel={() => modal.unmount()}
          onOk={async (params) => {
            modal.setState({ loading: true });
            const ok = await store.editItem(params as API.Edit.Params);
            modal.setState({ loading: false });
            if (ok) {
              toast("success", "保存成功");
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const handleStockIn = (record: API.Page.RecordItem): void => {
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <StockInModal
          {...state}
          title="易耗品入库"
          init={{ consumablesId: record.id }}
          onCancel={() => modal.unmount()}
          onOk={async (params) => {
            modal.setState({ loading: true });
            const ok = await store.stockIn(params);
            modal.setState({ loading: false });
            if (ok) {
              toast("success", "入库成功");
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const handleApplyList = (record: API.Page.RecordItem): void => {
    const modal = new RunComponents({
      state: {},
      render: () => (
        <ConsumablesApplyListModal
          title={`易耗品申请：${record.name || record.selfCode || record.id}`}
          consumablesId={record.id}
          onCancel={() => modal.unmount()}
        />
      ),
    });
  };

  const columns = [
    { title: "资产分类", dataIndex: "categoryId", width: 160 },
    { title: "易耗品名称", dataIndex: "name", width: 220 },
    { title: "易耗品代码", dataIndex: "selfCode", width: 180 },
    { title: "完整代码", dataIndex: "fullCode", width: 200 },
    { title: "库存总数", dataIndex: "totalNum", width: 120 },
    { title: "可借数量", dataIndex: "availableNum", width: 120 },
    { title: "备注", dataIndex: "remark" },
    {
      title: "操作",
      width: 320,
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
              if (ok) toast("success", "删除成功");
            }}
          >
            删除
          </Button>
          <Button type="link" onClick={() => handleStockIn(record)}>
            入库
          </Button>
          <Button type="link" onClick={() => handleApplyList(record)}>
            申请列表
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

  return (
    <Content>
      <Content.Layout>
        <Content.Header>
          <HeaderTitle
            insert={
              <Button type="primary" onClick={handleAdd}>
                新增易耗品
              </Button>
            }
          >
            易耗品管理
          </HeaderTitle>
        </Content.Header>
        <Content.Header>
          <OverallSituationSearch info={store.params} onFinish={onFinish} onReset={onReset}>
            <Item name="categoryId">
              <AssetsCategorySelect
                allowClear
                value={store.params.categoryId}
                onInitChange={(v?: string) => {
                  store.$setParams({ categoryId: v, current: 1 });
                  void store.getList();
                }}
                onChange={(v?: string) => {
                  store.$setParams({ categoryId: v, current: 1 });
                  void store.getList();
                }}
              />
            </Item>
            <Item name="keyword">
              <Input placeholder="请输入易耗品名称/代码关键字" allowClear />
            </Item>
          </OverallSituationSearch>
        </Content.Header>
        <Content.Main>
          <MorTable
            bordered
            pagination={false}
            dataSource={store.list}
            columns={columns as any}
            rowKey={(record: any) => record.id}
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

export default observer(AmsConsumablesMain);

