import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Pagination, Spin } from "antd";

import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import MorTable from "@/components/table";
import Button from "@/components/button";
import RunComponents from "@/components/run-component";
import { toastActionResult } from "@/utils/common/mutation-success";

import StoreContext from "../store";
import { API } from "../types/api";
import SalaryBaseFormModal from "../components/form-modal";
import { EnumLabel } from "@/micro/select-enum";
import { DictCode } from "@/constants/dict-code";

const SalaryBaseMain: FC = () => {
  const store = useContext(StoreContext);

  useEffect(() => {
    void store.fetchPage();
  }, [store]);

  const uiCurrent = Math.max(1, Number(store.params.current || "0") + 1);

  const openEditModal = (record: API.Page.RecordItem): void => {
    const { teacher, salaryBase } = record;
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <SalaryBaseFormModal
          {...state}
          title={`编辑基本工资：${teacher?.name || ""}`}
          init={{
            id: salaryBase?.id,
            salaryBase: salaryBase?.salaryBase,
            salaryPosition: salaryBase?.salaryPosition,
            salarySeniority: salaryBase?.salarySeniority,
            salaryHousing: salaryBase?.salaryHousing,
            salaryTransportation: salaryBase?.salaryTransportation,
            salaryCrossing: salaryBase?.salaryCrossing,
          }}
          onCancel={() => modal.unmount()}
          onOk={async (params) => {
            modal.setState({ loading: true });
            const ok = await store.editItem(params);
            modal.setState({ loading: false });
            if (toastActionResult(ok, "保存成功", "保存失败")) {
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const columns = [
    { title: "姓名", dataIndex: ["teacher", "name"], width: 120 },
    {
      title: "性别",
      width: 80,
      render: (_: unknown, record: API.Page.RecordItem) => (
        <EnumLabel name={DictCode.GENDER} value={record.teacher?.gender} />
      ),
    },
    { title: "民族", dataIndex: ["teacher", "ethnicity"], width: 100 },
    { title: "基本工资", dataIndex: ["salaryBase", "salaryBase"], width: 120 },
    { title: "岗位工资", dataIndex: ["salaryBase", "salaryPosition"], width: 120 },
    { title: "校龄工资", dataIndex: ["salaryBase", "salarySeniority"], width: 120 },
    { title: "住房补贴", dataIndex: ["salaryBase", "salaryHousing"], width: 120 },
    { title: "交通补贴", dataIndex: ["salaryBase", "salaryTransportation"], width: 120 },
    { title: "跨年级/学科补助", dataIndex: ["salaryBase", "salaryCrossing"], width: 150 },
    {
      title: "操作",
      width: 100,
      fixed: "right" as const,
      render: (_: unknown, record: API.Page.RecordItem) => (
        <Button type="link" linkType="warning" onClick={() => openEditModal(record)}>
          编辑
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
          <HeaderTitle>基础工资</HeaderTitle>
        </Content.Header>
        <Content.Main>
          <Spin spinning={store.loading}>
            <MorTable
              bordered
              pagination={false}
              dataSource={store.page.records || []}
              columns={columns as any}
              rowKey={(record: API.Page.RecordItem) => record.salaryBase?.id || record.teacher?.id}
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

export default observer(SalaryBaseMain);
