import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Pagination, Space, Spin } from "antd";

import Button from "@/components/button";
import CheckStatusTag from "@/components/check-status-tag";
import MorTable from "@/components/table";
import RunComponents from "@/components/run-component";
import { toastActionResult } from "@/utils/common/mutation-success";
import { DictCode } from "@/constants/dict-code";
import { useDict } from "@/hooks/use-dict";

import StoreContext from "../store";
import { API } from "../types/api";
import LeaveSubmitModal from "./leave-submit-modal";

const LeaveTab: FC = () => {
  const store = useContext(StoreContext);
  const leaveTypeDict = useDict(DictCode.LEAVE_TYPE);

  useEffect(() => {
    void store.fetchLeavePage();
  }, [store]);

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
    { title: "原因", dataIndex: "leaveReason" },
  ];

  return (
    <Spin spinning={store.leaveLoading}>
      <div className="theme-panel p-6 mb-4">
        <div className="flex items-center justify-end gap-4">
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
        </div>
      </div>

      <div className="theme-panel p-6 h-[300px]">
        <div className="text-base font-semibold mb-4">请假记录</div>
        <MorTable
          rowKey="id"
          columns={columns as any}
          dataSource={store.leavePage.records || []}
          pagination={false}
        />
        <div className="flex justify-end mt-4">
          <Pagination
            current={store.leaveFilter.current}
            pageSize={store.leaveFilter.size}
            total={store.leavePage.total || 0}
            showSizeChanger
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
