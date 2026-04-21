import { FC, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Input, Pagination, Space } from "antd";

import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import MorTable from "@/components/table";
import Button from "@/components/button";
import RunComponents from "@/components/run-component";

import StoreContext from "../store";
import WorkRecordsModal from "../components/work-records-modal";

const WorkMain: FC = () => {
  const store = useContext(StoreContext);
  const [keyword, setKeyword] = useState<string>(store.teacherParams.keyword || "");

  const columns = [
    { title: "教师账号id", dataIndex: "id", width: 120 },
    { title: "姓名", dataIndex: "name" },
    { title: "性别", dataIndex: "gender", width: 120 },
    { title: "民族", dataIndex: "ethnicity" },
    {
      title: "操作",
      dataIndex: "",
      width: 120,
      fixed: "right" as const,
      render: (_text: any, record: any) => (
        <Button
          type="link"
          linkType="primary"
          onClick={() => {
            handleOpenRecords(Number(record.id), String(record.name || ""));
          }}
        >
          工时记录
        </Button>
      ),
    },
  ];

  const handleSearch = (): void => {
    store.$setTeacherParams({ keyword: keyword || undefined, current: 1 });
    void store.getTeacherList();
  };

  const handleOpenRecords = (teacherId: number, teacherName?: string): void => {
    const modal = new RunComponents({
      render: () => (
        <WorkRecordsModal
          teacherId={teacherId}
          teacherName={teacherName}
          fetchPage={(params) => store.getWorkPage(params)}
          onCancel={() => modal.unmount()}
        />
      ),
    });
  };

  useEffect(() => {
    void store.getTeacherList();
  }, [store]);

  return (
    <Content style={{ flex: 1 }}>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle
            insert={
              <Space>
                <Input
                  value={keyword}
                  placeholder="请输入关键词"
                  onChange={(e) => setKeyword(e.target.value)}
                  style={{ width: 260 }}
                  onPressEnter={handleSearch}
                  allowClear
                />
                <Button action="search" onClick={handleSearch}>
                  查询
                </Button>
              </Space>
            }
          >
            课时管理
          </HeaderTitle>
        </Content.Header>
        <Content.Main style={{ overflow: "unset" }}>
          <MorTable
            bordered
            pagination={false}
            dataSource={store.teacherList}
            columns={columns as any}
            rowKey={(record: any) => record.id}
            loading={store.loading}
          />
          <div className="flex justify-end mt-4">
            <Pagination
              current={store.teacherParams.current}
              pageSize={store.teacherParams.size}
              total={store.teacherData.total || 0}
              showSizeChanger
              onChange={(current, pageSize) => {
                store.$setTeacherParams({ current, size: pageSize });
                void store.getTeacherList();
              }}
            />
          </div>
        </Content.Main>
      </Content.Layout>
    </Content>
  );
};

export default observer(WorkMain);

