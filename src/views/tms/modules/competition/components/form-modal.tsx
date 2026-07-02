import { FC, useEffect, useMemo, useState } from "react";
import { Form, Input, Modal, Select } from "antd";
import type { ModalProps } from "antd/lib/modal";

import DatePicker from "@/components/date-picker";
import { UploadList } from "@/components/upload";
import { useFormInitialValues } from "@/hooks/use-form-initial-values";
import type { Teacher } from "@/views/personal-info/types/api";

const Item = Form.Item;

export interface CompetitionFormValues {
  date: string;
  name: string;
  location: string;
  teacherList: string[];
  studentList: string[];
  distList?: string[];
}

interface CompetitionFormModalProps {
  title: string;
  loading?: boolean;
  init?: Partial<CompetitionFormValues>;
  presetTeachers?: Teacher[];
  showAttachments?: boolean;
  searchTeachers: (keyword: string) => Promise<Teacher[]>;
  onCancel: ModalProps["onCancel"];
  onOk: (params: CompetitionFormValues) => void | Promise<void>;
}

const CompetitionFormModal: FC<CompetitionFormModalProps> = (props) => {
  const {
    title,
    loading,
    init,
    presetTeachers,
    showAttachments = false,
    searchTeachers,
    onCancel,
    onOk,
  } = props;
  const [form] = Form.useForm<CompetitionFormValues>();
  const [teacherOptions, setTeacherOptions] = useState<Teacher[]>([]);
  const [teacherLoading, setTeacherLoading] = useState(false);

  useFormInitialValues(form, {
    date: init?.date || "",
    name: init?.name || "",
    location: init?.location || "",
    teacherList: init?.teacherList || [],
    studentList: init?.studentList || [],
    distList: init?.distList || [],
  });

  const loadTeachers = async (keyword = " "): Promise<void> => {
    setTeacherLoading(true);
    const list = await searchTeachers(keyword);
    setTeacherOptions(list);
    setTeacherLoading(false);
  };

  useEffect(() => {
    if (presetTeachers?.length) {
      setTeacherOptions(presetTeachers);
      return;
    }
    void loadTeachers(" ");
  }, [presetTeachers]);

  const teacherSelectOptions = useMemo(() => {
    const map = new Map<string, Teacher>();
    teacherOptions.forEach((item) => map.set(String(item.id), item));
    (init?.teacherList || []).forEach((id) => {
      if (!map.has(String(id))) {
        map.set(String(id), { id: String(id), name: `教师${id}` } as Teacher);
      }
    });
    return Array.from(map.values()).map((item) => ({
      value: String(item.id),
      label: item.name || `教师${item.id}`,
    }));
  }, [teacherOptions, init?.teacherList]);

  const handleOk = (): void => {
    void form.validateFields().then(async (values) => {
      await onOk({
        date: String(values.date || ""),
        name: String(values.name || ""),
        location: String(values.location || ""),
        teacherList: (values.teacherList || []).map(String),
        studentList: (values.studentList || []).map(String).filter(Boolean),
        distList: values.distList || [],
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
      okText="保存"
      cancelText="取消"
      width={640}
    >
      <Form form={form} layout="vertical">
        <Item label="竞赛日期" name="date" rules={[{ required: true, message: "请选择竞赛日期" }]}>
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} placeholder="请选择竞赛日期" />
        </Item>
        <Item label="竞赛名称" name="name" rules={[{ required: true, message: "请输入竞赛名称" }]}>
          <Input placeholder="请输入竞赛名称" />
        </Item>
        <Item label="竞赛地点" name="location">
          <Input placeholder="请输入竞赛地点" />
        </Item>
        <Item label="辅导教师" name="teacherList">
          <Select
            mode="multiple"
            allowClear
            showSearch
            filterOption={false}
            loading={teacherLoading}
            placeholder="请选择辅导教师"
            options={teacherSelectOptions}
            onSearch={(value) => {
              void loadTeachers(value || " ");
            }}
          />
        </Item>
        <Item label="参赛学生" name="studentList">
          <Select mode="tags" allowClear placeholder="输入学生姓名后回车添加" tokenSeparators={[","]} />
        </Item>
        {showAttachments ? (
          <Item label="附件" name="distList">
            <UploadList action="/common/upload" dataType="array" fileMode />
          </Item>
        ) : null}
      </Form>
    </Modal>
  );
};

export default CompetitionFormModal;
