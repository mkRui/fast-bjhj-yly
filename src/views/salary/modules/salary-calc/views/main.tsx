import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { InputNumber, Pagination, Space, Spin } from "antd";

import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import PageToolbar, { FilterField } from "@/components/page-toolbar";
import MorTable from "@/components/table";
import Button from "@/components/button";
import RunComponents from "@/components/run-component";
import { toast } from "@/components/message";
import { toastActionResult } from "@/utils/common/mutation-success";

import StoreContext from "../store";
import { API } from "../types/api";
import SubjectModal from "../components/subject-modal";
import SubjectAddModal from "../components/subject-add-modal";

const SalaryCalcMain: FC = () => {
  const store = useContext(StoreContext);

  useEffect(() => {
    void store.fetchPage();
  }, [store]);

  const uiCurrent = Math.max(1, Number(store.params.current || "0") + 1);

  const openSubjectModal = (record: API.Page.RecordItem): void => {
    const modal = new RunComponents({
      render: () => (
        <SubjectModal
          record={record}
          year={store.params.year}
          month={store.params.month}
          fetchSubjects={store.fetchSubjectList.bind(store)}
          addSubject={store.addSubject.bind(store)}
          delSubject={store.delSubject.bind(store)}
          onCancel={() => modal.unmount()}
        />
      ),
    });
  };

  const openAddModal = (): void => {
    const records = store.page.records || [];
    if (!records.length) {
      toast("warning", "当前月份暂无工资数据，请先查询");
      return;
    }

    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <SubjectAddModal
          {...state}
          title="新增工资明细"
          records={records}
          onCancel={() => modal.unmount()}
          onOk={async (params) => {
            modal.setState({ loading: true });
            const ok = await store.addSubject(params);
            modal.setState({ loading: false });
            if (toastActionResult(ok, "新增成功", "新增失败")) {
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const handleSearch = (): void => {
    store.$setParams({ current: "0" });
    void store.fetchPage();
  };

  const handleCalculate = async (): Promise<void> => {
    const { year, month } = store.params;
    if (!year || !month) {
      toast("warning", "请先选择年份和月份");
      return;
    }
    const ok = await store.calculateSalary();
    toastActionResult(ok, "测算成功", "测算失败");
  };

  const columns = [
    { title: "教师", dataIndex: "teacherUserName", width: 140 },
    { title: "年份", dataIndex: "year", width: 100 },
    { title: "月份", dataIndex: "month", width: 100 },
    { title: "工资合计", dataIndex: "amount", width: 140 },
    {
      title: "操作",
      width: 120,
      fixed: "right" as const,
      render: (_: unknown, record: API.Page.RecordItem) => (
        <Button type="link" onClick={() => openSubjectModal(record)}>
          工资明细
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
          <HeaderTitle>工资测算</HeaderTitle>
        </Content.Header>
        <Content.Header>
          <PageToolbar
            filters={
              <Space align="end" size={16}>
                <FilterField label="年份" width={140}>
                  <InputNumber
                    style={{ width: "100%" }}
                    value={store.params.year}
                    min={2000}
                    max={2100}
                    onChange={(val) => {
                      store.$setParams({ year: Number(val || 0) });
                    }}
                  />
                </FilterField>
                <FilterField label="月份" width={120}>
                  <InputNumber
                    style={{ width: "100%" }}
                    value={store.params.month}
                    min={1}
                    max={12}
                    onChange={(val) => {
                      store.$setParams({ month: Number(val || 0) });
                    }}
                  />
                </FilterField>
                <Button action="search" onClick={handleSearch}>
                  查询
                </Button>
                <Button
                  type="primary"
                  title={`确认对 ${store.params.year} 年 ${store.params.month} 月工资进行测算？`}
                  description="测算将按基础工资及课时等规则重新生成当月工资数据"
                  onConfirm={() => void handleCalculate()}
                >
                  开始测算
                </Button>
              </Space>
            }
            actions={
              <Button type="primary" action="add" onClick={openAddModal}>
                新增工资明细
              </Button>
            }
          />
        </Content.Header>
        <Content.Main>
          <Spin spinning={store.loading}>
            <MorTable
              bordered
              pagination={false}
              dataSource={store.page.records || []}
              columns={columns as any}
              rowKey={(record: API.Page.RecordItem) => record.id}
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

export default observer(SalaryCalcMain);
