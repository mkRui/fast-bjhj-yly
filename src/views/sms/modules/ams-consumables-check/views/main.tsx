import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Pagination, Select, Space } from "antd";

import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import PageToolbar, { FilterField } from "@/components/page-toolbar";
import CheckStatusTag, { isCheckFlagSet } from "@/components/check-status-tag";
import MorTable from "@/components/table";
import Button from "@/components/button";
import RunComponents from "@/components/run-component";
import { toastActionResult } from "@/utils/common/mutation-success";
import { useRefreshOnMessageList } from "@/views/notification/hooks/use-refresh-on-message-list";

import StoreContext from "../store";
import { API } from "../types/api";
import ConsumablesCheckModal from "../components/check-modal";

const Option = Select.Option;

const ConsumablesCheckMain: FC = () => {
  const store = useContext(StoreContext);
  const isChecked = isCheckFlagSet;

  useEffect(() => {
    void store.getList();
  }, [store]);

  useRefreshOnMessageList(() => {
    void store.getList();
  });

  const openCheckModal = (record: API.ApplyPage.RecordItem): void => {
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <ConsumablesCheckModal
          {...state}
          title="易耗品审核"
          applyId={String(record.id)}
          onCancel={() => modal.unmount()}
          onOk={async (params) => {
            modal.setState({ loading: true });
            const ok = await store.applyCheck(params);
            modal.setState({ loading: false });
            if (toastActionResult(ok, "审核成功", "审核失败")) {
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const columns = [
    { title: "易耗品", dataIndex: "consumableName", width: 180 },
    { title: "申请数量", dataIndex: "applyNum", width: 100 },
    { title: "审核意见", dataIndex: "applyCheckedComment", width: 200 },
    {
      title: "审核状态",
      width: 110,
      render: (_: unknown, record: API.ApplyPage.RecordItem) => (
        <CheckStatusTag checkedFlag={record.applyCheckedFlag} />
      ),
    },
    { title: "申请时间", dataIndex: "applyTime", width: 180 },
    { title: "申请人", dataIndex: "applyUserName", width: 120 },
    { title: "申请原因", dataIndex: "applyReason" },
    {
      title: "操作",
      width: 100,
      fixed: "right" as const,
      render: (_: unknown, record: API.ApplyPage.RecordItem) => {
        if (isChecked(record.applyCheckedFlag)) return '-';
        return (
          <Button
            type="link"
            linkType="warning"
            onClick={() => openCheckModal(record)}
          >
            审核
          </Button>
        );
      },
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

  return (
    <Content>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle>易耗品审批</HeaderTitle>
        </Content.Header>
        <Content.Header>
          <PageToolbar
            filters={
              <Space align="end" size={16} wrap>
                <FilterField label="审核状态" width={180}>
                  <Select
                    allowClear
                    placeholder="全部状态"
                    style={{ width: "100%" }}
                    value={store.params.applyCheckedFlag}
                    onChange={(v) => {
                      store.$setParams({ applyCheckedFlag: v || undefined, current: 1 });
                      void store.getList();
                    }}
                  >
                    <Option value="true">已审核</Option>
                    <Option value="false">未审核</Option>
                  </Select>
                </FilterField>
                <Button
                  action="reset"
                  onClick={() => {
                    store.$setParams({
                      applyCheckedFlag: undefined,
                      current: 1,
                      size: 10,
                    });
                    void store.getList();
                  }}
                >
                  重置
                </Button>
              </Space>
            }
            actions={
              <Button action="reset" onClick={() => void store.getList()}>
                刷新
              </Button>
            }
          />
        </Content.Header>
        <Content.Main>
          <MorTable
            bordered
            pagination={false}
            dataSource={store.list}
            columns={columns}
            rowKey={(record) => record.id}
            loading={store.loading}
            auto
          />
        </Content.Main>
        <Content.Footer>
          <div
            style={{
              height: "49px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "0 12px",
            }}
          >
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

export default observer(ConsumablesCheckMain);
