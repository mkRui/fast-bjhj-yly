import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { Descriptions, Form, Input, Modal, Radio } from "antd";
import type { ModalProps } from "antd/lib/modal";

import { DictCode } from "@/constants/dict-code";
import { useDict } from "@/hooks/use-dict";

import { API } from "../types/api";

const Item = Form.Item;

export interface DisposeCheckModalProps {
  title: string;
  loading?: boolean;
  record: API.ApplyPage.RecordItem;
  onCancel: ModalProps["onCancel"];
  onOk: (params: API.DisposeCheck.Params) => void | Promise<void>;
}

const DisposeCheckModal: FC<DisposeCheckModalProps> = (props) => {
  const { title, loading, record, onCancel, onOk } = props;
  const [form] = Form.useForm();
  const assetsDisposeDict = useDict(DictCode.ASSETS_DISPOSE);
  const disposeType = record.dispose;

  useEffect(() => {
    form.setFieldsValue({
      applyId: record.id,
      checkedFlag: true,
      comment: "",
    });
  }, [form, record.id]);

  const handleOk = (): void => {
    void form.validateFields().then(async (values) => {
      await onOk({
        applyId: String(values.applyId),
        checkedFlag: Boolean(values.checkedFlag),
        comment: String(values.comment || ""),
      });
    });
  };

  return (
    <Modal
      title={title}
      open={true}
      onCancel={onCancel}
      onOk={handleOk}
      okText="提交"
      cancelText="取消"
      confirmLoading={loading}
      width={560}
    >
      <Descriptions column={2} size="small" bordered style={{ marginBottom: 16 }}>
        <Descriptions.Item label="资产分类">{record.categoryName || "-"}</Descriptions.Item>
        <Descriptions.Item label="固定资产">{record.assetName || "-"}</Descriptions.Item>
        <Descriptions.Item label="完整代码">{record.itemFullCode || "-"}</Descriptions.Item>
        <Descriptions.Item label="处置类型">{assetsDisposeDict.label(disposeType) || "-"}</Descriptions.Item>
        <Descriptions.Item label="申请人">{record.applyUserName || "-"}</Descriptions.Item>
        <Descriptions.Item label="申请时间">{record.applyTime || "-"}</Descriptions.Item>
        <Descriptions.Item label="申请原因" span={2}>
          {record.applyReason || "-"}
        </Descriptions.Item>
      </Descriptions>
      <Form form={form} layout="vertical">
        <Item name="applyId" hidden>
          <Input />
        </Item>
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
        <Item label="审核意见" name="comment" rules={[{ required: true, message: "请输入审核意见" }]}>
          <Input.TextArea rows={3} placeholder="请输入处置审核意见" />
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(DisposeCheckModal);
