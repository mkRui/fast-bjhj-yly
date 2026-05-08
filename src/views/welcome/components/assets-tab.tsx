import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { Form, Input, InputNumber, Modal, Pagination, Select, Space, Spin, Tabs } from "antd";
import type { ModalProps } from "antd/lib/modal";

import axios from "@/api";
import Button from "@/components/button";
import MorTable from "@/components/table";
import RunComponents from "@/components/run-component";
import { toast } from "@/components/message";

import { Api } from "../api";
import { API } from "../types/api";

const Item = Form.Item;
const Option = Select.Option;

interface ApplyModalProps {
  title: string;
  loading?: boolean;
  consumablesId: string;
  onCancel: ModalProps["onCancel"];
  onOk: (params: API.ConsumablesApply.Params) => void | Promise<void>;
}

const ApplyModal: FC<ApplyModalProps> = (props) => {
  const { title, loading, consumablesId, onCancel, onOk } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ consumablesId, applyNum: 1, applyReason: "" });
  }, [form, consumablesId]);

  const handleOk = (): void => {
    void form.validateFields().then(async (values: any) => {
      await onOk({
        consumablesId: String(values.consumablesId || ""),
        applyReason: String(values.applyReason || ""),
        applyNum: Number(values.applyNum || 0),
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
      width={520}
    >
      <Form form={form} layout="vertical">
        <Item name="consumablesId" hidden>
          <Input />
        </Item>
        <Item label="申请数量" name="applyNum" rules={[{ required: true, message: "请输入申请数量" }]}>
          <InputNumber style={{ width: "100%" }} min={1} />
        </Item>
        <Item label="申请理由" name="applyReason" rules={[{ required: true, message: "请输入申请理由" }]}>
          <Input.TextArea rows={3} placeholder="请输入申请理由" />
        </Item>
      </Form>
    </Modal>
  );
};

interface ApplyListModalProps {
  title: string;
  consumablesId: string;
  onCancel: ModalProps["onCancel"];
}

const ApplyListModal: FC<ApplyListModalProps> = (props) => {
  const { title, consumablesId, onCancel } = props;
  const api = useMemo(() => new Api(axios), []);

  const [params, setParams] = useState<API.ConsumablesApplyPage.Params>({ consumablesId, current: 1, size: 10 });
  const [data, setData] = useState<API.ConsumablesApplyPage.Data>({
    size: 10,
    pages: 0,
    total: 0,
    records: [],
    current: 1,
  });
  const [loading, setLoading] = useState(false);

  const load = async (next?: Partial<API.ConsumablesApplyPage.Params>) => {
    const merged = { ...params, ...(next || {}) };
    setLoading(true);
    const [err, res] = await api.getConsumablesApplyPage(merged);
    setLoading(false);
    if (err) return;
    setParams(merged);
    setData(res);
  };

  useEffect(() => {
    void load({ consumablesId, current: 1 });
  }, [consumablesId]);

  const isChecked = (val: any) => typeof val === "boolean";

  const columns = [
    { title: "申请时间", dataIndex: "applyTime", width: 180 },
    { title: "申请数量", dataIndex: "applyNum", width: 120 },
    { title: "申请理由", dataIndex: "applyReason" },
    {
      title: "审核状态",
      width: 120,
      render: (_: any, record: API.ConsumablesApplyPage.RecordItem) => {
        if (!isChecked(record.applyCheckedFlag)) return "未审核";
        return record.applyCheckedFlag ? "通过" : "不通过";
      },
    },
    { title: "审核意见", dataIndex: "applyCheckedComment", width: 220 },
  ];

  return (
    <Modal title={title} open={true} onCancel={onCancel} footer={null} width={1100}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ height: 520 }}>
          <MorTable
            bordered
            pagination={false}
            dataSource={data.records}
            columns={columns as any}
            rowKey={(record: any) => record.id}
            loading={loading}
          />
        </div>
        <div className="flex justify-end">
          <Pagination
            showTotal={(total) => `共有 ${total} 条`}
            showSizeChanger={true}
            showQuickJumper={true}
            total={data.total}
            current={data.current}
            onChange={(page) => void load({ current: page })}
            onShowSizeChange={(_c, size) => void load({ current: 1, size })}
          />
        </div>
      </div>
    </Modal>
  );
};

interface AssetsItemApplyModalProps {
  title: string;
  loading?: boolean;
  itemId: string;
  onCancel: ModalProps["onCancel"];
  onOk: (params: API.AssetsItemApply.Params) => void | Promise<void>;
}

const AssetsItemApplyModal: FC<AssetsItemApplyModalProps> = (props) => {
  const { title, loading, itemId, onCancel, onOk } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ itemId, applyReason: "" });
  }, [form, itemId]);

  const handleOk = (): void => {
    void form.validateFields().then(async (values: any) => {
      await onOk({
        itemId: String(values.itemId || ""),
        applyReason: String(values.applyReason || ""),
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
      width={520}
    >
      <Form form={form} layout="vertical">
        <Item name="itemId" hidden>
          <Input />
        </Item>
        <Item label="申请理由" name="applyReason" rules={[{ required: true, message: "请输入申请理由" }]}>
          <Input.TextArea rows={3} placeholder="请输入申请理由" />
        </Item>
      </Form>
    </Modal>
  );
};

interface AssetsItemDisposeModalProps {
  title: string;
  loading?: boolean;
  applyId: string;
  onCancel: ModalProps["onCancel"];
  onOk: (params: API.AssetsItemDispose.Params) => void | Promise<void>;
}

const AssetsItemDisposeModal: FC<AssetsItemDisposeModalProps> = (props) => {
  const { title, loading, applyId, onCancel, onOk } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ applyId, dispose: 0 });
  }, [form, applyId]);

  const handleOk = (): void => {
    void form.validateFields().then(async (values: any) => {
      await onOk({
        applyId: String(values.applyId || ""),
        dispose: Number(values.dispose || 0),
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
      width={520}
    >
      <Form form={form} layout="vertical">
        <Item name="applyId" hidden>
          <Input />
        </Item>
        <Item label="处置类型" name="dispose" rules={[{ required: true, message: "请输入处置类型" }]}>
          <InputNumber style={{ width: "100%" }} min={0} />
        </Item>
      </Form>
    </Modal>
  );
};

export interface AssetsItemListsModalProps {
  title: string;
  assetId: string;
  onCancel: ModalProps["onCancel"];
}

const AssetsItemListsModal: FC<AssetsItemListsModalProps> = (props) => {
  const { title, assetId, onCancel } = props;
  const api = useMemo(() => new Api(axios), []);

  const [activeKey, setActiveKey] = useState<"items" | "applies">("items");

  const [itemParams, setItemParams] = useState<API.AssetsItemPage.Params>({
    assetId,
    current: 1,
    size: 10,
    keyword: undefined,
  });
  const [itemData, setItemData] = useState<API.AssetsItemPage.Data>({
    size: 10,
    pages: 0,
    total: 0,
    records: [],
    current: 1,
  });
  const [itemLoading, setItemLoading] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string>("");

  const [applyParams, setApplyParams] = useState<API.AssetsItemApplyPage.Params>({
    itemId: "",
    current: 1,
    size: 10,
  });
  const [applyData, setApplyData] = useState<API.AssetsItemApplyPage.Data>({
    size: 10,
    pages: 0,
    total: 0,
    records: [],
    current: 1,
  });
  const [applyLoading, setApplyLoading] = useState(false);

  const loadItemList = async (next?: Partial<API.AssetsItemPage.Params>) => {
    const params = { ...itemParams, ...(next || {}) };
    setItemLoading(true);
    const [err, data] = await api.getAssetsItemPage(params);
    setItemLoading(false);
    if (err) return;
    setItemParams(params);
    setItemData(data);
  };

  const loadApplyList = async (next?: Partial<API.AssetsItemApplyPage.Params>) => {
    const params = { ...applyParams, ...(next || {}) };
    if (!params.itemId) return;
    setApplyLoading(true);
    const [err, data] = await api.getAssetsItemApplyPage(params);
    setApplyLoading(false);
    if (err) return;
    setApplyParams(params);
    setApplyData(data);
  };

  useEffect(() => {
    void loadItemList({ assetId, current: 1 });
  }, [assetId]);

  const openApplyTabByItem = async (itemId: string) => {
    const nextId = String(itemId || "");
    if (!nextId) return;
    setSelectedItemId(nextId);
    setActiveKey("applies");
    await loadApplyList({ itemId: nextId, current: 1 });
  };

  const openApplyModal = (record: API.AssetsItemPage.RecordItem) => {
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <AssetsItemApplyModal
          {...state}
          title="申请固定资产"
          itemId={record.id}
          onCancel={() => modal.unmount()}
          onOk={async (params) => {
            modal.setState({ loading: true });
            const [err] = await api.applyAssetsItem(params);
            modal.setState({ loading: false });
            if (!err) {
              toast("success", "申请成功");
              modal.unmount();
              await openApplyTabByItem(record.id);
            }
          }}
        />
      ),
    });
  };

  const openDisposeModal = (record: API.AssetsItemApplyPage.RecordItem) => {
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <AssetsItemDisposeModal
          {...state}
          title="处置固定资产"
          applyId={record.id}
          onCancel={() => modal.unmount()}
          onOk={async (params) => {
            modal.setState({ loading: true });
            const [err] = await api.disposeAssetsItem(params);
            modal.setState({ loading: false });
            if (!err) {
              toast("success", "提交成功");
              modal.unmount();
              await loadApplyList();
            }
          }}
        />
      ),
    });
  };

  const isChecked = (val: any) => typeof val === "boolean";

  const itemColumns = [
    {
      title: "资产分类",
      width: 160,
      render: (_: any, record: API.AssetsItemPage.RecordItem) => record.categoryName || record.categoryId || "-",
    },
    {
      title: "固定资产",
      width: 220,
      render: (_: any, record: API.AssetsItemPage.RecordItem) => record.assetName || record.assetId || "-",
    },
    { title: "完整代码", dataIndex: "fullCode", width: 200 },
    { title: "状态", dataIndex: "status", width: 120 },
    { title: "入库时间", dataIndex: "stockInTime", width: 180 },
    { title: "备注", dataIndex: "remark" },
    {
      title: "操作",
      width: 220,
      fixed: "right" as const,
      render: (_: any, record: API.AssetsItemPage.RecordItem) => (
        <Button.Group>
          <Button type="link" linkType="warning" onClick={() => openApplyModal(record)}>
            申请
          </Button>
          <Button type="link" onClick={() => openApplyTabByItem(record.id)}>
            申请记录
          </Button>
        </Button.Group>
      ),
    },
  ];

  const applyColumns = [
    { title: "申请时间", dataIndex: "applyTime", width: 180 },
    { title: "申请人", dataIndex: "applyUserName", width: 140 },
    { title: "申请理由", dataIndex: "applyReason" },
    {
      title: "申请审核",
      width: 140,
      render: (_: any, record: API.AssetsItemApplyPage.RecordItem) => {
        if (!isChecked(record.applyCheckedFlag)) return "未审核";
        return record.applyCheckedFlag ? "通过" : "不通过";
      },
    },
    { title: "处置类型", dataIndex: "dispose", width: 120 },
    {
      title: "处置审核",
      width: 140,
      render: (_: any, record: API.AssetsItemApplyPage.RecordItem) => {
        if (!isChecked(record.disposeCheckedFlag)) return "-";
        return record.disposeCheckedFlag ? "通过" : "不通过";
      },
    },
    {
      title: "操作",
      width: 140,
      fixed: "right" as const,
      render: (_: any, record: API.AssetsItemApplyPage.RecordItem) => {
        const canDispose = record.applyCheckedFlag === true && (record.dispose === undefined || record.dispose === null);
        return (
          <Button.Group>
            <Button type="link" linkType="warning" disabled={!canDispose} onClick={() => openDisposeModal(record)}>
              处置
            </Button>
          </Button.Group>
        );
      },
    },
  ];

  return (
    <Modal title={title} open={true} onCancel={onCancel} footer={null} width={1200}>
      <Tabs
        activeKey={activeKey}
        onChange={(k) => setActiveKey(k as any)}
        items={[
          {
            key: "items",
            label: "实体列表",
            children: (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", gap: 8 }}>
                  <Input
                    placeholder="请输入关键字"
                    allowClear
                    value={itemParams.keyword}
                    onChange={(e) => setItemParams((p) => ({ ...p, keyword: e.target.value || undefined }))}
                    onPressEnter={() => void loadItemList({ current: 1 })}
                  />
                  <Button type="primary" onClick={() => void loadItemList({ current: 1 })}>
                    查询
                  </Button>
                  <Button
                    onClick={() => {
                      setItemParams((p) => ({ ...p, keyword: undefined, current: 1 }));
                      void loadItemList({ keyword: undefined, current: 1 });
                    }}
                  >
                    重置
                  </Button>
                </div>
                <div style={{ height: 480 }}>
                  <MorTable
                    bordered
                    pagination={false}
                    dataSource={itemData.records}
                    columns={itemColumns as any}
                    rowKey={(record: any) => record.id}
                    loading={itemLoading}
                    rowSelection={{
                      type: "radio",
                      selectedRowKeys: selectedItemId ? [selectedItemId] : [],
                      onChange: (keys: any[]) => {
                        const nextId = String(keys?.[0] || "");
                        setSelectedItemId(nextId);
                      },
                    }}
                    onRow={(record: API.AssetsItemPage.RecordItem) => ({
                      onDoubleClick: () => void openApplyTabByItem(record.id),
                    })}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Pagination
                    showTotal={(total) => `共有 ${total} 条`}
                    showSizeChanger={true}
                    showQuickJumper={true}
                    total={itemData.total}
                    current={itemData.current}
                    onChange={(page) => void loadItemList({ current: page })}
                    onShowSizeChange={(_c, size) => void loadItemList({ current: 1, size })}
                  />
                </div>
              </div>
            ),
          },
          {
            key: "applies",
            label: "申请列表",
            children: (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ color: "#999" }}>
                    {applyParams.itemId ? `当前实体ID：${applyParams.itemId}` : "请先在实体列表选择一条记录"}
                  </div>
                  <Button
                    type="primary"
                    disabled={!selectedItemId}
                    onClick={() => void loadApplyList({ itemId: selectedItemId, current: 1 })}
                  >
                    刷新
                  </Button>
                </div>
                <div style={{ height: 480 }}>
                  <MorTable
                    bordered
                    pagination={false}
                    dataSource={applyData.records}
                    columns={applyColumns as any}
                    rowKey={(record: any) => record.id}
                    loading={applyLoading}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Pagination
                    showTotal={(total) => `共有 ${total} 条`}
                    showSizeChanger={true}
                    showQuickJumper={true}
                    total={applyData.total}
                    current={applyData.current}
                    onChange={(page) => void loadApplyList({ current: page })}
                    onShowSizeChange={(_c, size) => void loadApplyList({ current: 1, size })}
                  />
                </div>
              </div>
            ),
          },
        ]}
      />
    </Modal>
  );
};

