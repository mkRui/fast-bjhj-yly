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
    { title: "教师账号id", dataIndex: "id", width: 120 },
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
            教师管理
          </HeaderTitle>
        </Content.Header>
        <Content.Main style={{ overflow: "unset" }}>
          <MorTable
            bordered
            pagination={false}
            dataSource={store.list}
            columns={columns}
            rowKey={(record: any) => record.id}
            loading={store.loading}
          />
          <div className="flex justify-end mt-4">
            <Pagination
              current={store.params.current}
              pageSize={store.params.size}
              total={store.data.total || 0}
              showSizeChanger
              onChange={(current, pageSize) => {
                store.$setParams({ current, size: pageSize });
                void store.getList();
              }}
            />
          </div>
        </Content.Main>
      </Content.Layout>
    </Content>
  );
};

export default observer(TeacherMain);

