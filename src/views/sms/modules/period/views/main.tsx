import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Pagination, Tag } from "antd";

import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import MorTable from "@/components/table";
import Button from "@/components/button";
import RunComponents from "@/components/run-component";
import { toast } from "@/components/message";

import StoreContext from "../store";
import AddModal from "../components/add-modal";
import SettingModal from "../components/setting-modal";
import type { API, SmsPeriodEntity } from "../types/api";

const PeriodMain: FC = () => {
  const store = useContext(StoreContext);

  const handleAdd = (): void => {
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <AddModal
          {...state}
          title="新增周期"
          onCancel={() => modal.unmount()}
          onOk={async (params: API.Add.Params) => {
            modal.setState({ loading: true });
            const ok = await store.addItem(params);
            modal.setState({ loading: false });
            if (ok) modal.unmount();
          }}
        />
      ),
    });
  };

  const handleSetting = async (record: SmsPeriodEntity): Promise<void> => {
    const data = await store.getSetting(record.id);
    if (!data) {
      toast("error", "获取周期设置失败");
      return;
    }

    const init: Partial<API.SettingEdit.Params> = {
      id: Number(data.id || record.id),
      leaveMinUnit: Number(data.leaveMinUnit || 0),
      leaveMinNum: Number(data.leaveMinNum || 0),
      leaveMaxNum: Number(data.leaveMaxNum || 0),
      bonusPerUnit: Number(data.bonusPerUnit || 0),
      bonusMaxLimitPerYear: Number(data.bonusMaxLimitPerYear || 0),
      bonusMaxLimitPerMonth: Number(data.bonusMaxLimitPerMonth || 0),
      salaryMorningReading: Number(data.salaryMorningReading || 0),
      salaryEveningStudy: Number(data.salaryEveningStudy || 0),
      salaryClassHour: Number(data.salaryClassHour || 0),
      salaryChalkbox: Number(data.salaryChalkbox || 0),
      salaryOralPractice: Number(data.salaryOralPractice || 0),
      salaryCollegeCounseling: Number(data.salaryCollegeCounseling || 0),
      salaryOvertime: Number(data.salaryOvertime || 0),
      salaryExhibition: Number(data.salaryExhibition || 0),
    };

    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <SettingModal
          {...state}
          title={`编辑周期：${record.name}`}
          init={init}
          onCancel={() => modal.unmount()}
          onOk={async (params: API.SettingEdit.Params) => {
            modal.setState({ loading: true });
            const ok = await store.settingEdit(params);
            modal.setState({ loading: false });
            if (ok) modal.unmount();
          }}
        />
      ),
    });
  };

  const columns = [
    { title: "周期名称", dataIndex: "name" },
    {
      title: "当前周期",
      dataIndex: "currentFlag",
      width: 120,
      render: (val: any) => (val ? <Tag color="green">是</Tag> : <Tag>否</Tag>),
    },
    {
      title: "操作",
      dataIndex: "",
      width: 200,
      fixed: "right" as const,
      render: (_text: any, record: SmsPeriodEntity) => (
        <Button.Group>
          <Button
            type="link"
            linkType="warning"
            onClick={() => handleSetting(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            linkType="danger"
            action="del"
            onConfirm={() => store.delItem(record.id)}
          >
            删除
          </Button>
        </Button.Group>
      ),
    },
  ];

  useEffect(() => {
    void store.getList();
  }, [store]);

  const handleChange = (current: number): void => {
    store.$setParams({ current });
    void store.getList();
  };

  const handlePageSize = (current: number, size: number): void => {
    store.$setParams({ current, size });
    void store.getList();
  };

  return (
    <Content style={{ flex: 1 }}>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle
            insert={
              <Button type="primary" onClick={handleAdd}>
                新增周期
              </Button>
            }
          >
            周期管理
          </HeaderTitle>
        </Content.Header>
        <Content.Main>
          <MorTable
            bordered
            pagination={false}
            dataSource={store.list}
            columns={columns as any}
            rowKey={(record: any) => record.id}
            loading={store.loading}
          />
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
            total={store.data.total}
            current={store.data.current}
          />
        </div>
      </Content.Footer>
    </Content>
  );
};

export default observer(PeriodMain);
