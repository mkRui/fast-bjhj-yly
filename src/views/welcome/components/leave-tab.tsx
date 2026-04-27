import { FC, useContext } from "react";
import { observer } from "mobx-react";
import { Pagination, Space, Spin, Tag } from "antd";

import Button from "@/components/button";
import MorTable from "@/components/table";
import RunComponents from "@/components/run-component";
import { toast } from "@/components/message";
import LeavePeriodSelect from "@/micro/leave-period-list";

import StoreContext from "../store";
import { API } from "../types/api";
import LeaveSubmitModal from "./leave-submit-modal";

const LeaveTab: FC = () => {
  const store = useContext(StoreContext);

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
            leaveNum: 0,
            leaveType: 0,
          }}
          onCancel={() => modal.unmount()}
          onOk={async (params: API.LeaveSubmit.Params) => {
            modal.setState({ loading: true });
            const ok = await store.submitLeave(params);
            modal.setState({ loading: false });
            if (ok) {
              toast("success", "提交成功");
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const columns = [
    { title: "请假日期", dataIndex: "leaveDate", width: 140 },
    {
      title: "时间",
      render: (_: any, record: any) =>
        `${record.leaveStartTime || "-"} ~ ${record.leaveEndTime || "-"}`,
      width: 180,
    },
    { title: "请假数量", dataIndex: "leaveNum", width: 120 },
    { title: "类型", dataIndex: "leaveType", width: 120 },
    { title: "原因", dataIndex: "leaveReason" },
    {
      title: "审核状态",
      dataIndex: "checkedFlag",
      width: 120,
      render: (val: any) =>
        val ? <Tag color="green">已审核</Tag> : <Tag color="orange">未审核</Tag>,
    },
  ];

  return (
    <Spin spinning={store.leaveLoading}>
      <div className="p-6 bg-white rounded shadow mb-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xl font-semibold mb-1">请假</div>
            <div className="text-gray-600">请选择周期后查看记录</div>
          </div>
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

      <div className="p-6 bg-white rounded shadow mb-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-4 md:col-span-2">
            <div className="text-sm text-gray-600 mb-2">筛选</div>
            <div>
              <div className="text-sm text-gray-600 mb-1">周期</div>
              <LeavePeriodSelect
                value={store.leaveFilter.periodId}
                allowClear
                onInitChange={(v?: number) => {
                  store.$setLeaveFilter({ periodId: v, current: 1 });
                  void store.fetchLeavePage();
                }}
                onChange={(v?: number) => {
                  store.$setLeaveFilter({ periodId: v, current: 1 });
                  void store.fetchLeavePage();
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded shadow">
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

