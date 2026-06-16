import { FC, useContext, useEffect, useMemo } from "react";
import { observer } from "mobx-react";
import { InputNumber, Pagination, Space, Spin } from "antd";

import Button from "@/components/button";
import PageToolbar, { FilterField } from "@/components/page-toolbar";
import MorTable from "@/components/table";
import { toastActionResult } from "@/utils/common/mutation-success";
import RootContext from "@/stores/root-context";
import { DictCode } from "@/constants/dict-code";
import { getDictLabel } from "@/utils/common/dict";
import RunComponents from "@/components/run-component";

import StoreContext from "../store";
import { API } from "../types/api";
import WorkStatisticsChart, { WorkStatisticsItem } from "./work-statistics-chart";
import ReportWorkModal from "./report-work-modal";
import { useRegisterUserPageToolbar } from "../pages/user-page-layout";

const WorkTab: FC = () => {
  const store = useContext(StoreContext);
  const root = useContext(RootContext);

  const subjectDict = useMemo(() => {
    const list = root.getEnumData(DictCode.WORK_SUBJECT) || [];
    return {
      label: (value: unknown) => getDictLabel(list, value),
    };
  }, [root.enumList]);

  const statisticsData: WorkStatisticsItem[] = useMemo(() => {
    return (store.statistics || []).map((item) => ({
      label: subjectDict.label(item.subject),
      value: Number(item.num || 0),
    }));
  }, [store.statistics, subjectDict]);

  useEffect(() => {
    void store.refreshWork();
  }, [store]);

  const handleFilter = async (params: Partial<typeof store.filter>): Promise<void> => {
    store.$setFilter(params);
    await Promise.all([store.fetchStatistics(), store.fetchPage()]);
  };

  const openReportModal = (): void => {
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
        <ReportWorkModal
          {...state}
          title="上报课时"
          init={{
            date,
            year: store.filter.year || yyyy,
            month: store.filter.month || mm,
            items: {},
          }}
          onCancel={() => modal.unmount()}
          onOk={async (params: API.SubmitWork.Params) => {
            modal.setState({ loading: true });
            const ok = await store.submitWork(params);
            modal.setState({ loading: false });
            if (toastActionResult(ok, "上报成功", "上报失败")) {
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const columns = [
    { title: "上报日期", dataIndex: "date" },
    { title: "上报年份", dataIndex: "year", width: 120 },
    { title: "上报月份", dataIndex: "month", width: 120 },
    {
      title: "上报科目",
      dataIndex: "subject",
      render: (val: any) => subjectDict.label(val),
    },
    { title: "时数数量", dataIndex: "num", width: 120 },
  ];

  const toolbar = useMemo(
    () => (
      <PageToolbar
        filters={
          <>
            <FilterField label="年份" width={140}>
              <InputNumber
                style={{ width: "100%" }}
                value={store.filter.year}
                onChange={(val) => {
                  void handleFilter({ year: Number(val || 0), current: 1 });
                }}
                min={2000}
                max={2100}
              />
            </FilterField>
            <FilterField label="月份" width={120}>
              <InputNumber
                style={{ width: "100%" }}
                value={store.filter.month}
                onChange={(val) => {
                  void handleFilter({ month: Number(val || 0), current: 1 });
                }}
                min={1}
                max={12}
              />
            </FilterField>
          </>
        }
        actions={
          <Space>
            <Button type="primary" action="add" onClick={openReportModal}>
              上报课时
            </Button>
            <Button
              action="reset"
              onClick={() => {
                void store.refreshWork();
              }}
            >
              刷新
            </Button>
          </Space>
        }
      />
    ),
    [store.filter.year, store.filter.month]
  );

  useRegisterUserPageToolbar(toolbar);

  return (
    <Spin spinning={store.loading}>
       <div className="mb-2">
          <WorkStatisticsChart title="当前用户课时统计（按科目）" data={statisticsData} />
       </div>

      <div className="theme-panel p-6 h-[300px]">
        <div className="text-base font-semibold mb-4">课时记录</div>
        <MorTable rowKey="id" columns={columns as any} dataSource={store.page.records || []} pagination={false} />
        <div className="flex justify-end mt-4">
          <Pagination
            current={store.filter.current}
            pageSize={store.filter.size}
            total={store.page.total || 0}
            showSizeChanger
            onChange={(current, pageSize) => {
              store.$setFilter({ current, size: pageSize });
              void store.fetchPage();
            }}
          />
        </div>
      </div>
    </Spin>
  );
};

export default observer(WorkTab);
