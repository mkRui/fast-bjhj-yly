import { FC, useContext, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { Pagination, Select } from "antd";

import axios from "@/api";
import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import CheckStatusTag, { isCheckFlagSet } from "@/components/check-status-tag";
import MorTable from "@/components/table";
import Button from "@/components/button";
import RunComponents from "@/components/run-component";
import { toastActionResult } from "@/utils/common/mutation-success";
import { Api as CarApi } from "../../car/api";

import StoreContext from "../store";
import { API } from "../types/api";
import CarApplyCheckModal from "../components/check-modal";

const Option = Select.Option;

const CarApplyMain: FC = () => {
  const store = useContext(StoreContext);
  const carApi = useMemo(() => new CarApi(axios), []);
  const [carOptions, setCarOptions] = useState<{ value: string; label: string }[]>(
    []
  );

  useEffect(() => {
    const loadCars = async (): Promise<void> => {
      const [err, list] = await carApi.getList();
      if (!err && list) {
        setCarOptions(
          list.map((item) => ({
            value: item.id,
            label: item.name || item.id,
          }))
        );
      }
    };
    void loadCars();
    void store.getList();
  }, []);

  const isChecked = isCheckFlagSet;

  const openCheckModal = (record: API.ApplyPage.RecordItem): void => {
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <CarApplyCheckModal
          {...state}
          title="用车申请审核"
          applyId={String(record.id)}
          onCancel={() => modal.unmount()}
          onOk={async (params) => {
            modal.setState({ loading: true });
            const ok = await store.applyCheck(params);
            modal.setState({ loading: false });
            if (toastActionResult(ok, "审核成功", "审核失败")) {
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const columns = [
    { title: "审核意见", dataIndex: "checkedComment", width: 200 },
    {
      title: "审核状态",
      width: 100,
      render: (_: unknown, record: API.ApplyPage.RecordItem) => (
        <CheckStatusTag checkedFlag={record.checkedFlag} />
      ),
    },
    { title: "申请时间", dataIndex: "applyTime", width: 180 },
    { title: "申请人", dataIndex: "applyUserName", width: 120 },
    { title: "车型", dataIndex: "carName", width: 140 },
    { title: "用途", dataIndex: "purpose", width: 140 },
    { title: "用车事由", dataIndex: "reason", width: 200 },
    { title: "用车时间", dataIndex: "rentalTime", width: 180 },
    { title: "起始地", dataIndex: "origin", width: 140 },
    { title: "目的地", dataIndex: "destination", width: 140 },
    { title: "乘车人数", dataIndex: "passengerNum", width: 100 },
    { title: "车次", dataIndex: "num", width: 80 },
    { title: "金额", dataIndex: "amountPrice", width: 100 },
    {
      title: "操作",
      width: 100,
      fixed: "right" as const,
      render: (_: unknown, record: API.ApplyPage.RecordItem) => (
        <Button.Group>
          <Button
            type="link"
            linkType="warning"
            disabled={isChecked(record.checkedFlag)}
            onClick={() => openCheckModal(record)}
          >
            审核
          </Button>
        </Button.Group>
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

  const handleCarFilter = (carId?: string): void => {
    store.$setParams({ carId, current: 1 });
    void store.getList();
  };

  return (
    <Content>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle
            insert={
              <Select
                allowClear
                placeholder="筛选车型"
                style={{ width: 200 }}
                value={store.params.carId}
                onChange={handleCarFilter}
              >
                {carOptions.map((item) => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            }
          >
            用车审核
          </HeaderTitle>
        </Content.Header>
        <Content.Main>
          <MorTable
            bordered
            pagination={false}
            dataSource={store.list}
            columns={columns}
            rowKey={(record) => record.id}
            loading={store.loading}
          />
        </Content.Main>
        <Content.Footer>
          <div
            style={{
              height: "49px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "0 12px",
            }}
          >
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
      </Content.Layout>
    </Content>
  );
};

export default observer(CarApplyMain);
