import { FC, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { InputNumber, Pagination, Space, Spin } from "antd";

import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import MorTable from "@/components/table";
import RootContext from "@/stores/root-context";

import StoreContext from "../store";
import WorkStatisticsChart, { WorkStatisticsItem } from "@/views/welcome/components/work-statistics-chart";
import SelectTeacher from "../components/select-teacher";

const WorkMain: FC = () => {
  const store = useContext(StoreContext);
  const root = useContext(RootContext);

  const [teacherId, setTeacherId] = useState<number | undefined>(undefined);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [current, setCurrent] = useState(1);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState({
    size: 10,
    pages: 0,
    total: 0,
    records: [] as any[],
    current: 1,
  });

  const subjectDict = useMemo(() => {
    const list = root.getEnumData("TEACHER_WORK_SUBJECT") || [];
    const map = new Map<string, string>();
    list.forEach((item) => map.set(String(item.code), String(item.desc)));
    return map;
  }, [root]);

  const subjectLabel = useCallback(
    (value: unknown): string => {
      const key = String(value ?? "");
      return subjectDict.get(key) || key || "-";
    },
    [subjectDict]
  );

  const statisticsData: WorkStatisticsItem[] = useMemo(() => {
    const map = new Map<string, number>();
    (page.records || []).forEach((r: any) => {
      const k = String(r.subject ?? "");
      map.set(k, (map.get(k) || 0) + Number(r.num || 0));
    });
    return Array.from(map.entries()).map(([k, v]) => ({
      label: subjectLabel(k),
      value: v,
    }));
  }, [page.records, subjectLabel]);

  const loadRecords = useCallback(
    async (next?: Partial<{ year: number; month: number; current: number; size: number }>) => {
      if (!teacherId) return;
      const nextYear = next?.year ?? year;
      const nextMonth = next?.month ?? month;
      const nextCurrent = next?.current ?? current;
      const nextSize = next?.size ?? size;

      const data = await store.getWorkPage({
        teacherId,
        keyword: undefined,
        year: nextYear,
        month: nextMonth,
        current: nextCurrent,
        size: nextSize,
      });
      if (data) {
        setPage(data as any);
      }
    },
    [teacherId, year, month, current, size, store]
  );

  useEffect(() => {
    store.$setTeacherParams({ current: 1, size: 20, keyword: undefined });
    void store.getTeacherList();
  }, [store]);

  useEffect(() => {
    if (teacherId) {
      setCurrent(1);
      void loadRecords({ current: 1 });
    }
  }, [teacherId, loadRecords]);

  const selectedTeacher = useMemo(() => {
    return store.teacherList.find((t: any) => Number(t.id) === Number(teacherId));
  }, [store.teacherList, teacherId]);

  const columns = [
    { title: "上报日期", dataIndex: "date" },
    { title: "上报年份", dataIndex: "year", width: 120 },
    { title: "上报月份", dataIndex: "month", width: 120 },
    {
      title: "上报科目",
      dataIndex: "subject",
      render: (val: any) => subjectLabel(val),
    },
    { title: "上报数量", dataIndex: "num", width: 120 },
  ];

  const handleChange = (c: number): void => {
    setCurrent(c);
    void loadRecords({ current: c });
  };

  const handlePageSize = (c: number, ps: number): void => {
    setCurrent(c);
    setSize(ps);
    void loadRecords({ current: c, size: ps });
  };

  return (
    <Content style={{ flex: 1 }}>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle
            insert={
              <Space>
                <SelectTeacher
                  value={teacherId}
                  options={store.teacherList}
                  loading={store.loading}
                  placeholder="请选择教师"
                  onSearch={(v) => {
                    store.$setTeacherParams({ keyword: v || undefined, current: 1, size: 20 });
                    void store.getTeacherList();
                  }}
                  onChange={(v) => {
                    setTeacherId(v);
                  }}
                />
              </Space>
            }
          >
            课时管理
          </HeaderTitle>
        </Content.Header>
        <Content.Main style={{ overflow: "unset" }}>
          <Spin spinning={store.loading}>
            <div className="p-6 bg-white rounded shadow mb-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xl font-semibold mb-1">教师课时</div>
                  <div className="text-gray-600">
                    当前选择：{selectedTeacher?.name || "未选择"}
                  </div>
                </div>
                {selectedTeacher?.idPhoto ? (
                  <img
                    src={selectedTeacher.idPhoto}
                    alt={selectedTeacher.name}
                    style={{ width: 48, height: 48, borderRadius: 24, objectFit: "cover" }}
                  />
                ) : (
                  <div style={{ width: 48, height: 48, borderRadius: 24, background: "#f0f0f0" }} />
                )}
              </div>
            </div>

            {teacherId ? (
              <>
                <div className="p-6 bg-white rounded shadow mb-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-4 md:col-span-2">
                      <div className="text-sm text-gray-600 mb-2">筛选</div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">年份</div>
                          <InputNumber
                            style={{ width: "100%" }}
                            value={year}
                            onChange={(val) => {
                              const y = Number(val || 0);
                              setYear(y);
                              setCurrent(1);
                              void loadRecords({ year: y, current: 1 });
                            }}
                            min={2000}
                            max={2100}
                          />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">月份</div>
                          <InputNumber
                            style={{ width: "100%" }}
                            value={month}
                            onChange={(val) => {
                              const m = Number(val || 0);
                              setMonth(m);
                              setCurrent(1);
                              void loadRecords({ month: m, current: 1 });
                            }}
                            min={1}
                            max={12}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-4 md:col-span-2">
                      <WorkStatisticsChart title="工时统计（按科目）" data={statisticsData} />
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white rounded shadow">
                  <div className="text-base font-semibold mb-4">工时记录</div>
                  <MorTable
                    bordered
                    rowKey={(record: any) => record.id}
                    columns={columns as any}
                    dataSource={page.records || []}
                    pagination={false}
                  />
                </div>
              </>
            ) : (
              <div className="p-6 bg-white rounded shadow">
                <div className="text-gray-500">请选择教师后查看课时统计与记录</div>
              </div>
            )}
          </Spin>
        </Content.Main>
      </Content.Layout>
      {!!teacherId && (
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
              total={page.total || 0}
              current={current}
            />
          </div>
        </Content.Footer>
      )}
    </Content>
  );
};

export default observer(WorkMain);
