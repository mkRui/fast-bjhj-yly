import { FC, useContext, useEffect, useMemo } from "react";
import { observer } from "mobx-react";
import { Pagination, Spin } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import MorTable, { TABLE_MAIN_STYLE, TABLE_SPIN_WRAPPER } from "@/components/table";
import Button from "@/components/button";
import RunComponents from "@/components/run-component";
import { toastActionResult } from "@/utils/common/mutation-success";
import RootContext from "@/stores/root-context";
import { DictCode } from "@/constants/dict-code";
import { getDictLabel } from "@/utils/common/dict";
import { TmsFullPath } from "@/views/tms/router/path";
import WorkStatisticsChart, { WorkStatisticsItem } from "@/views/welcome/components/work-statistics-chart";

import StoreContext from "../store";
import EditWorkModal from "../components/edit-work-modal";
import { API } from "../types/api";

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

  const openEditModal = (record: API.WorkPage.RecordItem): void => {
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <EditWorkModal
          {...state}
          title="编辑课时"
          init={{
            id: record.id,
            num: record.num,
            remark: record.remark,
          }}
          onCancel={() => modal.unmount()}
          onOk={async (params) => {
            modal.setState({ loading: true });
            const ok = await store.editWork(params);
            modal.setState({ loading: false });
            if (toastActionResult(ok, "修改成功", "修改失败")) {
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const columns = [
    { title: "上报年份", dataIndex: "year", width: 120 },
    { title: "上报月份", dataIndex: "month", width: 120 },
    {
      title: "上报科目",
      dataIndex: "subject",
      render: (val: unknown) => subjectDict.label(val),
    },
    { title: "上报数量", dataIndex: "num", width: 120 },
    { title: "备注", dataIndex: "remark", ellipsis: true, render: (val: string) => val || "-" },
    {
      title: "操作",
      width: 160,
      fixed: "right" as const,
      render: (_: unknown, record: API.WorkPage.RecordItem) => (
        <Button.Group>
          <Button type="link" linkType="warning" onClick={() => openEditModal(record)}>
            编辑
          </Button>
          <Button
            type="link"
            linkType="danger"
            action="del"
            onConfirm={async () => {
              const ok = await store.delWork({ id: record.id });
              toastActionResult(ok, "删除成功", "删除失败");
            }}
          >
            删除
          </Button>
        </Button.Group>
      ),
    },
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
        <Content.Main style={TABLE_MAIN_STYLE}>
          <Spin
            spinning={store.detailLoading}
            wrapperClassName={TABLE_SPIN_WRAPPER}
          >
            <div className="theme-panel mb-4 shrink-0 p-6">
              <div className="mb-4 text-gray-600">
                {teacherName || "教师"} · {year}年{month}月
              </div>
              <WorkStatisticsChart title="当前用户课时统计（按科目）" data={statisticsData} />
            </div>

            <div className="theme-panel flex min-h-0 flex-1 flex-col overflow-hidden p-6">
              <div className="mb-4 shrink-0 text-base font-semibold">课时记录</div>
              <MorTable
                bordered
                rowKey={(record) => record.id}
                columns={columns as any}
                dataSource={store.detailData.records || []}
                pagination={false}
                auto
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
