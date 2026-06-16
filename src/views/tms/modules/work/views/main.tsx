import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Input, InputNumber, Pagination, Space, Spin } from "antd";
import { useNavigate } from "react-router-dom";

import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import PageToolbar, { FilterField } from "@/components/page-toolbar";
import MorTable from "@/components/table";
import Button from "@/components/button";
import { TmsFullPath } from "@/views/tms/router/path";

import StoreContext from "../store";
import { API } from "../types/api";
import { WORK_STAT_FIELDS } from "../constants";

const genderText = (gender?: number): string => {
  if (gender === 1) return "男";
  if (gender === 2) return "女";
  return "未知";
};

const WorkMain: FC = () => {
  const store = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    void store.getList();
  }, [store]);

  const openDetail = (record: API.StatisticsPage.RecordItem): void => {
    const teacherId = String(record.teacher?.id || "");
    if (!teacherId) return;
    const params = new URLSearchParams({
      teacherId,
      year: String(store.params.year),
      month: String(store.params.month),
    });
    if (record.teacher?.name) {
      params.set("teacherName", record.teacher.name);
    }
    navigate(`${TmsFullPath.WORK_DETAIL}?${params.toString()}`);
  };

  const columns = [
    {
      title: "教师",
      width: 200,
      render: (_: unknown, record: API.StatisticsPage.RecordItem) => (
        <Space>
          {record.teacher?.idPhoto ? (
            <img
              src={record.teacher.idPhoto}
              alt={record.teacher.name}
              style={{ width: 32, height: 32, borderRadius: 16, objectFit: "cover" }}
            />
          ) : (
            <div style={{ width: 32, height: 32, borderRadius: 16, background: "#f0f0f0" }} />
          )}
          <span>{record.teacher?.name || "-"}</span>
        </Space>
      ),
    },
    {
      title: "性别",
      width: 80,
      render: (_: unknown, record: API.StatisticsPage.RecordItem) =>
        genderText(Number(record.teacher?.gender || 0)),
    },
    ...WORK_STAT_FIELDS.map(({ key, label }) => ({
      title: label,
      dataIndex: key,
      width: 110,
      render: (val: unknown) => Number(val || 0),
    })),
    {
      title: "操作",
      width: 100,
      fixed: "right" as const,
      render: (_: unknown, record: API.StatisticsPage.RecordItem) => (
        <Button type="link" onClick={() => openDetail(record)}>
          详情
        </Button>
      ),
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
    <Content style={{ flex: 1 }}>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle>课时管理</HeaderTitle>
        </Content.Header>
        <Content.Header>
          <PageToolbar
            filters={
              <Space align="end" size={16} wrap>
                <FilterField label="年份" width={140}>
                  <InputNumber
                    style={{ width: "100%" }}
                    value={store.params.year}
                    onChange={(val) => {
                      store.$setParams({ year: Number(val || 0), current: 1 });
                      void store.getList();
                    }}
                    min={2000}
                    max={2100}
                  />
                </FilterField>
                <FilterField label="月份" width={120}>
                  <InputNumber
                    style={{ width: "100%" }}
                    value={store.params.month}
                    onChange={(val) => {
                      store.$setParams({ month: Number(val || 0), current: 1 });
                      void store.getList();
                    }}
                    min={1}
                    max={12}
                  />
                </FilterField>
                <FilterField label="关键字" width={200}>
                  <Input
                    allowClear
                    placeholder="教师姓名"
                    value={store.params.keyword}
                    onChange={(e) => {
                      store.$setParams({ keyword: e.target.value || undefined });
                    }}
                    onPressEnter={() => {
                      store.$setParams({ current: 1 });
                      void store.getList();
                    }}
                  />
                </FilterField>
                <Button
                  action="reset"
                  onClick={() => {
                    const now = new Date();
                    store.$setParams({
                      year: now.getFullYear(),
                      month: now.getMonth() + 1,
                      keyword: undefined,
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
        <Content.Main style={{ overflow: "unset" }}>
          <Spin spinning={store.loading}>
            <div className="theme-panel ">
              <MorTable
                bordered
                rowKey={(record, index) => String(record.teacher?.id ?? index)}
                columns={columns as any}
                dataSource={store.list}
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
              total={store.data.total || 0}
              current={store.data.current || 1}
            />
          </div>
        </Content.Footer>
      </Content.Layout>
    </Content>
  );
};

export default observer(WorkMain);
