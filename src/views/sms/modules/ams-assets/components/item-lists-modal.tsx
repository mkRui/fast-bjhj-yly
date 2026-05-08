import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { Form, Input, Modal, Pagination, Radio, Tabs } from "antd";
import type { ModalProps } from "antd/lib/modal";

import axios from "@/api";
import Button from "@/components/button";
import MorTable from "@/components/table";
import { toast } from "@/components/message";
import { Api } from "../api";
import { API } from "../types/api";

const Item = Form.Item;

type CheckType = "apply" | "dispose";

export interface AssetsItemListsModalProps {
  title: string;
  assetId: string;
  loading?: boolean;
  onCancel: ModalProps["onCancel"];
}

interface CheckModalState {
  open: boolean;
  type: CheckType;
  applyId: string;
}

const AssetsItemListsModal: FC<AssetsItemListsModalProps> = (props) => {
  const { title, assetId, onCancel } = props;

  const api = useMemo(() => new Api(axios), []);

  const [activeKey, setActiveKey] = useState<"items" | "applies">("items");

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
    itemId: "",
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

  const [checkModal, setCheckModal] = useState<CheckModalState>({
    open: false,
    type: "apply",
    applyId: "",
  });
  const [checkLoading, setCheckLoading] = useState(false);
  const [checkForm] = Form.useForm();

  const loadItemList = async (next?: Partial<API.ItemPage.Params>) => {
    const params = { ...itemParams, ...(next || {}) };
    setItemLoading(true);
    const [err, data] = await api.getItemPage(params);
    setItemLoading(false);
    if (err) return;
    setItemParams(params);
    setItemData(data);
  };

  const loadApplyList = async (next?: Partial<API.ItemApplyPage.Params>) => {
    const params = { ...applyParams, ...(next || {}) };
    if (!params.itemId) return;
    setApplyLoading(true);
    const [err, data] = await api.getItemApplyPage(params);
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

  const openCheckModal = (type: CheckType, applyId: string) => {
    checkForm.resetFields();
    checkForm.setFieldsValue({ checkedFlag: true, comment: "" });
    setCheckModal({ open: true, type, applyId: String(applyId || "") });
  };

  const submitCheck = async () => {
    void checkForm.validateFields().then(async (values: any) => {
      const checkedFlag = Boolean(values.checkedFlag);
      const comment = String(values.comment || "");
      const applyId = String(checkModal.applyId || "");
      if (!applyId) return;

      setCheckLoading(true);
      const [err] =
        checkModal.type === "dispose"
          ? await api.disposeCheck({ applyId, checkedFlag, comment })
          : await api.applyCheck({ applyId, checkedFlag, comment });
      setCheckLoading(false);
      if (err) return;
      toast("success", "操作成功");
      setCheckModal((s) => ({ ...s, open: false }));
      await loadApplyList();
    });
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
    { title: "状态", dataIndex: "status", width: 120 },
    { title: "入库时间", dataIndex: "stockInTime", width: 180 },
    { title: "备注", dataIndex: "remark" },
    {
      title: "操作",
      width: 160,
      fixed: "right" as const,
      render: (_: any, record: API.ItemPage.RecordItem) => (
        <Button.Group>
          <Button type="link" onClick={() => openApplyTabByItem(record.id)}>
            申请列表
          </Button>
        </Button.Group>
      ),
    },
  ];

  const isChecked = (val: any) => typeof val === "boolean";

  const applyColumns = [
    { title: "申请时间", dataIndex: "applyTime", width: 180 },
    { title: "申请人", dataIndex: "applyUserName", width: 140 },
    { title: "申请原因", dataIndex: "applyReason" },
    {
      title: "申请审核",
      width: 140,
      render: (_: any, record: API.ItemApplyPage.RecordItem) => {
        if (!isChecked(record.applyCheckedFlag)) return "-";
        return record.applyCheckedFlag ? "通过" : "不通过";
      },
    },
    { title: "处置类型", dataIndex: "disposeType", width: 120 },
    {
      title: "处置审核",
      width: 140,
      render: (_: any, record: API.ItemApplyPage.RecordItem) => {
        if (!isChecked(record.disposeCheckedFlag)) return "-";
        return record.disposeCheckedFlag ? "通过" : "不通过";
      },
    },
    {
      title: "操作",
      width: 220,
      fixed: "right" as const,
      render: (_: any, record: API.ItemApplyPage.RecordItem) => (
        <Button.Group>
          <Button
            type="link"
            linkType="warning"
            disabled={isChecked(record.applyCheckedFlag)}
            onClick={() => openCheckModal("apply", record.id)}
          >
            申请审核
          </Button>
          <Button
            type="link"
            linkType="warning"
            disabled={isChecked(record.disposeCheckedFlag)}
            onClick={() => openCheckModal("dispose", record.id)}
          >
            处置审核
          </Button>
        </Button.Group>
      ),
    },
  ];

  return (
    <>
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

      <Modal
        title={checkModal.type === "dispose" ? "固定资产处置审核" : "固定资产申请审核"}
        open={checkModal.open}
        onCancel={() => setCheckModal((s) => ({ ...s, open: false }))}
        onOk={submitCheck}
        confirmLoading={checkLoading}
        okText="提交"
        cancelText="取消"
        width={520}
      >
        <Form form={checkForm} layout="vertical">
          <Item
            label="审核结果"
            name="checkedFlag"
            rules={[{ required: true, message: "请选择审核结果" }]}
          >
            <Radio.Group
              options={[
                { label: "通过", value: true },
                { label: "不通过", value: false },
              ]}
            />
          </Item>
          <Item label="审核意见" name="comment">
            <Input.TextArea rows={3} placeholder="请输入审核意见" />
          </Item>
        </Form>
      </Modal>
    </>
  );
};

export default observer(AssetsItemListsModal);
