import { FC, useContext } from "react";
import { observer } from "mobx-react";
import { Pagination, Form, Input } from "antd";

import { Content } from "@/components/container";
import RunComponents from "@/components/run-component";
import RunRootComponents from "@/components/run-component/portal-component";
import HeaderTitle from "@/components/card-header";
import MorTable from "@/components/table";
import Button from "@/components/button";
import { toast } from "@/components/message";
import SelectCategory from "@/micro/select-category";

import ProductStore from "../store/index";
import { API } from "../types/api";
import OverallSituationSearch from "@/components/overall-situation-search";
import ProductModal from "../components/form-modal";
import ProductAttrModal from "../components/attr-modal";
import ProductSpecModal from "../components/spec-modal";

const Item = Form.Item;
const ProductMain: FC = () => {
  const store = useContext(ProductStore);

  const columns = [
    {
      title: "主图",
      dataIndex: ["mainImage", "value"],
      render: (url: string) =>
        url ? (
          <img
            src={url}
            alt="主图"
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
        ) : (
          "-"
        ),
    },
    {
      title: "产品名称",
      dataIndex: ["product", "name"],
    },
    {
      title: "展示名称",
      dataIndex: ["product", "sname"],
    },
    {
      title: "操作",
      dataIndex: "",
      width: 240,
      fixed: "right" as const,
      render: (_text: any, record: API.List.Records) => {
        return (
          <Button.Group>
            <Button
              type="link"
              linkType="warning"
              onClick={() => handleOpenProductAttr(record)}
            >
              设置属性
            </Button>
            <Button
              type="link"
              linkType="warning"
              onClick={() => handleOpenProductSpec(record)}
            >
              设置规格
            </Button>
            <Button
              type="link"
              linkType="warning"
              onClick={() => handleEditProduct(record)}
            >
              编辑
            </Button>
            <Button
              type="link"
              linkType="danger"
              action="del"
              onConfirm={() => store.delItem(record.product.id)}
            >
              删除
            </Button>
          </Button.Group>
        );
      },
    },
  ];

  const handleAddProduct = (): void => {
    const modal = new RunComponents({
      state: {},
      render: () => (
        <ProductModal
          title="新增产品"
          init={{
            categoryId: store.params.categoryId || "",
            name: "",
            sname: "",
          }}
          onCancel={() => {
            modal.unmount();
          }}
          onOk={async (params: API.AddItem.Params): Promise<void> => {
            const res = await store.addItem({
              ...params,
            });
            if (res) {
              toast("success", "新增成功");
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const handleOpenProductAttr = (record: API.List.Records): void => {
    const modal = new RunRootComponents({
      state: {},
      render: () => (
        <ProductAttrModal
          title={`产品属性管理-${record.product.name}`}
          productId={`${record.product.id}`}
          onCancel={() => {
            modal.unmount();
          }}
          onOk={async (list) => {
            const arr = Array.isArray(list) ? list : [];
            const tasks = arr
              .filter((item: any) => item && typeof item.id !== "undefined")
              .map((item: any, index: number) => {
                const value: string[] = Array.isArray(item.value)
                  ? item.value.map(String)
                  : item.value
                    ? [String(item.value)]
                    : [];
                return store.setProductAttr({
                  id: item.id,
                  productAttr: {
                    productId: item.productId ?? record.product.id,
                    attr: String(item.attr),
                    type: String(item.type),
                    value,
                    sort: index,
                  },
                });
              });

            if (tasks.length === 0) {
              modal.unmount();
              return;
            }

            const res = await Promise.all(tasks);
            const okCount = res.filter(Boolean).length;
            if (okCount === tasks.length) {
              toast("success", "保存成功");
            } else {
              toast("error", `保存失败：成功 ${okCount} 条，失败 ${tasks.length - okCount} 条`);
            }
            modal.unmount();
          }}
        />
      ),
    });
  };

  const handleOpenProductSpec = async (
    record: API.List.Records
  ): Promise<void> => {
    const info = await store.getProductParam(record.product.id);
    const modal = new RunComponents({
      state: {},
      render: () => (
        <ProductSpecModal
          title="设置产品规格"
          productId={record.product.id}
          info={info}
          onCancel={() => {
            modal.unmount();
          }}
          onOk={async (params: API.SetProductParam.Params): Promise<void> => {
            const res = await store.setProductParam({
              ...params,
            });
            if (res) {
              toast("success", "设置成功");
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const handleEditProduct = (record: API.List.Records): void => {
    const modal = new RunComponents({
      state: {},
      render: () => (
        <ProductModal
          title="编辑产品"
          info={record.product}
          onCancel={() => {
            modal.unmount();
          }}
          onOk={async (params: API.AddItem.Params): Promise<void> => {
            const res = await store.setItem({
              id: record.product.id,
              product: {
                ...params,
              },
            });
            if (res) {
              toast("success", "编辑成功");
              modal.unmount();
            }
          }}
        />
      ),
    });
  };

  const handleChange = (page: number): void => {
    store.$setParams({
      current: page,
    });
    void store.getList();
  };

  const handlePageSize = (_current: number, size: number): void => {
    store.$setParams({
      current: 1,
      size,
    });
    void store.getList();
  };

  const onFinish = (params: any) => {
    store.$setParams({
      ...params,
      current: 1,
    });
    void store.getList();
  };

  const onReset = () => {
    store.$setParams({
      current: 1,
      size: store.params.size,
      keyword: undefined,
      categoryId: undefined,
    });
    void store.getList();
  };

  const handleChangeCategory = (categoryId: string): void => {
    store.$setParams({
      categoryId,
      current: 1,
    });
    void store.getList();
  };

  return (
    <Content>
      <Content.Layout>
        <Content.Header>
          <HeaderTitle
            insert={
              <Button type="primary" onClick={handleAddProduct}>
                新增产品
              </Button>
            }
          >
            产品管理
          </HeaderTitle>
        </Content.Header>
        <Content.Header>
          <OverallSituationSearch
            info={store.params}
            onFinish={onFinish}
            onReset={onReset}
          >
            <Item name="categoryId">
              <SelectCategory
                onInitChange={handleChangeCategory}
                onChange={handleChangeCategory}
              />
            </Item>
            <Item name="keyword">
              <Input placeholder="请输入关键字" />
            </Item>
          </OverallSituationSearch>
        </Content.Header>
        <Content.Main>
          <MorTable
            bordered
            pagination={false}
            dataSource={store.list}
            columns={columns}
            rowKey={(record) => record.product.id}
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

export default observer(ProductMain);
