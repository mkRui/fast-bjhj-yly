import { FC, useCallback, useContext, useEffect, useMemo } from "react";
import { observer } from "mobx-react";
import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import Button from "@/components/button";
import { InputNumber, Pagination, Space, Spin } from "antd";
import MorTable from "@/components/table";
import { toast } from "@/components/message";
import RootContext from "@/stores/root-context";
import RunComponents from "@/components/run-component";

import StoreContext from "../store";
import { API } from "../types/api";
import WorkStatisticsChart, { WorkStatisticsItem } from "../components/work-statistics-chart";
import ReportWorkModal from "../components/report-work-modal";

const WelcomeMain: FC = () => {
  const store = useContext(StoreContext);
  const root = useContext(RootContext);

  const subjectDict = useMemo(() => {
    const list = root.getEnumData("TEACHER_WORK_SUBJECT") || [];
    const map = new Map<string, string>();
    list.forEach((item) => map.set(String(item.code), String(item.desc)));
    return map;
  }, [root]);

  const subjectLabel = useCallback((value: unknown): string => {
    const key = String(value ?? "");
    return subjectDict.get(key) || key || "-";
  }, [subjectDict]);

  const statisticsData: WorkStatisticsItem[] = useMemo(() => {
    return (store.statistics || []).map((item) => ({
      label: subjectLabel(item.subject),
      value: Number(item.num || 0),
    }));
  }, [store.statistics, subjectLabel]);

  useEffect(() => {
    void store.refreshAll();
  }, [store]);

  const handleFilter = async (params: Partial<typeof store.filter>): Promise<void> => {
    store.$setFilter(params);
    await Promise.all([store.fetchStatistics(), store.fetchPage()]);
  };

  const openReportModal = (): void => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = now.getMonth() + 1;
    const date = `${yyyy}-${String(mm).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <ReportWorkModal
          {...state}
          title="上报工时"
          init={{
            date,
            year: store.filter.year || yyyy,
            month: store.filter.month || mm,
            subject: 0,
            num: 0,
          }}
          onCancel={() => modal.unmount()}
          onOk={async (params: API.SubmitWork.Params) => {
            modal.setState({ loading: true });
            const ok = await store.submitWork(params);
            modal.setState({ loading: false });
            if (ok) {
              toast("success", "上报成功");
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
      render: (val: any) => subjectLabel(val),
    },
    { title: "时数数量", dataIndex: "num", width: 120 },
  ];

  return (
    <Content style={{ flex: 1 }}>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle>欢迎</HeaderTitle>
        </Content.Header>
        <Content.Main style={{ overflow: "unset" }}>
          <Spin spinning={store.loading}>
            <div className="p-6 bg-white rounded shadow mb-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xl font-semibold mb-1">工时上报</div>
                  <div className="text-gray-600">
                    当前周期：{store.period?.name || "-"}
                    {store.period?.currentFlag ? "（当前）" : ""}
                  </div>
                </div>
                <Space>
                  <Button type="primary" action="add" onClick={openReportModal}>
                    上报工时
                  </Button>
                  <Button
                    action="reset"
                    onClick={() => {
                      void store.refreshAll();
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">年份</div>
                      <InputNumber
                        style={{ width: "100%" }}
                        value={store.filter.year}
                        onChange={(val) => {
                          void handleFilter({ year: Number(val || 0), current: 1 });
                        }}
                        min={2000}
                        max={2100}
                      />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">月份</div>
                      <InputNumber
                        style={{ width: "100%" }}
                        value={store.filter.month}
                        onChange={(val) => {
                          void handleFilter({ month: Number(val || 0), current: 1 });
                        }}
                        min={1}
                        max={12}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-4 md:col-span-2">
                  <WorkStatisticsChart
                    title="当前用户工时统计（按科目）"
                    data={statisticsData}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded shadow">
              <div className="text-base font-semibold mb-4">工时记录</div>
              <MorTable
                rowKey="id"
                columns={columns as any}
                dataSource={store.page.records || []}
                pagination={false}
              />
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
        </Content.Main>
      </Content.Layout>
    </Content>
  );
};

export default observer(WelcomeMain);
