import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";

import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import MorTable from "@/components/table";
import Button from "@/components/button";

import { Pagination } from "antd";

import context from "../store/index";
import { API } from "../types/api";

const TemplateMain: FC = () => {
  const store = useContext(context);

  const columns = [
    {
      title: "联系人",
      dataIndex: "contacts",
    },
    {
      title: "电子邮箱",
      dataIndex: "email",
    },
    {
      title: "联系电话",
      dataIndex: "phone",
    },
    {
      title: "公司名称",
      dataIndex: "companyName",
    },
    {
      title: "操作",
      dataIndex: "",
      width: 170,
      fixed: "right" as const,
      render: (_text: any, record: API.Intention.Records) => {
        return (
          <Button.Group>
            <Button
              type="link"
              linkType="primary"
              title="是否确定完成回访"
              onConfirm={() => store.setItem({ id: record.id })}
            >
              完成回访
            </Button>
          </Button.Group>
        );
      },
    },
  ];

  const handleChange = (page: number): void => {
    store.$setParams({
      current: page,
      size: store.params.size,
    });
  };

  const handlePageSize = (_current: number, size: number): void => {
    store.$setParams({
      current: 1,
      size,
    });
    void store.getList();
  };

  useEffect(() => {
    void store.getList();
  }, []);

  return (
    <Content>
      <Content.Layout>
        <Content.Header>
          <HeaderTitle>合作意向</HeaderTitle>
        </Content.Header>
        <Content.Main>
          <MorTable
            bordered
            pagination={false}
            dataSource={store.list}
            columns={columns}
            rowKey={(record) => record.id}
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
            current={store.data.current}
            showTotal={(total) => `共有 ${total} 条`}
            showSizeChanger={true}
            showQuickJumper={true}
            onChange={handleChange}
            onShowSizeChange={handlePageSize}
          />
        </div>
      </Content.Footer>
    </Content>
  );
};

export default observer(TemplateMain);
