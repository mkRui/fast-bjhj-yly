import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";

import { Content } from "@/components/container";
import RunComponents from "@/components/run-component";
import HeaderTitle from "@/components/card-header";
import PageToolbar from "@/components/page-toolbar";
import MorTable, { TablePageMain } from "@/components/table";
import Button from "@/components/button";
import { toastActionResult } from "@/utils/common/mutation-success";

import StoreContext from "../store";
import { API } from "../types/api";
import CarFormModal from "../components/form-modal";
import CarPurposeModal from "../components/purpose-modal";

const CarMain: FC = () => {
  const store = useContext(StoreContext);

  const handleAdd = (): void => {
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <CarFormModal
          {...state}
          title="新增车型"
          onCancel={() => modal.unmount()}
          onOk={async (params) => {
            modal.setState({ loading: true });
            const ok = await store.addItem(params as API.Add.Params);
            modal.setState({ loading: false });
            if (toastActionResult(ok, "保存成功", "保存失败")) {
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
          title="编辑车型"
          info={record}
          onCancel={() => modal.unmount()}
          onOk={async (params) => {
            modal.setState({ loading: true });
            const ok = await store.editItem(params as API.Edit.Params);
            modal.setState({ loading: false });
            if (toastActionResult(ok, "保存成功", "保存失败")) {
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

  const columns = [
    { title: "车型名称", dataIndex: "name" },
    { title: "最小乘车人数", dataIndex: "minPassengerNum", width: 140 },
    { title: "最大乘车人数", dataIndex: "maxPassengerNum", width: 140 },
    {
      title: "操作",
      dataIndex: "",
      width: 180,
      fixed: "right" as const,
      render: (_: any, record: API.List.Data) => (
        <Button.Group>
          <Button type="link" onClick={() => handlePurpose(record)}>
            管理用途
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
              toastActionResult(ok, "删除成功", "删除失败");
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
    <Content style={{ flex: 1 }}>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle>车型管理</HeaderTitle>
        </Content.Header>
        <Content.Header>
          <PageToolbar
            actions={
              <Button type="primary" onClick={handleAdd}>
                新增车型
              </Button>
            }
          />
        </Content.Header>
        <TablePageMain loading={store.loading}>
          <MorTable
            bordered
            pagination={false}
            dataSource={store.list}
            columns={columns}
            rowKey={(record: any) => record.id}
            loading={store.loading}
            auto
          />
        </TablePageMain>
      </Content.Layout>
    </Content>
  );
};

export default observer(CarMain);
