import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { Form, Input, InputNumber, Modal, Pagination, Space, Spin } from "antd";
import type { ModalProps } from "antd/lib/modal";

import axios from "@/api";
import Button from "@/components/button";
import DatePicker from "@/components/date-picker";
import MorTable from "@/components/table";
import RunComponents from "@/components/run-component";
import { toast } from "@/components/message";

import { Api } from "../api";
import { API } from "../types/api";
import CarSelect from "./car-select";
import CarPurposeSelect from "./car-purpose-select";

const Item = Form.Item;

interface CarApplyModalProps {
  title: string;
  loading?: boolean;
  init?: Partial<API.CarApply.Params>;
  onCancel: ModalProps["onCancel"];
  onOk: (params: API.CarApply.Params) => void | Promise<void>;
}

const CarApplyModal: FC<CarApplyModalProps> = (props) => {
  const { title, loading, init, onCancel, onOk } = props;
  const [form] = Form.useForm();
  const [carId, setCarId] = useState<string>(String(init?.carId || ""));

  useEffect(() => {
    form.setFieldsValue({
      carId: init?.carId,
      purposeId: init?.purposeId,
      applyReason: init?.applyReason || "",
      rentalTime: init?.rentalTime || "",
      origin: init?.origin || "",
      destination: init?.destination || "",
      passengerNum: init?.passengerNum ?? 1,
      num: init?.num ?? 1,
      remark: init?.remark || "",
    });
    setCarId(String(init?.carId || ""));
  }, [form, init]);

  const handleOk = (): void => {
    void form.validateFields().then(async (values: any) => {
      await onOk({
        carId: String(values.carId || ""),
        purposeId: String(values.purposeId || ""),
        applyReason: String(values.applyReason || ""),
        rentalTime: String(values.rentalTime || ""),
        origin: String(values.origin || ""),
        destination: String(values.destination || ""),
        passengerNum: Number(values.passengerNum || 0),
        num: Number(values.num || 0),
        remark: String(values.remark || ""),
      });
    });
  };

  return (
    <Modal
      title={title}
      open={true}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
      okText="提交"
      cancelText="取消"
      width={720}
    >
      <Form form={form} layout="vertical">
        <Item label="车型" name="carId" rules={[{ required: true, message: "请选择车型" }]}>
          <CarSelect
            allowClear
            value={form.getFieldValue("carId")}
            onInitChange={(v) => {
              form.setFieldValue("carId", v);
              setCarId(String(v || ""));
            }}
            onChange={(v) => {
              form.setFieldValue("carId", v);
              form.setFieldValue("purposeId", undefined);
              setCarId(String(v || ""));
            }}
          />
        </Item>
        <Item label="用途" name="purposeId" rules={[{ required: true, message: "请选择用途" }]}>
          <CarPurposeSelect
            allowClear
            carId={carId}
            value={form.getFieldValue("purposeId")}
            onInitChange={(v) => form.setFieldValue("purposeId", v)}
            onChange={(v) => form.setFieldValue("purposeId", v)}
          />
        </Item>
        <Item label="申请理由" name="applyReason" rules={[{ required: true, message: "请输入申请理由" }]}>
          <Input.TextArea rows={3} placeholder="请输入申请理由" />
        </Item>
        <Item label="用车时间" name="rentalTime" rules={[{ required: true, message: "请选择用车时间" }]}>
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: "100%" }} placeholder="请选择用车时间" />
        </Item>
        <Item label="起始地" name="origin" rules={[{ required: true, message: "请输入起始地" }]}>
          <Input placeholder="请输入起始地" />
        </Item>
        <Item label="目的地" name="destination" rules={[{ required: true, message: "请输入目的地" }]}>
          <Input placeholder="请输入目的地" />
        </Item>
        <Item label="乘车人数" name="passengerNum" rules={[{ required: true, message: "请输入乘车人数" }]}>
          <InputNumber style={{ width: "100%" }} min={1} />
        </Item>
        <Item label="车次" name="num" rules={[{ required: true, message: "请输入车次" }]}>
          <InputNumber style={{ width: "100%" }} min={1} />
        </Item>
        <Item label="备注" name="remark">
          <Input.TextArea rows={2} placeholder="请输入备注" />
        </Item>
      </Form>
    </Modal>
  );
};

