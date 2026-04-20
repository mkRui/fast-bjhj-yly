import { FC, useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";

import { Content } from "@/components/container";
import RunComponents from "@/components/run-component/portal-component";
import HeaderTitle from "@/components/card-header";
import MorTable from "@/components/table";
import type { MorTableRef } from "@/components/table";
import Button from "@/components/button";
import { Input } from "antd";

import ProductAttrStore from "../store";
import RootContext from "@/stores/root-context";

import { API } from "../types/api";
import ProductAttrModal from "../components/form-modal";
import { toast } from "@/components/message";
import SelectEnum from "@/micro/select-enum";

interface Props {
  productId?: number | string;
  onExpose?: (getter: () => API.List.Data[]) => void;
}

const ProductAttrMain: FC<Props> = (props) => {
  const { productId: propsProductId, onExpose } = props;
  const store = useContext(ProductAttrStore);

  const root = useContext(RootContext);

  const [productId, setProductId] = useState<number | string>(
    propsProductId || ""
  );
  const [attrFilter, setAttrFilter] = useState<string | undefined>(undefined);
  const tableRef = useRef<MorTableRef>(null);

  const filteredList = attrFilter
    ? store.list.filter((item) => String(item.attr) == String(attrFilter))
    : store.list;

  const [sortedList, setSortedList] = useState<API.List.Data[]>([]);
  const sortedListRef = useRef<API.List.Data[]>([]);

  useEffect(() => {
    setSortedList(filteredList);
  }, [attrFilter, store.list]);

  useEffect(() => {
    sortedListRef.current = sortedList;
  }, [sortedList]);

  useEffect(() => {
    if (!onExpose) return;
    onExpose(() => {
      const ds = tableRef.current?.getCurrentDataSource?.();
      return (Array.isArray(ds) ? ds : sortedListRef.current) as API.List.Data[];
    });
  }, [onExpose]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "属性名",
      width: 100,
      dataIndex: "attr",
      render: (text: any) => {
        return root
          .getEnumData("PRODUCT_ATTR")
          ?.find((item) => item.code == text)?.desc;
      },
    },
    {
      title: "内容",
      dataIndex: "type",
      render: (text: any, record: API.List.Data) => {
        if (text === 1) {
          return (
            <div>
              <img className="w-[50px]" src={record.value} alt="" />
            </div>
          );
        } else if (text === 4) {
          return (
            <div>
              <video src={record.value} controls className="h-[100%]" />
            </div>
          );
        } else {
          return (
            <div
              dangerouslySetInnerHTML={{
                __html: record.value,
              }}
            ></div>
          );
        }
      },
    },
    {
      title: "类型",
      width: 100,
      dataIndex: "type",
      render: (text: any) => {
        return root
          .getEnumData("PRODUCT_ATTR_TYPE")
          ?.find((item) => item.code == text)?.desc;
      },
    },
    {
      title: "排序",
      width: 100,
      dataIndex: "sort",
    },
    {
      title: "操作",
      dataIndex: "",
      width: 80,
      fixed: "right" as const,
      render: (_text: any, record: API.List.Data) => {
        return (
          <Button.Group>
            <Button
              type="link"
              linkType="danger"
              action="del"
              onConfirm={() => store.delItem({ id: record.id })}
            >
              删除
            </Button>
          </Button.Group>
        );
      },
    },
  ];

  // handleMethods
  const handleAddProductAttr = (): void => {
    const modal = new RunComponents({
      state: {
        loading: false,
      },
      render: (state) => (
        <ProductAttrModal
          {...state}
          title="新增产品属性"
          onCancel={() => {
            modal.unmount();
          }}
          onOk={async (params: any): Promise<void> => {
            console.log(params);

            const normalizedValue: string[] = Array.isArray(params.value)
              ? params.value
              : params.value
                ? [String(params.value)]
                : [];

            const r = await store.addItem({
              ...params,
              value: normalizedValue,
              productId,
              sort: params.sort,
            });
            if (r) {
              toast("success", "新增成功");
            }
          }}
        />
      ),
    });
  };

  useEffect(() => {
    store.getList({ productId });
  }, [productId]);

  useEffect(() => {
    if (propsProductId) {
      setProductId(propsProductId);
    }
  }, [propsProductId]);

  if (propsProductId) {
    return (
      <div>
        <div style={{ marginBottom: 16, textAlign: "right" }}>
          <Button type="primary" onClick={handleAddProductAttr}>
            新增产品属性
          </Button>
        </div>
        {/* 商品分类筛选 */}
        <div style={{ marginBottom: 16, textAlign: "left" }}>
          <div style={{ display: "inline-block" }}>
            <SelectEnum
              name="PRODUCT_ATTR"
              placeholder="请选择商品分类"
              allowClear
              value={attrFilter}
              onChange={(val: any) => setAttrFilter(val ? String(val) : undefined)}
            ></SelectEnum>
          </div>
        </div>
        <MorTable
          ref={tableRef}
          bordered
          pagination={false}
          dataSource={sortedList}
          columns={columns}
          rowKey={(record) => record.id}
          loading={store.loading}
          auto
          rowSortable
          onRowSort={(next) => setSortedList(next as API.List.Data[])}
        />
      </div>
    );
  }

  return (
    <Content>
      <Content.Layout>
        <Content.Header>
          <HeaderTitle
            insert={
              <Button type="primary" onClick={handleAddProductAttr}>
                新增产品属性
              </Button>
            }
          >
            产品属性管理
            <div style={{ display: "inline-block", marginLeft: 20 }}>
              <Input
                placeholder="请输入产品ID筛选"
                style={{ width: 200 }}
                value={productId}
                onChange={(e) => {
                  setProductId(e.target.value);
                }}
              />
            </div>
            <div style={{ display: "inline-block", marginLeft: 20 }}>
              <SelectEnum
                name="PRODUCT_ATTR"
                placeholder="请选择商品分类"
                allowClear
                value={attrFilter}
                onChange={(val: any) => setAttrFilter(val ? String(val) : undefined)}
              ></SelectEnum>
            </div>
          </HeaderTitle>
        </Content.Header>
        <Content.Main>
          <MorTable
            ref={tableRef}
            bordered
            pagination={false}
            dataSource={sortedList}
            columns={columns}
            rowKey={(record) => record.id}
            loading={store.loading}
            auto
            rowSortable
            onRowSort={(next) => setSortedList(next as API.List.Data[])}
          />
        </Content.Main>
      </Content.Layout>
    </Content>
  );
};

export default observer(ProductAttrMain);
