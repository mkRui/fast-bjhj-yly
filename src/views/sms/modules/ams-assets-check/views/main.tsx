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
import { DictCode } from "@/constants/dict-code";
import { useDict } from "@/hooks/use-dict";
import { toastActionResult } from "@/utils/common/mutation-success";

import StoreContext from "../store";
import { API } from "../types/api";
import AssetsCheckModal from "../components/check-modal";
import DisposeCheckModal from "../components/dispose-check-modal";

const Option = Select.Option;

const getDisposeType = (record: API.ApplyPage.RecordItem): number | undefined =>
  record.disposeType ?? record.dispose;

const AssetsCheckMain: FC = () => {
  const store = useContext(StoreContext);
  const assetsDisposeDict = useDict(DictCode.ASSETS_DISPOSE);
  const isChecked = isCheckFlagSet;

  useEffect(() => {
    void store.getList();
  }, [store]);

  const openApplyCheckModal = (record: API.ApplyPage.RecordItem): void => {
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <AssetsCheckModal
          {...state}
          title="固定资产申请审核"
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

  const openDisposeCheckModal = (record: API.ApplyPage.RecordItem): void => {
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <DisposeCheckModal
          {...state}
          title="固定资产处置审核"
          record={record}
          onCancel={() => modal.unmount()}
          onOk={async (params) => {
            modal.setState({ loading: true });
            const ok = await store.disposeCheck(params);
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
    { title: "资产分类", dataIndex: "categoryName", width: 140 },
    { title: "固定资产", dataIndex: "assetName", width: 180 },
    { title: "完整代码", dataIndex: "fullCode", width: 180 },
    { title: "申请审核意见", dataIndex: "applyCheckedComment", width: 180 },
    {
      title: "申请审核",
      width: 110,
      render: (_: unknown, record: API.ApplyPage.RecordItem) => (
        <CheckStatusTag checkedFlag={record.applyCheckedFlag} />
      ),
    },
    { title: "申请时间", dataIndex: "applyTime", width: 170 },
    { title: "申请人", dataIndex: "applyUserName", width: 120 },
    { title: "申请原因", dataIndex: "applyReason", width: 180 },
    {
      title: "处置类型",
      dataIndex: "disposeType",
      width: 110,
      render: (_: unknown, record: API.ApplyPage.RecordItem) =>
        assetsDisposeDict.label(getDisposeType(record)),
    },
    { title: "处置审核意见", dataIndex: "disposeCheckedComment", width: 180 },
    {
      title: "处置审核",
      width: 110,
      render: (_: unknown, record: API.ApplyPage.RecordItem) => (
        <CheckStatusTag checkedFlag={record.disposeCheckedFlag} unsetText="-" />
      ),
    },
    {
      title: "操作",
      width: 160,
      fixed: "right" as const,
      render: (_: unknown, record: API.ApplyPage.RecordItem) => {
        const canApplyCheck = !isChecked(record.applyCheckedFlag);
        const canDisposeCheck =
          record.applyCheckedFlag === true && !isChecked(record.disposeCheckedFlag);

        return (
          <Button.Group>
            {canApplyCheck ? (
              <Button
                type="link"
                linkType="warning"
                onClick={() => openApplyCheckModal(record)}
              >
                申请审核
              </Button>
            ) : null}
            {canDisposeCheck ? (
              <Button type="link" linkType="warning" onClick={() => openDisposeCheckModal(record)}>
                处置
              </Button>
            ) : null}
          </Button.Group>
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
          <HeaderTitle>固定资产审批</HeaderTitle>
        </Content.Header>
        <Content.Header>
          <PageToolbar
            filters={
              <Space align="end" size={16} wrap>
                <FilterField label="申请审核状态" width={160}>
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
                <FilterField label="处置审核状态" width={160}>
                  <Select
                    allowClear
                    placeholder="全部状态"
                    style={{ width: "100%" }}
                    value={store.params.disposeCheckedFlag}
                    onChange={(v) => {
                      store.$setParams({ disposeCheckedFlag: v || undefined, current: 1 });
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
                      disposeCheckedFlag: undefined,
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

export default observer(AssetsCheckMain);
