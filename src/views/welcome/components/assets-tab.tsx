import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { Form, Input, InputNumber, Modal, Pagination, Select, Space, Tabs } from "antd";
import type { ModalProps } from "antd/lib/modal";

import axios from "@/api";
import Button from "@/components/button";
import PageToolbar, { FilterField } from "@/components/page-toolbar";
import CheckStatusTag from "@/components/check-status-tag";
import MorTable from "@/components/table";
import RunComponents from "@/components/run-component";
import SelectEnum from "@/micro/select-enum";
import { DictCode } from "@/constants/dict-code";
import { useDict } from "@/hooks/use-dict";
import { toastRequestResult } from "@/utils/common/mutation-success";

import { Api } from "../api";
import { API } from "../types/api";
import UserTablePanel, { UserPageTabs } from "./user-table-panel";

const Item = Form.Item;
const Option = Select.Option;

interface ApplyModalProps {
  title: string;
  loading?: boolean;
  consumableId: string;
  onCancel: ModalProps["onCancel"];
  onOk: (params: API.ConsumablesApply.Params) => void | Promise<void>;
}

const ApplyModal: FC<ApplyModalProps> = (props) => {
  const { title, loading, consumableId, onCancel, onOk } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ consumableId, applyNum: 1, applyReason: "" });
  }, [form, consumableId]);

  const handleOk = (): void => {
    void form.validateFields().then(async (values: any) => {
      await onOk({
        consumableId: String(values.consumableId || ""),
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
        <Item name="consumableId" hidden>
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

const MyConsumablesApplyPanel: FC = () => {
  const api = useMemo(() => new Api(axios), []);
  const [params, setParams] = useState<API.ConsumablesApplyPage.Params>({ current: 1, size: 10 });
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
    const requestParams: API.ConsumablesApplyPage.Params = {
      current: merged.current,
      size: merged.size,
    };
    setLoading(true);
    const [err, res] = await api.getConsumablesApplyPage(requestParams);
    setLoading(false);
    if (err) return;
    setParams(requestParams);
    setData(res);
  };

  useEffect(() => {
    void load({ current: 1 });
  }, []);

  const columns = [
    { title: "易耗品", dataIndex: "consumableName", width: 160 },
    { title: "审核意见", dataIndex: "applyCheckedComment", width: 220 },
    {
      title: "审核状态",
      width: 120,
      render: (_: unknown, record: API.ConsumablesApplyPage.RecordItem) => (
        <CheckStatusTag checkedFlag={record.applyCheckedFlag} />
      ),
    },
    { title: "申请时间", dataIndex: "applyTime", width: 180 },
    { title: "申请数量", dataIndex: "applyNum", width: 120 },
    { title: "申请理由", dataIndex: "applyReason" },
  ];

  return (
    <UserTablePanel
      loading={loading}
      title={
        <div className="flex items-center justify-between">
          <span>我的易耗品申请</span>
          <Button action="reset" onClick={() => void load({ current: 1 })}>
            刷新
          </Button>
        </div>
      }
      pagination={{
        current: params.current,
        pageSize: params.size,
        total: data.total || 0,
        onChange: (current, pageSize) => {
          void load({ current, size: pageSize });
        },
      }}
    >
      <MorTable
        auto
        rowKey="id"
        columns={columns as any}
        dataSource={data.records || []}
        pagination={false}
      />
    </UserTablePanel>
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
    form.setFieldsValue({ applyId });
  }, [form, applyId]);

  const handleOk = (): void => {
    void form.validateFields().then(async (values: any) => {
      await onOk({
        applyId: String(values.applyId || ""),
        dispose: String(values.dispose || ""),
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
        <Item label="处置类型" name="dispose" rules={[{ required: true, message: "请选择处置类型" }]}>
          <SelectEnum name={DictCode.ASSETS_DISPOSE} allowClear />
        </Item>
      </Form>
    </Modal>
  );
};

const MyAssetsItemApplyPanel: FC = () => {
  const api = useMemo(() => new Api(axios), []);
  const assetsDisposeDict = useDict(DictCode.ASSETS_DISPOSE);
  const [params, setParams] = useState<API.AssetsItemApplyPage.Params>({ current: 1, size: 10 });
  const [data, setData] = useState<API.AssetsItemApplyPage.Data>({
    size: 10,
    pages: 0,
    total: 0,
    records: [],
    current: 1,
  });
  const [loading, setLoading] = useState(false);

  const load = async (next?: Partial<API.AssetsItemApplyPage.Params>) => {
    const merged = { ...params, ...(next || {}) };
    const requestParams: API.AssetsItemApplyPage.Params = {
      current: merged.current,
      size: merged.size,
    };
    setLoading(true);
    const [err, res] = await api.getAssetsItemApplyPage(requestParams);
    setLoading(false);
    if (err) return;
    setParams(requestParams);
    setData(res);
  };

  useEffect(() => {
    void load({ current: 1 });
  }, []);

  const openDisposeModal = (record: API.AssetsItemApplyPage.RecordItem) => {
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <AssetsItemDisposeModal
          {...state}
          title="处置固定资产"
          applyId={record.id}
          onCancel={() => modal.unmount()}
          onOk={async (disposeParams) => {
            modal.setState({ loading: true });
            const [err] = await api.disposeAssetsItem(disposeParams);
            modal.setState({ loading: false });
            if (toastRequestResult(err, "提交成功", "提交失败")) {
              modal.unmount();
              await load();
            }
          }}
        />
      ),
    });
  };

  const columns = [
    { title: "资产分类", dataIndex: "categoryName", width: 140 },
    { title: "固定资产", dataIndex: "assetName", width: 160 },
    { title: "实体代码", dataIndex: "itemFullCode", width: 180 },
    { title: "申请审核意见", dataIndex: "applyCheckedComment", width: 200 },
    {
      title: "申请审核",
      width: 120,
      render: (_: unknown, record: API.AssetsItemApplyPage.RecordItem) => (
        <CheckStatusTag checkedFlag={record.applyCheckedFlag} />
      ),
    },
    { title: "申请时间", dataIndex: "applyTime", width: 180 },
    { title: "申请理由", dataIndex: "applyReason", width: 200 },
    {
      title: "处置类型",
      dataIndex: "dispose",
      width: 120,
      render: (val: unknown) => assetsDisposeDict.label(val),
    },
    { title: "处置审核意见", dataIndex: "disposeCheckedComment", width: 200 },
    {
      title: "处置审核",
      width: 120,
      render: (_: unknown, record: API.AssetsItemApplyPage.RecordItem) => (
        <CheckStatusTag checkedFlag={record.disposeCheckedFlag} unsetText="-" />
      ),
    },
    {
      title: "操作",
      width: 100,
      fixed: "right" as const,
      render: (_: unknown, record: API.AssetsItemApplyPage.RecordItem) => {
        const canDispose =
          record.applyCheckedFlag === true && !record.dispose;
        return (
          <Button
            type="link"
            linkType="warning"
            disabled={!canDispose}
            onClick={() => openDisposeModal(record)}
          >
            处置
          </Button>
        );
      },
    },
  ];

  return (
    <UserTablePanel
      loading={loading}
      title={
        <div className="flex items-center justify-between">
          <span>我的固定资产申请</span>
          <Button action="reset" onClick={() => void load({ current: 1 })}>
            刷新
          </Button>
        </div>
      }
      pagination={{
        current: params.current,
        pageSize: params.size,
        total: data.total || 0,
        onChange: (current, pageSize) => {
          void load({ current, size: pageSize });
        },
      }}
    >
      <MorTable
        auto
        rowKey="id"
        columns={columns as any}
        dataSource={data.records || []}
        pagination={false}
      />
    </UserTablePanel>
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
  const assetsStatusDict = useDict(DictCode.ASSETS_STATUS);

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

  const loadItemList = async (next?: Partial<API.AssetsItemPage.Params>) => {
    const params = { ...itemParams, ...(next || {}) };
    setItemLoading(true);
    const [err, data] = await api.getAssetsItemPage(params);
    setItemLoading(false);
    if (err) return;
    setItemParams(params);
    setItemData(data);
  };

  useEffect(() => {
    void loadItemList({ assetId, current: 1 });
  }, [assetId]);

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
            if (toastRequestResult(err, "申请成功", "申请失败")) {
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const itemColumns = [
    {
      title: "资产分类",
      width: 160,
      render: (_: unknown, record: API.AssetsItemPage.RecordItem) =>
        record.categoryName || record.categoryId || "-",
    },
    {
      title: "固定资产",
      width: 220,
      render: (_: unknown, record: API.AssetsItemPage.RecordItem) =>
        record.assetName || record.assetId || "-",
    },
    { title: "完整代码", dataIndex: "fullCode", width: 200 },
    {
      title: "状态",
      dataIndex: "status",
      width: 120,
      render: (val: unknown) => assetsStatusDict.label(val),
    },
    { title: "入库时间", dataIndex: "stockInTime", width: 180 },
    { title: "备注", dataIndex: "remark" },
    {
      title: "操作",
      width: 100,
      fixed: "right" as const,
      render: (_: unknown, record: API.AssetsItemPage.RecordItem) => (
        <Button type="link" linkType="warning" onClick={() => openApplyModal(record)}>
          申请
        </Button>
      ),
    },
  ];

  return (
    <Modal title={title} open={true} onCancel={onCancel} footer={null} width={1200}>
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
            rowKey={(record: API.AssetsItemPage.RecordItem) => record.id}
            loading={itemLoading}
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
          consumableId={record.id}
          onCancel={() => modal.unmount()}
          onOk={async (params) => {
            modal.setState({ loading: true });
            const [err] = await api.applyConsumables(params);
            modal.setState({ loading: false });
            if (toastRequestResult(err, "申请成功", "申请失败")) {
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const openAssetsItemListsModal = (record: API.AssetsPage.RecordItem): void => {
    const name = record.name || record.selfCode || record.id;
    const modal = new RunComponents({
      state: {},
      render: () => (
        <AssetsItemListsModal
          title={`实体列表：${name}`}
          assetId={record.id}
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
      width: 100,
      fixed: "right" as const,
      render: (_: unknown, record: API.ConsumablesPage.RecordItem) => (
        <Button type="link" linkType="warning" onClick={() => openApplyModal(record)}>
          申请
        </Button>
      ),
    },
  ];

  const categoryNameById = useMemo(() => {
    const map = new Map<string, string>();
    categories.forEach((c) => map.set(String(c.id), String(c.name)));
    return map;
  }, [categories]);

  const assetsColumns = [
    {
      title: "资产分类",
      width: 160,
      render: (_: unknown, record: API.AssetsPage.RecordItem) =>
        categoryNameById.get(String(record.categoryId || "")) || record.categoryId || "-",
    },
    { title: "固定资产名称", dataIndex: "name", width: 220 },
    { title: "固定资产代码", dataIndex: "selfCode", width: 180 },
    { title: "完整代码", dataIndex: "fullCode", width: 200 },
    { title: "库存总数", dataIndex: "totalNum", width: 120 },
    { title: "可借数量", dataIndex: "availableNum", width: 120 },
    { title: "备注", dataIndex: "remark" },
    {
      title: "操作",
      width: 100,
      fixed: "right" as const,
      render: (_: unknown, record: API.AssetsPage.RecordItem) => (
        <Button type="link" onClick={() => openAssetsItemListsModal(record)}>
          查看实体
        </Button>
      ),
    },
  ];

  return (
    <UserPageTabs>
      <Tabs
        destroyInactiveTabPane
        items={[
          {
            key: "consumables",
            label: "申请易耗品",
            children: (
              <UserTablePanel
                loading={loading}
                toolbarPlacement="inline"
                toolbar={
                  <PageToolbar
                    filters={
                      <Space align="end" size={16} wrap>
                        <FilterField label="资产分类" width={220}>
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
                        </FilterField>
                        <FilterField label="关键字" width={260}>
                          <Input
                            value={keyword}
                            allowClear
                            placeholder="请输入易耗品名称/代码关键字"
                            onChange={(e) => setKeyword(e.target.value)}
                            onPressEnter={() => {
                              void loadPage({ current: 1, keyword: keyword || undefined });
                            }}
                          />
                        </FilterField>
                        <Button
                          type="primary"
                          action="search"
                          onClick={() => {
                            void loadPage({ current: 1, keyword: keyword || undefined });
                          }}
                        >
                          查询
                        </Button>
                      </Space>
                    }
                    actions={
                      <Space>
                        <Button action="reset" onClick={() => void loadCategories()}>
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
                    }
                  />
                }
                title="易耗品列表"
                pagination={{
                  current: pageParams.current,
                  pageSize: pageParams.size,
                  total: pageData.total || 0,
                  onChange: (current, pageSize) => {
                    void loadPage({ current, size: pageSize });
                  },
                }}
              >
                <MorTable
                  auto
                  rowKey="id"
                  columns={columns as any}
                  dataSource={pageData.records || []}
                  pagination={false}
                />
              </UserTablePanel>
            ),
          },
          {
            key: "my-consumables-applies",
            label: "我的易耗品申请",
            children: (
              <div className="h-full min-h-0">
                <MyConsumablesApplyPanel />
              </div>
            ),
          },
          {
            key: "assets",
            label: "申请固定资产",
            children: (
              <UserTablePanel
                loading={assetsLoading}
                toolbarPlacement="inline"
                toolbar={
                  <PageToolbar
                    filters={
                      <Space align="end" size={16} wrap>
                        <FilterField label="资产分类" width={220}>
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
                        </FilterField>
                        <FilterField label="关键字" width={260}>
                          <Input
                            value={assetsKeyword}
                            allowClear
                            placeholder="请输入固定资产名称/代码关键字"
                            onChange={(e) => setAssetsKeyword(e.target.value)}
                            onPressEnter={() => {
                              void loadAssetsPage({ current: 1, keyword: assetsKeyword || undefined });
                            }}
                          />
                        </FilterField>
                        <Button
                          type="primary"
                          action="search"
                          onClick={() => {
                            void loadAssetsPage({ current: 1, keyword: assetsKeyword || undefined });
                          }}
                        >
                          查询
                        </Button>
                      </Space>
                    }
                    actions={
                      <Space>
                        <Button action="reset" onClick={() => void loadCategories()}>
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
                    }
                  />
                }
                title="固定资产列表"
                pagination={{
                  current: assetsPageParams.current,
                  pageSize: assetsPageParams.size,
                  total: assetsPageData.total || 0,
                  onChange: (current, pageSize) => {
                    void loadAssetsPage({ current, size: pageSize });
                  },
                }}
              >
                <MorTable
                  auto
                  rowKey="id"
                  columns={assetsColumns as any}
                  dataSource={assetsPageData.records || []}
                  pagination={false}
                />
              </UserTablePanel>
            ),
          },
          {
            key: "my-assets-applies",
            label: "我的固定资产申请",
            children: (
              <div className="h-full min-h-0">
                <MyAssetsItemApplyPanel />
              </div>
            ),
          },
        ]}
      />
    </UserPageTabs>
  );
};

export default observer(AssetsTab);
