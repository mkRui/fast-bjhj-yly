import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { Form, Input, InputNumber, Modal } from "antd";
import type { ModalProps } from "antd/lib/modal";

import axios from "@/api";
import MorTable from "@/components/table";
import Button from "@/components/button";
import { toastRequestResult } from "@/utils/common/mutation-success";
import { useFormInitialValues } from "@/hooks/use-form-initial-values";
import { Api } from "../api";
import { API } from "../types/api";

const Item = Form.Item;

interface PurposeFormModalProps {
  title: string;
  loading?: boolean;
  carId: string;
  init?: Partial<API.PurposeList.Item>;
  onCancel: () => void;
  onOk: (params: API.PurposeAdd.Params | API.PurposeEdit.Params) => void | Promise<void>;
}

const PurposeFormModal: FC<PurposeFormModalProps> = (props) => {
  const { title, loading, carId, init, onCancel, onOk } = props;
  const [form] = Form.useForm();

  useFormInitialValues(form, {
    id: init?.id,
    carId: init?.carId || carId,
    purpose: init?.purpose || "",
    price: init?.price ?? 0,
  });

  const handleOk = (): void => {
    void form.validateFields().then(async (values: any) => {
      const id = String(values.id || "");
      const purpose = String(values.purpose || "").trim();
      const price = Number(values.price || 0);

      if (id) {
        await onOk({
          id,
          carId,
          purpose,
          price,
        } as API.PurposeEdit.Params);
      } else {
        await onOk({
          carId,
          purpose,
          price,
        } as API.PurposeAdd.Params);
      }
    });
  };

  return (
    <Modal
      title={title}
      visible={true}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
      okText="保存"
      cancelText="取消"
      width={520}
    >
      <Form form={form} layout="vertical">
        <Item name="id" hidden>
          <Input />
        </Item>
        <Item name="carId" hidden>
          <Input />
        </Item>
        <Item label="用途" name="purpose" rules={[{ required: true, message: "请输入用途" }]}>
          <Input placeholder="请输入用途" />
        </Item>
        <Item label="价格" name="price" rules={[{ required: true, message: "请输入价格" }]}>
          <InputNumber style={{ width: "100%" }} min={0} />
        </Item>
      </Form>
    </Modal>
  );
};

export interface CarPurposeModalProps {
  carId: string;
  carName?: string;
  onCancel: ModalProps["onCancel"];
}

const CarPurposeModal: FC<CarPurposeModalProps> = (props) => {
  const { carId, carName, onCancel } = props;
  const api = useMemo(() => new Api(axios), []);

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.PurposeList.Item[]>([]);

  const [formOpen, setFormOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [editing, setEditing] = useState<API.PurposeList.Item | undefined>(undefined);

  const load = async () => {
    setLoading(true);
    const [err, data] = await api.getPurposeList({ carId });
    setLoading(false);
    if (err) return;
    setList(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    void load();
  }, [carId]);

  const openAdd = () => {
    setEditing(undefined);
    setFormOpen(true);
  };

  const openEdit = (record: API.PurposeList.Item) => {
    setEditing(record);
    setFormOpen(true);
  };

  const columns = [
    { title: "用途", dataIndex: "purpose" },
    { title: "价格", dataIndex: "price", width: 140 },
    {
      title: "操作",
      width: 180,
      fixed: "right" as const,
      render: (_: any, record: API.PurposeList.Item) => (
        <Button.Group>
          <Button type="link" linkType="warning" onClick={() => openEdit(record)}>
            编辑
          </Button>
          <Button
            type="link"
            linkType="danger"
            action="del"
            onConfirm={async () => {
              const id = String(record.id || "");
              if (!id) return;
              const [err] = await api.delPurpose({ id });
              if (toastRequestResult(err, "删除成功", "删除失败")) {
                await load();
              }
            }}
          >
            删除
          </Button>
        </Button.Group>
      ),
    },
  ];

  return (
    <>
      <Modal
        title={`车辆用途：${carName || carId}`}
        visible={true}
        onCancel={onCancel}
        footer={null}
        width={"100vw" as any}
        style={{ top: 0, paddingBottom: 0, maxWidth: "100vw" }}
        bodyStyle={{ height: "calc(100vh - 110px)", overflow: "auto" }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <Button type="primary" onClick={openAdd}>
            新增用途
          </Button>
        </div>
        <div style={{ height: "calc(100vh - 190px)" }}>
          <MorTable
            bordered
            pagination={false}
            dataSource={list}
            columns={columns as any}
            rowKey={(record: any) => record.id}
            loading={loading}
          />
        </div>
      </Modal>

      {formOpen ? (
        <PurposeFormModal
          title={editing?.id ? "编辑用途" : "新增用途"}
          loading={formLoading}
          carId={carId}
          init={editing}
          onCancel={() => setFormOpen(false)}
          onOk={async (params) => {
            setFormLoading(true);
            const [err] =
              "id" in (params as any)
                ? await api.editPurpose(params as API.PurposeEdit.Params)
                : await api.addPurpose(params as API.PurposeAdd.Params);
            setFormLoading(false);
            if (!toastRequestResult(err, "保存成功", "保存失败")) return;
            setFormOpen(false);
            await load();
          }}
        />
      ) : null}
    </>
  );
};

export default observer(CarPurposeModal);

