import { FC, useCallback, useEffect, useState } from "react";
import { Modal } from "antd";
import type { ModalProps } from "antd/lib/modal";

import AttachmentFilenameCell from "@/components/attachment-filename-cell";
import Button from "@/components/button";
import MorTable, { TABLE_MODAL_BODY_STYLE } from "@/components/table";
import Upload from "@/components/upload";
import { toastActionResult } from "@/utils/common/mutation-success";
import { API } from "../types/api";

interface CompetitionAttachmentModalProps {
  competitionId: string;
  competitionName?: string;
  loading?: boolean;
  fetchAttachments: (competitionId: string) => Promise<API.AttachmentList.Data[]>;
  addAttachment: (params: API.AttachmentAdd.Params) => Promise<unknown>;
  delAttachment: (params: API.AttachmentDel.Params) => Promise<unknown>;
  onCancel: ModalProps["onCancel"];
}

const CompetitionAttachmentModal: FC<CompetitionAttachmentModalProps> = (props) => {
  const {
    competitionId,
    competitionName,
    loading: outerLoading,
    fetchAttachments,
    addAttachment,
    delAttachment,
    onCancel,
  } = props;

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [list, setList] = useState<API.AttachmentList.Data[]>([]);

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    const data = await fetchAttachments(competitionId);
    setList(data);
    setLoading(false);
  }, [competitionId, fetchAttachments]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleUpload = async (dist: string): Promise<void> => {
    if (!dist) return;
    setUploading(true);
    const result = await addAttachment({ competitionId, dist });
    setUploading(false);
    if (toastActionResult(result, "附件上传成功", "附件上传失败")) {
      await load();
    }
  };

  const columns = [
    {
      title: "文件名",
      dataIndex: "filename",
      render: (_: unknown, record: API.AttachmentList.Data) => (
        <AttachmentFilenameCell
          filename={record.filename}
          filepath={record.filepath}
          suffix={record.suffix}
        />
      ),
    },
    { title: "后缀", dataIndex: "suffix", width: 100 },
    {
      title: "操作",
      width: 100,
      render: (_: unknown, record: API.AttachmentList.Data) => (
        <Button
          type="link"
          linkType="danger"
          action="del"
          onConfirm={async () => {
            const result = await delAttachment({ id: record.id });
            if (toastActionResult(result, "删除成功", "删除失败")) {
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
      title={`竞赛附件${competitionName ? ` - ${competitionName}` : ""}`}
      open={true}
      width={760}
      onCancel={onCancel}
      footer={null}
    >
      <div style={{ ...TABLE_MODAL_BODY_STYLE, height: 480 }}>
        <div className="mb-4 flex shrink-0 items-center justify-between">
          <div className="text-sm text-gray-600">上传附件后将自动关联到当前竞赛</div>
          <Upload
            inline
            action="/common/upload"
            fileMode
            onChange={(dist) => {
              void handleUpload(dist);
            }}
          >
            <Button type="primary" action="add" loading={uploading}>
              上传附件
            </Button>
          </Upload>
        </div>
        <div className="min-h-0 flex-1 pb-2">
          <MorTable
            bordered
            pagination={false}
            dataSource={list}
            columns={columns as any}
            rowKey={(record) => record.id}
            auto
            loading={loading || outerLoading || uploading}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CompetitionAttachmentModal;
