import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";

import { Content } from "@/components/container";
import RunComponents from "@/components/run-component";
import HeaderTitle from "@/components/card-header";
import MorTable from "@/components/table";
import Button from "@/components/button";
import { toast } from "@/components/message";

import StoreContext from "../store";
import { API } from "../types/api";
import CarFormModal from "../components/form-modal";
import CarPurposeModal from "../components/purpose-modal";
import CarApplyAuditModal from "../components/apply-audit-modal";

const CarMain: FC = () => {
  const store = useContext(StoreContext);

  const handleAdd = (): void => {
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <CarFormModal
          {...state}
          title="新增车辆"
          onCancel={() => modal.unmount()}
          onOk={async (params) => {
            modal.setState({ loading: true });
            const ok = await store.addItem(params as API.Add.Params);
            modal.setState({ loading: false });
            if (ok) {
              toast("success", "保存成功");
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const handleEdit = (record: API.List.Data): void => {
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <CarFormModal
          {...state}
          title="编辑车辆"
          info={record}
          onCancel={() => modal.unmount()}
          onOk={async (params) => {
            modal.setState({ loading: true });
            const ok = await store.editItem(params as API.Edit.Params);
            modal.setState({ loading: false });
            if (ok) {
              toast("success", "保存成功");
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const handlePurpose = (record: API.List.Data): void => {
    const modal = new RunComponents({
      state: {},
      render: () => (
        <CarPurposeModal
          carId={record.id}
          carName={record.name}
          onCancel={() => modal.unmount()}
        />
      ),
    });
  };

  const handleAudit = (record: API.List.Data): void => {
    const modal = new RunComponents({
      state: {},
      render: () => (
        <CarApplyAuditModal
          carId={record.id}
          carName={record.name}
          onCancel={() => modal.unmount()}
        />
      ),
    });
  };

  const columns = [
    { title: "车型名称", dataIndex: "name" },
    { title: "最小乘车人数", dataIndex: "minPassengerNum", width: 140 },
    { title: "最大乘车人数", dataIndex: "maxPassengerNum", width: 140 },
    {
      title: "操作",
      dataIndex: "",
      width: 220,
      fixed: "right" as const,
      render: (_: any, record: API.List.Data) => (
        <Button.Group>
          <Button type="link" onClick={() => handlePurpose(record)}>
            用途
          </Button>
          <Button type="link" onClick={() => handleAudit(record)}>
            审核
          </Button>
          <Button type="link" linkType="warning" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button
            type="link"
            linkType="danger"
            action="del"
            onConfirm={async () => {
              const ok = await store.delItem(record.id);
              if (ok) toast("success", "删除成功");
            }}
          >
            删除
          </Button>
        </Button.Group>
      ),
    },
  ];

  useEffect(() => {
    void store.getList();
  }, []);

  return (
    <Content>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle
            insert={
              <Button type="primary" onClick={handleAdd}>
                新增车辆
              </Button>
            }
          >
            车辆管理
          </HeaderTitle>
        </Content.Header>
        <Content.Main>
          <MorTable
            bordered
            pagination={false}
            dataSource={store.list}
            columns={columns}
            rowKey={(record: any) => record.id}
            loading={store.loading}
          />
        </Content.Main>
      </Content.Layout>
    </Content>
  );
};

export default observer(CarMain);
