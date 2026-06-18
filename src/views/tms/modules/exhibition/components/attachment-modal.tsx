import { FC, useEffect, useState } from "react";
import { Modal } from "antd";
import type { ModalProps } from "antd/lib/modal";

import AttachmentFilenameCell from "@/components/attachment-filename-cell";
import MorTable, { TableModalBody } from "@/components/table";
import { API } from "../types/api";

interface AttachmentModalProps {
  exhibitionId: string;
  exhibitionName?: string;
  fetchAttachments: (exhibitionId: string) => Promise<API.AttachmentList.Data[]>;
  onCancel: ModalProps["onCancel"];
}

const AttachmentModal: FC<AttachmentModalProps> = (props) => {
  const { exhibitionId, exhibitionName, fetchAttachments, onCancel } = props;

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.AttachmentList.Data[]>([]);

  useEffect(() => {
    const load = async (): Promise<void> => {
      setLoading(true);
      const data = await fetchAttachments(exhibitionId);
      setList(data);
      setLoading(false);
    };
    void load();
  }, [exhibitionId, fetchAttachments]);

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
    { title: "后缀", dataIndex: "suffix", width: 120 },
    { title: "类型", dataIndex: "type", width: 100 },
  ];

  return (
    <Modal
      title={`展会附件${exhibitionName ? ` - ${exhibitionName}` : ""}`}
      open={true}
      width={720}
      onCancel={onCancel}
      footer={null}
    >
      <TableModalBody loading={loading}>
        <MorTable
          bordered
          pagination={false}
          dataSource={list}
          columns={columns}
          rowKey={(record) => record.id}
          auto
        />
      </TableModalBody>
    </Modal>
  );
};

export default AttachmentModal;
