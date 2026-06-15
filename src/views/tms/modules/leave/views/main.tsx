import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Pagination, Select, Space, Spin } from "antd";

import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import CheckStatusTag from "@/components/check-status-tag";
import MorTable from "@/components/table";
import Button from "@/components/button";
import RunComponents from "@/components/run-component";
import { toastActionResult } from "@/utils/common/mutation-success";

import StoreContext from "../store";
import { API } from "../types/api";
import CheckLeaveModal from "../components/check-modal";
import { DictCode } from "@/constants/dict-code";
import { useDict } from "@/hooks/use-dict";

const Option = Select.Option;

const LeaveMain: FC = () => {
  const store = useContext(StoreContext);
  const leaveTypeDict = useDict(DictCode.LEAVE_TYPE);

  useEffect(() => {
    void store.fetchPage();
  }, [store]);

  const uiCurrent = Math.max(1, Number(store.params.current || "0") + 1);

  const openCheckModal = (record: API.Page.RecordItem): void => {
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <CheckLeaveModal
          {...state}
          title="审核请假申请"
          init={{
            id: record.id,
            checkedFlag: record.checkedFlag ?? true,
            checkedComment: record.checkedComment || "",
          }}
          onCancel={() => modal.unmount()}
          onOk={async (params: API.Check.Params) => {
            modal.setState({ loading: true });
            const ok = await store.checkLeave(params);
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
    { title: "审核意见", dataIndex: "checkedComment", width: 200 },
    {
      title: "审核状态",
      dataIndex: "checkedFlag",
      width: 120,
      render: (val: boolean | null) => <CheckStatusTag checkedFlag={val} />,
    },
    { title: "请假日期", dataIndex: "leaveDate", width: 140 },
    {
      title: "时间",
      width: 180,
      render: (_: any, record: any) =>
        `${record.leaveStartTime || "-"} ~ ${record.leaveEndTime || "-"}`,
    },
    { title: "请假数量", dataIndex: "leaveNum", width: 120 },
    {
      title: "请假类型",
      dataIndex: "leaveType",
      width: 120,
      render: (val: unknown) => leaveTypeDict.label(val),
    },
    { title: "请假事由", dataIndex: "leaveReason" },
    { title: "审核人", dataIndex: "checkedUserName", width: 140 },
    {
      title: "操作",
      width: 120,
      render: (_: any, record: API.Page.RecordItem) =>
        record.checkedFlag === null ? null : (
          <Button
            type="link"
            onClick={() => {
              openCheckModal(record);
            }}
          >
            审核
          </Button>
        ),
    },
  ];

  const handleChange = (current: number): void => {
    store.$setParams({ current: String(Math.max(0, current - 1)) });
    void store.fetchPage();
  };

  const handlePageSize = (current: number, size: number): void => {
    store.$setParams({
      current: String(Math.max(0, current - 1)),
      size: String(size),
    });
    void store.fetchPage();
  };

  return (
    <Content style={{ flex: 1 }}>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle>请假管理</HeaderTitle>
        </Content.Header>
        <Content.Header>
          <Space>
            <Select
              allowClear
              style={{ width: 180 }}
              placeholder="审核状态"
              value={store.params.checkedFlag}
              onChange={(v) => {
                store.$setParams({ checkedFlag: v || undefined, current: "0" });
                void store.fetchPage();
              }}
            >
              <Option value="true">已审核</Option>
              <Option value="false">未审核</Option>
            </Select>
            <Button
              action="reset"
              onClick={() => {
                store.$setParams({
                  checkedFlag: undefined,
                  current: "0",
                  size: "10",
                });
                void store.fetchPage();
              }}
            >
              重置
            </Button>
          </Space>
        </Content.Header>
        <Content.Main>
          <Spin spinning={store.loading}>
            <MorTable
              bordered
              pagination={false}
              dataSource={store.page.records || []}
              columns={columns as any}
              rowKey={(record: any) => record.id}
              loading={store.loading}
              auto
            />
          </Spin>
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
            total={store.page.total || 0}
            current={uiCurrent}
          />
        </div>
      </Content.Footer>
    </Content>
  );
};

export default observer(LeaveMain);