const AssetsTab: FC = () => {
  const api = useMemo(() => new Api(axios), []);

  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);

  const [categories, setCategories] = useState<API.AssetsCategoryList.Item[]>([]);
  const [categoryId, setCategoryId] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [assetsCategoryId, setAssetsCategoryId] = useState<string>("");
  const [assetsKeyword, setAssetsKeyword] = useState<string>("");

  const [pageParams, setPageParams] = useState<API.ConsumablesPage.Params>({
    categoryId: "",
    keyword: undefined,
    current: 1,
    size: 10,
  });
  const [pageData, setPageData] = useState<API.ConsumablesPage.Data>({
    size: 10,
    pages: 0,
    total: 0,
    records: [],
    current: 1,
  });

  const [assetsPageParams, setAssetsPageParams] = useState<API.AssetsPage.Params>({
    categoryId: "",
    keyword: undefined,
    current: 1,
    size: 10,
  });
  const [assetsPageData, setAssetsPageData] = useState<API.AssetsPage.Data>({
    size: 10,
    pages: 0,
    total: 0,
    records: [],
    current: 1,
  });
  const [assetsLoading, setAssetsLoading] = useState(false);

  const loadCategories = async () => {
    setCategoryLoading(true);
    const [err, data] = await api.getAssetsCategoryList();
    setCategoryLoading(false);
    if (err) return;
    const list = Array.isArray(data) ? data : [];
    setCategories(list);
    if (!categoryId && list.length) {
      setCategoryId(String(list[0].id || ""));
    }
    if (!assetsCategoryId && list.length) {
      setAssetsCategoryId(String(list[0].id || ""));
    }
  };

  const loadPage = async (next?: Partial<API.ConsumablesPage.Params>) => {
    const merged: API.ConsumablesPage.Params = { ...pageParams, ...(next || {}) };
    if (!merged.categoryId) return;
    setLoading(true);
    const [err, data] = await api.getConsumablesPage(merged);
    setLoading(false);
    if (err) return;
    setPageParams(merged);
    setPageData(data);
  };

  useEffect(() => {
    void loadCategories();
  }, []);

  useEffect(() => {
    if (!categoryId) return;
    setPageParams((p) => ({ ...p, categoryId, current: 1 }));
    void loadPage({ categoryId, current: 1, keyword: keyword || undefined });
  }, [categoryId]);

  const loadAssetsPage = async (next?: Partial<API.AssetsPage.Params>) => {
    const merged: API.AssetsPage.Params = { ...assetsPageParams, ...(next || {}) };
    if (!merged.categoryId) return;
    setAssetsLoading(true);
    const [err, data] = await api.getAssetsPage(merged);
    setAssetsLoading(false);
    if (err) return;
    setAssetsPageParams(merged);
    setAssetsPageData(data);
  };

  useEffect(() => {
    if (!assetsCategoryId) return;
    setAssetsPageParams((p) => ({ ...p, categoryId: assetsCategoryId, current: 1 }));
    void loadAssetsPage({ categoryId: assetsCategoryId, current: 1, keyword: assetsKeyword || undefined });
  }, [assetsCategoryId]);

  const openApplyModal = (record: API.ConsumablesPage.RecordItem): void => {
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <ApplyModal
          {...state}
          title={`申请易耗品：${record.name || record.selfCode || record.id}`}
          consumablesId={record.id}
          onCancel={() => modal.unmount()}
          onOk={async (params) => {
            modal.setState({ loading: true });
            const [err] = await api.applyConsumables(params);
            modal.setState({ loading: false });
            if (!err) {
              toast("success", "申请成功");
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const openApplyListModal = (record: API.ConsumablesPage.RecordItem): void => {
    const modal = new RunComponents({
      state: {},
      render: () => (
        <ApplyListModal
          title={`我的申请记录：${record.name || record.selfCode || record.id}`}
          consumablesId={record.id}
          onCancel={() => modal.unmount()}
        />
      ),
    });
  };

  const columns = [
    { title: "易耗品名称", dataIndex: "name", width: 220 },
    { title: "易耗品代码", dataIndex: "selfCode", width: 180 },
    { title: "完整代码", dataIndex: "fullCode", width: 200 },
    { title: "库存总数", dataIndex: "totalNum", width: 120 },
    { title: "可借数量", dataIndex: "availableNum", width: 120 },
    { title: "备注", dataIndex: "remark" },
    {
      title: "操作",
      width: 220,
      fixed: "right" as const,
      render: (_: any, record: API.ConsumablesPage.RecordItem) => (
        <Button.Group>
          <Button type="link" linkType="warning" onClick={() => openApplyModal(record)}>
            申请
          </Button>
          <Button type="link" onClick={() => openApplyListModal(record)}>
            申请记录
          </Button>
        </Button.Group>
      ),
    },
  ];

  const categoryNameById = useMemo(() => {
    const map = new Map<string, string>();
    categories.forEach((c) => map.set(String(c.id), String(c.name)));
    return map;
  }, [categories]);

  const openAssetsItemListsModal = (record: API.AssetsPage.RecordItem): void => {
    const modal = new RunComponents({
      state: {},
      render: () => (
        <AssetsItemListsModal
          title={`固定资产：${record.name || record.selfCode || record.id}`}
          assetId={record.id}
          onCancel={() => modal.unmount()}
        />
      ),
    });
  };

  const assetsColumns = [
    {
      title: "资产分类",
      width: 160,
      render: (_: any, record: API.AssetsPage.RecordItem) => categoryNameById.get(String(record.categoryId || "")) || record.categoryId || "-",
    },
    { title: "固定资产名称", dataIndex: "name", width: 220 },
    { title: "固定资产代码", dataIndex: "selfCode", width: 180 },
    { title: "完整代码", dataIndex: "fullCode", width: 200 },
    { title: "库存总数", dataIndex: "totalNum", width: 120 },
    { title: "可借数量", dataIndex: "availableNum", width: 120 },
    { title: "备注", dataIndex: "remark" },
    {
      title: "操作",
      width: 160,
      fixed: "right" as const,
      render: (_: any, record: API.AssetsPage.RecordItem) => (
        <Button.Group>
          <Button type="link" onClick={() => openAssetsItemListsModal(record)}>
            实体列表
          </Button>
        </Button.Group>
      ),
    },
  ];

  return (
    <Tabs
      items={[
        {
          key: "consumables",
          label: "申请易耗品",
          children: (
            <Spin spinning={loading}>
              <div className="p-6 bg-white rounded shadow mb-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xl font-semibold mb-1">易耗品申请</div>
                    <div className="text-gray-600">选择分类后查询并提交申请</div>
                  </div>
                  <Space>
                    <Button
                      action="reset"
                      onClick={() => {
                        void loadCategories();
                      }}
                    >
                      刷新分类
                    </Button>
                    <Button
                      action="reset"
                      onClick={() => {
                        setKeyword("");
                        void loadPage({ current: 1, keyword: undefined });
                      }}
                    >
                      重置筛选
                    </Button>
                  </Space>
                </div>
              </div>

              <div className="p-6 bg-white rounded shadow mb-4">
                <div className="text-sm text-gray-600 mb-2">筛选</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">资产分类</div>
                    <Select
                      value={categoryId || undefined}
                      loading={categoryLoading}
                      onChange={(v) => setCategoryId(String(v || ""))}
                      style={{ width: "100%" }}
                      placeholder="请选择资产分类"
                    >
                      {categories.map((item) => (
                        <Option value={item.id} key={item.id}>
                          <span aria-label={item.name}>{item.name}</span>
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">关键字</div>
                    <Input
                      value={keyword}
                      allowClear
                      placeholder="请输入易耗品名称/代码关键字"
                      onChange={(e) => setKeyword(e.target.value)}
                      onPressEnter={() => {
                        void loadPage({ current: 1, keyword: keyword || undefined });
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Space>
                    <Button
                      type="primary"
                      onClick={() => {
                        void loadPage({ current: 1, keyword: keyword || undefined });
                      }}
                    >
                      查询
                    </Button>
                    <Button
                      onClick={() => {
                        setKeyword("");
                        void loadPage({ current: 1, keyword: undefined });
                      }}
                    >
                      清空关键字
                    </Button>
                  </Space>
                </div>
              </div>

              <div className="p-6 bg-white rounded shadow h-[520px]">
                <div className="text-base font-semibold mb-4">易耗品列表</div>
                <MorTable rowKey="id" columns={columns as any} dataSource={pageData.records || []} pagination={false} />
                <div className="flex justify-end mt-4">
                  <Pagination
                    current={pageParams.current}
                    pageSize={pageParams.size}
                    total={pageData.total || 0}
                    showSizeChanger
                    showQuickJumper
                    onChange={(current, pageSize) => {
                      void loadPage({ current, size: pageSize });
                    }}
                  />
                </div>
              </div>
            </Spin>
          ),
        },
        {
          key: "assets",
          label: "申请固定资产",
          children: (
            <Spin spinning={assetsLoading}>
              <div className="p-6 bg-white rounded shadow mb-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xl font-semibold mb-1">固定资产申请</div>
                    <div className="text-gray-600">选择分类后查询并进入实体列表提交申请</div>
                  </div>
                  <Space>
                    <Button
                      action="reset"
                      onClick={() => {
                        void loadCategories();
                      }}
                    >
                      刷新分类
                    </Button>
                    <Button
                      action="reset"
                      onClick={() => {
                        setAssetsKeyword("");
                        void loadAssetsPage({ current: 1, keyword: undefined });
                      }}
                    >
                      重置筛选
                    </Button>
                  </Space>
                </div>
              </div>

              <div className="p-6 bg-white rounded shadow mb-4">
                <div className="text-sm text-gray-600 mb-2">筛选</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">资产分类</div>
                    <Select
                      value={assetsCategoryId || undefined}
                      loading={categoryLoading}
                      onChange={(v) => setAssetsCategoryId(String(v || ""))}
                      style={{ width: "100%" }}
                      placeholder="请选择资产分类"
                    >
                      {categories.map((item) => (
                        <Option value={item.id} key={item.id}>
                          <span aria-label={item.name}>{item.name}</span>
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">关键字</div>
                    <Input
                      value={assetsKeyword}
                      allowClear
                      placeholder="请输入固定资产名称/代码关键字"
                      onChange={(e) => setAssetsKeyword(e.target.value)}
                      onPressEnter={() => {
                        void loadAssetsPage({ current: 1, keyword: assetsKeyword || undefined });
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Space>
                    <Button
                      type="primary"
                      onClick={() => {
                        void loadAssetsPage({ current: 1, keyword: assetsKeyword || undefined });
                      }}
                    >
                      查询
                    </Button>
                    <Button
                      onClick={() => {
                        setAssetsKeyword("");
                        void loadAssetsPage({ current: 1, keyword: undefined });
                      }}
                    >
                      清空关键字
                    </Button>
                  </Space>
                </div>
              </div>

              <div className="p-6 bg-white rounded shadow h-[520px]">
                <div className="text-base font-semibold mb-4">固定资产列表</div>
                <MorTable
                  rowKey="id"
                  columns={assetsColumns as any}
                  dataSource={assetsPageData.records || []}
                  pagination={false}
                />
                <div className="flex justify-end mt-4">
                  <Pagination
                    current={assetsPageParams.current}
                    pageSize={assetsPageParams.size}
                    total={assetsPageData.total || 0}
                    showSizeChanger
                    showQuickJumper
                    onChange={(current, pageSize) => {
                      void loadAssetsPage({ current, size: pageSize });
                    }}
                  />
                </div>
              </div>
            </Spin>
          ),
        },
      ]}
    />
  );
};

export default observer(AssetsTab);
