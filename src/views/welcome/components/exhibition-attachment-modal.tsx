import { FC, useCallback, useEffect, useState } from "react";
import { Modal, Spin } from "antd";
import type { ModalProps } from "antd/lib/modal";

import Button from "@/components/button";
import MorTable from "@/components/table";
import Upload from "@/components/upload";
import { toastActionResult } from "@/utils/common/mutation-success";
import { API } from "../types/api";

interface ExhibitionAttachmentModalProps {
  exhibitionId: number;
  exhibitionName?: string;
  loading?: boolean;
  fetchAttachments: (exhibitionId: number) => Promise<API.ExhibitionAttachmentList.Data[]>;
  addAttachment: (params: API.ExhibitionAttachmentAdd.Params) => Promise<boolean>;
  delAttachment: (id: number) => Promise<boolean>;
  onCancel: ModalProps["onCancel"];
}

const ExhibitionAttachmentModal: FC<ExhibitionAttachmentModalProps> = (props) => {
  const {
    exhibitionId,
    exhibitionName,
    loading: outerLoading,
    fetchAttachments,
    addAttachment,
    delAttachment,
    onCancel,
  } = props;

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [list, setList] = useState<API.ExhibitionAttachmentList.Data[]>([]);

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    const data = await fetchAttachments(exhibitionId);
    setList(data);
    setLoading(false);
  }, [exhibitionId, fetchAttachments]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleUpload = async (dist: string): Promise<void> => {
    if (!dist) return;
    setUploading(true);
    const ok = await addAttachment({ exhibitionId, dist });
    setUploading(false);
    if (toastActionResult(ok, "附件上传成功", "附件上传失败")) {
      await load();
    }
  };

  const columns = [
    { title: "文件名", dataIndex: "filename" },
    { title: "后缀", dataIndex: "suffix", width: 100 },
    { title: "类型", dataIndex: "type", width: 80 },
    {
      title: "操作",
      width: 100,
      render: (_: unknown, record: API.ExhibitionAttachmentList.Data) => (
        <Button
          type="link"
          linkType="danger"
          action="del"
          onConfirm={async () => {
            const ok = await delAttachment(record.id);
            if (toastActionResult(ok, "删除成功", "删除失败")) {
              await load();
            }
          }}
        >
          删除
        </Button>
      ),
    },
  ];

  return (
    <Modal
      title={`展会附件${exhibitionName ? ` - ${exhibitionName}` : ""}`}
      open={true}
      width={760}
      onCancel={onCancel}
      footer={null}
    >
      <Spin spinning={loading || outerLoading || uploading}>
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">上传附件后将自动关联到当前展会</div>
          <Upload
            inline
            action="/common/upload"
            onChange={(dist) => {
              void handleUpload(dist);
            }}
          >
            <Button type="primary" action="add">
              上传附件
            </Button>
          </Upload>
        </div>
        <MorTable
          bordered
          pagination={false}
          dataSource={list}
          columns={columns as any}
          rowKey={(record) => record.id}
        />
      </Spin>
    </Modal>
  );
};

export default ExhibitionAttachmentModal;
