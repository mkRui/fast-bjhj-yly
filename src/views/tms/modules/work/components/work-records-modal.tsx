import { FC, useContext, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { Input, InputNumber, Modal, Pagination, Space, Spin } from "antd";
import type { ModalProps } from "antd/lib/modal";

import RootContext from "@/stores/root-context";
import { DictCode } from "@/constants/dict-code";
import { getDictLabel } from "@/utils/common/dict";
import Button from "@/components/button";
import MorTable from "@/components/table";

import { API } from "../types/api";

interface WorkRecordsModalProps {
  teacherId: string;
  teacherName?: string;
  onCancel: ModalProps["onCancel"];
  fetchPage: (params: API.WorkPage.Params) => Promise<API.WorkPage.Data | null>;
}

const WorkRecordsModal: FC<WorkRecordsModalProps> = (props) => {
  const { teacherId, teacherName, onCancel, fetchPage } = props;
  const root = useContext(RootContext);

  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [year, setYear] = useState<number | undefined>(undefined);
  const [month, setMonth] = useState<number | undefined>(undefined);
  const [current, setCurrent] = useState(1);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState<API.WorkPage.Data>({
    size: 10,
    pages: 0,
    total: 0,
    records: [],
    current: 1,
  });

  const subjectDict = useMemo(() => {
    const list = root.getEnumData(DictCode.WORK_SUBJECT) || [];
    return {
      label: (value: unknown) => getDictLabel(list, value),
    };
  }, [root.enumList]);

  const columns = [
    { title: "上报日期", dataIndex: "date" },
    { title: "上报年份", dataIndex: "year", width: 120 },
    { title: "上报月份", dataIndex: "month", width: 120 },
    {
      title: "上报科目",
      dataIndex: "subject",
      render: (val: any) => subjectDict.label(val),
    },
    { title: "上报数量", dataIndex: "num", width: 120 },
  ];

  const runQuery = async (next?: Partial<API.WorkPage.Params>): Promise<void> => {
    setLoading(true);
    const data = await fetchPage({
      teacherId: teacherId,
      keyword: keyword || undefined,
      year,
      month,
      current,
      size,
      ...(next || {}),
    });
    setLoading(false);
    if (data) {
      setPage(data);
      setCurrent(data.current || current);
      setSize(data.size || size);
    }
  };

  useEffect(() => {
    void runQuery({ current: 1, size: 10 });
  }, []);

  return (
    <Modal
      title={`工时记录${teacherName ? ` - ${teacherName}` : ""}`}
      open={true}
      width={980}
      onCancel={onCancel}
      footer={null}
    >
      <Spin spinning={loading}>
        <div className="mb-4 flex items-end gap-4">
          <Space>
            <div>
              <div className="text-sm text-gray-600 mb-1">关键词</div>
              <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="请输入关键词"
                style={{ width: 220 }}
                allowClear
              />
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">年份</div>
              <InputNumber
                value={year}
                onChange={(v) => setYear(v ? Number(v) : undefined)}
                style={{ width: 140 }}
                min={2000}
                max={2100}
              />
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">月份</div>
              <InputNumber
                value={month}
                onChange={(v) => setMonth(v ? Number(v) : undefined)}
                style={{ width: 120 }}
                min={1}
                max={12}
              />
            </div>
            <Button
              action="search"
              onClick={() => {
                setCurrent(1);
                void runQuery({ current: 1 });
              }}
            >
              查询
            </Button>
          </Space>
        </div>

        <MorTable
          bordered
          pagination={false}
          dataSource={page.records || []}
          columns={columns as any}
          rowKey={(record: any) => record.id}
        />
        <div className="flex justify-end mt-4">
          <Pagination
            current={current}
            pageSize={size}
            total={page.total || 0}
            showSizeChanger
            onChange={(c, ps) => {
              setCurrent(c);
              setSize(ps);
              void runQuery({ current: c, size: ps });
            }}
          />
        </div>
      </Spin>
    </Modal>
  );
};

export default observer(WorkRecordsModal);
