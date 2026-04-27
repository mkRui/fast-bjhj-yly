import { FC, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Input, Pagination, Space } from "antd";

import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import MorTable from "@/components/table";
import Button from "@/components/button";
import RunComponents from "@/components/run-component";
import { toast } from "@/components/message";

import StoreContext from "../store";
import { API } from "../types/api";
import TeacherFormModal from "../components/form-modal";

const TeacherMain: FC = () => {
  const store = useContext(StoreContext);
  const [keyword, setKeyword] = useState<string>(store.params.keyword || "");

  const columns = [
    { title: "姓名", dataIndex: "name" },
    { title: "性别", dataIndex: "gender", width: 120 },
    { title: "民族", dataIndex: "ethnicity" },
    {
      title: "证件照",
      dataIndex: "idPhoto",
      render: (url: string) =>
        url ? (
          <img
            src={url}
            alt="证件照"
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
        ) : (
          "-"
        ),
    },
    {
      title: "操作",
      dataIndex: "",
      width: 160,
      fixed: "right" as const,
      render: (_text: any, record: any) => (
        <Button.Group>
          <Button
            type="link"
            linkType="warning"
            onClick={() => {
              void handleEdit(record.id);
            }}
          >
            编辑
          </Button>
          <Button
            type="link"
            linkType="danger"
            action="del"
            onConfirm={() => {
              void store.del(Number(record.id));
            }}
          >
            删除
          </Button>
        </Button.Group>
      ),
    },
  ];

  const handleSearch = (): void => {
    store.$setParams({ keyword: keyword || undefined, current: 1 });
    void store.getList();
  };

  const handleChange = (current: number): void => {
    store.$setParams({ current });
    void store.getList();
  };

  const handlePageSize = (current: number, size: number): void => {
    store.$setParams({ current, size });
    void store.getList();
  };

  const handleEdit = async (id: number): Promise<void> => {
    const info = await store.getInfo(Number(id));
    if (!info) {
      toast("error", "获取教师信息失败");
      return;
    }

    const modal = new RunComponents({
      state: { loading: false },
      render: (state) => (
        <TeacherFormModal
          {...state}
          title="编辑教师"
          info={info}
          onCancel={() => modal.unmount()}
          onOk={async (params: API.Edit.Params) => {
            modal.setState({ loading: true });
            const ok = await store.edit(params);
            modal.setState({ loading: false });
            if (ok) {
              toast("success", "保存成功");
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  useEffect(() => {
    void store.getList();
  }, [store]);

  return (
    <Content style={{ flex: 1 }}>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle>教师管理</HeaderTitle>
        </Content.Header>
        <Content.Header>
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
        </Content.Header>
        <Content.Main>
          <MorTable
            bordered
            pagination={false}
            dataSource={store.list}
            columns={columns}
            rowKey={(record: any) => record.id}
            loading={store.loading}
          />
        </Content.Main>
      </Content.Layout>
      <Content.Footer>
        <div
          style={{
            height: "49px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 12px",
            boxSizing: "border-box",
          }}
        >
          <div></div>
          <Pagination
            showTotal={(total) => `共有 ${total} 条`}
            showSizeChanger={true}
            showQuickJumper={true}
            onChange={handleChange}
            onShowSizeChange={handlePageSize}
            total={store.data.total}
            current={store.data.current}
          />
        </div>
      </Content.Footer>
    </Content>
  );
};

export default observer(TeacherMain);
