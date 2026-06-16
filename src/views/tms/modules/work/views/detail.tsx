import { FC, useContext, useEffect, useMemo } from "react";
import { observer } from "mobx-react";
import { Pagination, Spin } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import MorTable from "@/components/table";
import Button from "@/components/button";
import RootContext from "@/stores/root-context";
import { DictCode } from "@/constants/dict-code";
import { getDictLabel } from "@/utils/common/dict";
import { TmsFullPath } from "@/views/tms/router/path";
import WorkStatisticsChart, { WorkStatisticsItem } from "@/views/welcome/components/work-statistics-chart";

import StoreContext from "../store";

const WorkDetail: FC = () => {
  const store = useContext(StoreContext);
  const root = useContext(RootContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const teacherId = searchParams.get("teacherId") || "";
  const teacherName = searchParams.get("teacherName") || "";
  const year = Number(searchParams.get("year") || store.params.year);
  const month = Number(searchParams.get("month") || store.params.month);

  const subjectDict = useMemo(() => {
    const list = root.getEnumData(DictCode.WORK_SUBJECT) || [];
    return {
      label: (value: unknown) => getDictLabel(list, value),
    };
  }, [root.enumList]);

  useEffect(() => {
    if (!teacherId) {
      navigate(TmsFullPath.WORK, { replace: true });
      return;
    }
    store.$setDetailParams({
      selectedTeacherId: teacherId,
      year,
      month,
      current: 1,
      size: 10,
    });
    void Promise.all([store.getDetailChart(), store.getDetailList()]);
  }, [teacherId, year, month, store, navigate]);

  const statisticsData: WorkStatisticsItem[] = useMemo(() => {
    const map = new Map<string, number>();
    store.detailChartRecords.forEach((record) => {
      const key = String(record.subject ?? "");
      map.set(key, (map.get(key) || 0) + Number(record.num || 0));
    });
    return Array.from(map.entries()).map(([key, value]) => ({
      label: subjectDict.label(key),
      value,
    }));
  }, [store.detailChartRecords, subjectDict]);

  const columns = [
    { title: "上报日期", dataIndex: "date" },
    { title: "上报年份", dataIndex: "year", width: 120 },
    { title: "上报月份", dataIndex: "month", width: 120 },
    {
      title: "上报科目",
      dataIndex: "subject",
      render: (val: unknown) => subjectDict.label(val),
    },
    { title: "上报数量", dataIndex: "num", width: 120 },
  ];

  const handleChange = (page: number): void => {
    store.$setDetailParams({ current: page });
    void store.getDetailList();
  };

  const handlePageSize = (_current: number, size: number): void => {
    store.$setDetailParams({ current: 1, size });
    void store.getDetailList();
  };

  return (
    <Content style={{ flex: 1 }}>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle
            insert={
              <Button action="reset" onClick={() => navigate(TmsFullPath.WORK)}>
                返回列表
              </Button>
            }
          >
            课时详情{teacherName ? ` - ${teacherName}` : ""}
          </HeaderTitle>
        </Content.Header>
        <Content.Main style={{ overflow: "unset" }}>
          <Spin spinning={store.detailLoading}>
            <div className="theme-panel p-6 mb-4">
              <div className="text-gray-600 mb-4">
                {teacherName || "教师"} · {year}年{month}月
              </div>
              <WorkStatisticsChart title="当前用户课时统计（按科目）" data={statisticsData} />
            </div>

            <div className="theme-panel p-6">
              <div className="text-base font-semibold mb-4">课时记录</div>
              <MorTable
                bordered
                rowKey={(record) => record.id}
                columns={columns as any}
                dataSource={store.detailData.records || []}
                pagination={false}
                auto={true}
              />
            </div>
          </Spin>
        </Content.Main>
        <Content.Footer>
          <div
            style={{
              height: "49px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "0px 12px",
              boxSizing: "border-box",
            }}
          >
            <Pagination
              showTotal={(total) => `共有 ${total} 条`}
              showSizeChanger={true}
              showQuickJumper={true}
              onChange={handleChange}
              onShowSizeChange={handlePageSize}
              total={store.detailData.total || 0}
              current={store.detailData.current || 1}
            />
          </div>
        </Content.Footer>
      </Content.Layout>
    </Content>
  );
};

export default observer(WorkDetail);
