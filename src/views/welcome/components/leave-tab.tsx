import { FC, useContext, useEffect, useMemo } from "react";
import { observer } from "mobx-react";
import { Pagination, Select, Space, Spin } from "antd";

import Button from "@/components/button";
import PageToolbar, { FilterField } from "@/components/page-toolbar";
import CheckStatusTag from "@/components/check-status-tag";
import MorTable from "@/components/table";
import RunComponents from "@/components/run-component";
import { toastActionResult } from "@/utils/common/mutation-success";
import { DictCode } from "@/constants/dict-code";
import { useDict } from "@/hooks/use-dict";

import StoreContext from "../store";
import { API } from "../types/api";
import LeaveSubmitModal from "./leave-submit-modal";
import { useRegisterUserPageToolbar } from "../pages/user-page-layout";

const Option = Select.Option;

const LeaveTab: FC = () => {
  const store = useContext(StoreContext);
  const leaveTypeDict = useDict(DictCode.LEAVE_TYPE);

  useEffect(() => {
    void store.fetchLeavePage();
  }, [store]);

  const handleFilter = (params: Partial<typeof store.leaveFilter>): void => {
    store.$setLeaveFilter({ ...params, current: 1 });
    void store.fetchLeavePage();
  };

  const openLeaveModal = (): void => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = now.getMonth() + 1;
    const date = `${yyyy}-${String(mm).padStart(2, "0")}-${String(now.getDate()).padStart(
      2,
      "0"
    )}`;

    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <LeaveSubmitModal
          {...state}
          title="提交请假"
          init={{
            leaveDate: date,
          }}
          onCancel={() => modal.unmount()}
          onOk={async (params: API.LeaveSubmit.Params) => {
            modal.setState({ loading: true });
            const ok = await store.submitLeave(params);
            modal.setState({ loading: false });
            if (toastActionResult(ok, "提交成功", "提交失败")) {
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
      render: (_: any, record: any) =>
        `${record.leaveStartTime || "-"} ~ ${record.leaveEndTime || "-"}`,
      width: 180,
    },
    { title: "请假数量", dataIndex: "leaveNum", width: 120 },
    {
      title: "类型",
      dataIndex: "leaveType",
      width: 120,
      render: (val: unknown) => leaveTypeDict.label(val),
    },
    { title: "事由", dataIndex: "leaveReason" },
  ];

  const toolbar = useMemo(
    () => (
      <PageToolbar
        filters={
          <Space align="end" size={16} wrap>
            <FilterField label="审核状态" width={180}>
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="全部状态"
                value={store.leaveFilter.checkedFlag}
                onChange={(v) => {
                  handleFilter({ checkedFlag: v || undefined });
                }}
              >
                <Option value="true">已审核</Option>
                <Option value="false">未审核</Option>
              </Select>
            </FilterField>
            <Button
              action="reset"
              onClick={() => {
                store.$setLeaveFilter({ checkedFlag: undefined, current: 1, size: 10 });
                void store.fetchLeavePage();
              }}
            >
              重置
            </Button>
          </Space>
        }
        actions={
          <Space>
            <Button type="primary" action="add" onClick={openLeaveModal}>
              提交请假
            </Button>
            <Button
              action="reset"
              onClick={() => {
                void store.fetchLeavePage();
              }}
            >
              刷新
            </Button>
          </Space>
        }
      />
    ),
    [store.leaveFilter.checkedFlag]
  );

  useRegisterUserPageToolbar(toolbar);

  return (
    <Spin spinning={store.leaveLoading}>
      <div className="theme-panel p-6 h-[520px]">
        <div className="text-base font-semibold mb-4">请假记录</div>
        <MorTable
          rowKey="id"
          columns={columns as any}
          dataSource={store.leavePage.records || []}
          pagination={false}
          auto
        />
        <div className="flex justify-end mt-4">
          <Pagination
            current={store.leaveFilter.current}
            pageSize={store.leaveFilter.size}
            total={store.leavePage.total || 0}
            showSizeChanger
            showQuickJumper
            onChange={(current, pageSize) => {
              store.$setLeaveFilter({ current, size: pageSize });
              void store.fetchLeavePage();
            }}
          />
        </div>
      </div>
    </Spin>
  );
};

export default observer(LeaveTab);
