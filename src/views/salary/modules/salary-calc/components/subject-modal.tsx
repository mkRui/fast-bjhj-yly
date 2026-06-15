import { FC, useCallback, useEffect, useState } from "react";
import { Modal } from "antd";
import type { ModalProps } from "antd/lib/modal";

import MorTable from "@/components/table";
import Button from "@/components/button";
import RunComponents from "@/components/run-component";
import { toastActionResult, type MutationResult } from "@/utils/common/mutation-success";

import { API } from "../types/api";
import SubjectAddModal from "./subject-add-modal";

interface SubjectModalProps {
  record: API.Page.RecordItem;
  year: number;
  month: number;
  fetchSubjects: (params: API.SubjectList.Params) => Promise<API.SubjectList.Data[]>;
  addSubject: (params: API.SubjectAdd.Params) => Promise<MutationResult>;
  delSubject: (id: string) => Promise<MutationResult>;
  onCancel: ModalProps["onCancel"];
}

const SubjectModal: FC<SubjectModalProps> = (props) => {
  const { record, year, month, fetchSubjects, addSubject, delSubject, onCancel } = props;

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.SubjectList.Data[]>([]);

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    const data = await fetchSubjects({
      year,
      month,
      teacherId: record.teacherId,
    });
    setList(data);
    setLoading(false);
  }, [fetchSubjects, year, month, record.teacherId]);

  useEffect(() => {
    void load();
  }, [load]);

  const openAddModal = (): void => {
    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <SubjectAddModal
          {...state}
          title="新增工资明细"
          salaryId={record.id}
          onCancel={() => modal.unmount()}
          onOk={async (params) => {
            modal.setState({ loading: true });
            const ok = await addSubject(params);
            modal.setState({ loading: false });
            if (toastActionResult(ok, "新增成功", "新增失败")) {
              modal.unmount();
              await load();
            }
          }}
        />
      ),
    });
  };

  const columns = [
    { title: "项目名", dataIndex: "subject" },
    { title: "金额", dataIndex: "amount", width: 140 },
    {
      title: "操作",
      width: 100,
      render: (_: unknown, item: API.SubjectList.Data) => (
        <Button
          type="link"
          linkType="danger"
          action="del"
          onConfirm={async () => {
            const ok = await delSubject(item.id);
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
      title={`工资明细 - ${record.teacherUserName || ""}（${year}年${month}月）`}
      open={true}
      width={720}
      onCancel={onCancel}
      footer={null}
    >
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <Button type="primary" action="add" onClick={openAddModal}>
          新增明细
        </Button>
      </div>
      <MorTable
        bordered
        pagination={false}
        dataSource={list}
        columns={columns as any}
        rowKey={(item) => item.id}
        loading={loading}
      />
    </Modal>
  );
};

export default SubjectModal;