const CarTab: FC = () => {
  const api = useMemo(() => new Api(axios), []);

  const [loading, setLoading] = useState(false);
  const [filterCarId, setFilterCarId] = useState<string>("");

  const [params, setParams] = useState<API.CarApplyPage.Params>({
    current: 1,
    size: 10,
    carId: undefined,
  });
  const [data, setData] = useState<API.CarApplyPage.Data>({
    size: 10,
    pages: 0,
    total: 0,
    records: [],
    current: 1,
  });

  const load = async (next?: Partial<API.CarApplyPage.Params>) => {
    const merged: API.CarApplyPage.Params = { ...params, ...(next || {}) };
    setLoading(true);
    const [err, res] = await api.getCarApplyPage(merged);
    setLoading(false);
    if (err) return;
    setParams(merged);
    setData(res);
  };

  useEffect(() => {
    void load({ current: 1 });
  }, []);

  const openApplyModal = (): void => {
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <CarApplyModal
          {...state}
          title="申请用车"
          init={{
            carId: filterCarId || "",
            purposeId: "",
            applyReason: "",
            rentalTime: "",
            origin: "",
            destination: "",
            passengerNum: 1,
            num: 1,
            remark: "",
          }}
          onCancel={() => modal.unmount()}
          onOk={async (p) => {
            modal.setState({ loading: true });
            const [err] = await api.applyCar(p);
            modal.setState({ loading: false });
            if (!err) {
              toast("success", "申请成功");
              modal.unmount();
              await load({ current: 1, carId: filterCarId || undefined });
            }
          }}
        />
      ),
    });
  };

  const isChecked = (val: any) => typeof val === "boolean";

  const columns = [
    { title: "申请时间", dataIndex: "applyTime", width: 180 },
    { title: "车型", dataIndex: "carName", width: 160 },
    { title: "用途", dataIndex: "purpose", width: 140 },
    { title: "用车理由", dataIndex: "reason", width: 220 },
    { title: "用车时间", dataIndex: "rentalTime", width: 180 },
    { title: "起始地", dataIndex: "origin", width: 160 },
    { title: "目的地", dataIndex: "destination", width: 160 },
    { title: "人数", dataIndex: "passengerNum", width: 100 },
    { title: "车次", dataIndex: "num", width: 100 },
    { title: "金额", dataIndex: "amountPrice", width: 120 },
    {
      title: "审核状态",
      width: 120,
      render: (_: any, record: API.CarApplyPage.RecordItem) => {
        if (!isChecked(record.checkedFlag)) return "未审核";
        return record.checkedFlag ? "通过" : "不通过";
      },
    },
    { title: "审核意见", dataIndex: "checkedComment", width: 200 },
  ];

  return (
    <Spin spinning={loading}>
      <div className="p-6 bg-white rounded shadow mb-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xl font-semibold mb-1">用车申请</div>
            <div className="text-gray-600">选择车型筛选申请记录，点击按钮提交申请</div>
          </div>
          <Space>
            <Button type="primary" action="add" onClick={openApplyModal}>
              申请用车
            </Button>
            <Button
              action="reset"
              onClick={() => {
                void load({ current: 1, carId: filterCarId || undefined });
              }}
            >
              刷新
            </Button>
          </Space>
        </div>
      </div>

      <div className="p-6 bg-white rounded shadow mb-4">
        <div className="text-sm text-gray-600 mb-2">筛选</div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600 mb-1">车型</div>
            <CarSelect
              allowClear
              value={filterCarId || undefined}
              onChange={(v) => {
                const next = String(v || "");
                setFilterCarId(next);
                void load({ current: 1, carId: next || undefined });
              }}
              onInitChange={(v) => {
                const next = String(v || "");
                setFilterCarId(next);
                void load({ current: 1, carId: next || undefined });
              }}
            />
          </div>
          <div />
        </div>
      </div>

      <div className="p-6 bg-white rounded shadow h-[520px]">
        <div className="text-base font-semibold mb-4">我的用车申请</div>
        <MorTable rowKey="id" columns={columns as any} dataSource={data.records || []} pagination={false} />
        <div className="flex justify-end mt-4">
          <Pagination
            current={params.current}
            pageSize={params.size}
            total={data.total || 0}
            showSizeChanger
            showQuickJumper
            onChange={(current, pageSize) => {
              void load({ current, size: pageSize });
            }}
          />
        </div>
      </div>
    </Spin>
  );
};

export default observer(CarTab);

