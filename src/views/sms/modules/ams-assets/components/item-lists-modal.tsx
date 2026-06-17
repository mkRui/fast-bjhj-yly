import { FC, useEffect, useMemo, useRef, useState } from "react";
import { observer } from "mobx-react";
import { Input, Modal, Pagination, Tabs } from "antd";
import type { ModalProps } from "antd/lib/modal";

import axios from "@/api";
import Button from "@/components/button";
import CheckStatusTag from "@/components/check-status-tag";
import MorTable from "@/components/table";
import { DictCode } from "@/constants/dict-code";
import { useDict } from "@/hooks/use-dict";
import { Api } from "../api";
import { API } from "../types/api";

export interface AssetsItemListsModalProps {
  title: string;
  assetId: string;
  initialActiveKey?: "items" | "applies";
  loading?: boolean;
  onCancel: ModalProps["onCancel"];
}

const AssetsItemListsModal: FC<AssetsItemListsModalProps> = (props) => {
  const { title, assetId, initialActiveKey = "items", onCancel } = props;

  const api = useMemo(() => new Api(axios), []);
  const shouldAutoOpenApplies = useRef(initialActiveKey === "applies");
  const assetsStatusDict = useDict(DictCode.ASSETS_STATUS);
  const assetsDisposeDict = useDict(DictCode.ASSETS_DISPOSE);

  const [activeKey, setActiveKey] = useState<"items" | "applies">(initialActiveKey);

  const [itemParams, setItemParams] = useState<API.ItemPage.Params>({
    assetId,
    current: 1,
    size: 10,
    keyword: undefined,
  });
  const [itemData, setItemData] = useState<API.ItemPage.Data>({
    size: 10,
    pages: 0,
    total: 0,
    records: [],
    current: 1,
  });
  const [itemLoading, setItemLoading] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string>("");

  const [applyParams, setApplyParams] = useState<API.ItemApplyPage.Params>({
    current: 1,
    size: 10,
  });
  const [applyData, setApplyData] = useState<API.ItemApplyPage.Data>({
    size: 10,
    pages: 0,
    total: 0,
    records: [],
    current: 1,
  });
  const [applyLoading, setApplyLoading] = useState(false);

  const loadItemList = async (next?: Partial<API.ItemPage.Params>) => {
    const params = { ...itemParams, ...(next || {}) };
    setItemLoading(true);
    const [err, data] = await api.getItemPage(params);
    setItemLoading(false);
    if (err) return;
    setItemParams(params);
    setItemData(data);

    if (shouldAutoOpenApplies.current) {
      shouldAutoOpenApplies.current = false;
      setActiveKey("applies");
      await loadApplyList({ current: 1 });
    }
  };

  const loadApplyList = async (next?: Partial<API.ItemApplyPage.Params>) => {
    const merged = { ...applyParams, ...(next || {}) };
    const params: API.ItemApplyPage.Params = {
      current: merged.current,
      size: merged.size,
      ...(merged.itemId ? { itemId: merged.itemId } : {}),
    };
    setApplyLoading(true);
    const [err, data] = await api.getItemApplyPage(params);
    setApplyLoading(false);
    if (err) return;
    setApplyParams(params);
    setApplyData(data);
  };

  useEffect(() => {
    void loadItemList({ assetId, current: 1 });
    if (initialActiveKey === "applies") {
      void loadApplyList({ current: 1 });
    }
  }, [assetId]);

  const openApplyTabByItem = async (itemId: string) => {
    const nextId = String(itemId || "");
    if (!nextId) return;
    setSelectedItemId(nextId);
    setActiveKey("applies");
    await loadApplyList({ itemId: nextId, current: 1 });
  };

  const itemColumns = [
    {
      title: "资产分类",
      width: 160,
      render: (_: any, record: API.ItemPage.RecordItem) => record.categoryName || record.categoryId || "-",
    },
    {
      title: "固定资产",
      width: 220,
      render: (_: any, record: API.ItemPage.RecordItem) => record.assetName || record.assetId || "-",
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
      width: 160,
      fixed: "right" as const,
      render: (_: any, record: API.ItemPage.RecordItem) => (
        <Button.Group>
          <Button type="link" onClick={() => openApplyTabByItem(record.id)}>
            查看申请
          </Button>
        </Button.Group>
      ),
    },
  ];

  const applyColumns = [
    { title: "申请审核意见", dataIndex: "applyCheckedComment", width: 200 },
    {
      title: "申请审核",
      width: 120,
      render: (_: any, record: API.ItemApplyPage.RecordItem) => (
        <CheckStatusTag checkedFlag={record.applyCheckedFlag} />
      ),
    },
    { title: "申请时间", dataIndex: "applyTime", width: 180 },
    { title: "申请人", dataIndex: "applyUserName", width: 140 },
    { title: "申请原因", dataIndex: "applyReason" },
    {
      title: "处置类型",
      dataIndex: "disposeType",
      width: 120,
      render: (val: unknown) => assetsDisposeDict.label(val),
    },
    { title: "处置审核意见", dataIndex: "disposeCheckedComment", width: 200 },
    {
      title: "处置审核",
      width: 120,
      render: (_: any, record: API.ItemApplyPage.RecordItem) => (
        <CheckStatusTag checkedFlag={record.disposeCheckedFlag} unsetText="-" />
      ),
    },
  ];

  return (
    <Modal title={title} open={true} onCancel={onCancel} footer={null} width={1200}>
        <Tabs
          activeKey={activeKey}
          onChange={(k) => {
            const key = k as "items" | "applies";
            setActiveKey(key);
            if (key === "applies") {
              void loadApplyList({ current: 1 });
            }
          }}
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
                          void loadApplyList({ itemId: nextId || undefined, current: 1 });
                        },
                      }}
                      onRow={(record: API.ItemPage.RecordItem) => ({
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
                      {applyParams.itemId ? `当前筛选实体：${applyParams.itemId}` : "显示全部申请"}
                    </div>
                    <Button
                      type="primary"
                      onClick={() =>
                        void loadApplyList({
                          itemId: selectedItemId || undefined,
                          current: 1,
                        })
                      }
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

export default observer(AssetsItemListsModal);
