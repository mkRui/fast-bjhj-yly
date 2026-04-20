import { Checkbox, Form, Row, Col } from "antd";
import { observer } from "mobx-react";
import { FC, useContext, useEffect, useState, JSX } from "react";

import ProductParamListContext from "../store";
import { API } from "../types";

export interface ProductParamValue {
  paramId: string;
  paramItemIdList: string[];
}

export interface SelectProductParamProp extends JSX.IntrinsicAttributes {
  value?: ProductParamValue[];
  onChange?: (value: ProductParamValue[]) => void;
  productId?: string;
  categoryId?: string;
  info?: ProductParamValue[];
}

const SelectProductParam: FC<SelectProductParamProp> = (props) => {
  const { value, productId, categoryId, info } = props;

  const store = useContext(ProductParamListContext);
  const [selectedMap, setSelectedMap] = useState<Record<string, string[]>>({});

  // Initialize from value or info
  useEffect(() => {
    const map: Record<string, string[]> = {};
    const source = (value && value.length > 0 ? value : info || []) as any[];
    source.forEach((pair: any) => {
      if (
        pair &&
        typeof pair.paramId !== "undefined" &&
        (typeof pair.paramItemId !== "undefined" ||
          Array.isArray(pair.paramItemIdList))
      ) {
        const key = String(pair.paramId);
        const ensure = (): void => {
          if (!map[key]) map[key] = [];
        };
        if (Array.isArray(pair.paramItemIdList)) {
          ensure();
          pair.paramItemIdList.forEach((v: any) => {
            const val = String(v);
            if (!map[key].includes(val)) map[key].push(val);
          });
        } else {
          ensure();
          const val = String(pair.paramItemId);
          if (!map[key].includes(val)) map[key].push(val);
        }
      }
    });
    setSelectedMap(map);

    // If we used info to set map, we should probably trigger onChange to sync with Form
    if ((!value || value.length === 0) && info && info.length > 0) {
      const arr: ProductParamValue[] = [];
      Object.keys(map).forEach((k) => {
        arr.push({
          paramId: k,
          paramItemIdList: map[k],
        });
      });
      props.onChange?.(arr);
    }
  }, [value, info]);

  const handleInit = async (): Promise<void> => {
    const params: API.ParamList.Params = {};
    if (productId) params.productId = productId;
    await store.getData(params);
  };

  useEffect(() => {
    void handleInit();
  }, [productId, categoryId]);

  const handleValueChange = (paramId: string, vals: any[]) => {
    const next = { ...selectedMap };
    if (vals && vals.length > 0) {
      next[String(paramId)] = vals.map(String);
    } else {
      delete next[String(paramId)];
    }
    setSelectedMap(next);

    const arr: ProductParamValue[] = Object.keys(next).map((k) => ({
      paramId: k,
      paramItemIdList: next[k],
    }));
    props.onChange?.(arr);
  };

  return (
    <div style={{ width: "100%" }}>
      {store.data?.map((group) => {
        const pid = group?.categoryParam?.id;
        const items = group?.categoryParamItemList || [];
        return (
          <div key={pid}>
            <div style={{ display: "flex", marginBottom: "20px" }}>
              <Form.Item
                label={`${group?.categoryParam?.name} | ${group?.categoryParam?.sname}`}
                style={{ marginBottom: 0, flex: 1 }}
              >
                <Checkbox.Group
                  value={selectedMap[String(pid)] || []}
                  onChange={(vals) => handleValueChange(String(pid), vals)}
                  style={{ width: "100%" }}
                >
                  <Row>
                    {items?.map((option) => (
                      <Col span={8} key={option?.id}>
                        <Checkbox
                          value={String(option?.id)}
                          disabled={!items || items.length === 0}
                        >
                          {option?.name} | {option?.value}
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default observer(SelectProductParam);
