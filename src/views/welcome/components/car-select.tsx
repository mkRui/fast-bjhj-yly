import { Select } from "antd";
import { observer } from "mobx-react";
import { FC, JSX, useEffect, useMemo, useState } from "react";

import axios from "@/api";
import { Api } from "../api";
import { API } from "../types/api";

const Option = Select.Option;

export interface CarSelectProps extends JSX.IntrinsicAttributes {
  value?: string;
  onChange?: (value?: string, item?: API.CarList.Item) => void;
  onInitChange?: (value?: string, list?: API.CarList.Item[]) => void;
  placeholder?: string;
  allowClear?: boolean;
}

const CarSelect: FC<CarSelectProps> = (props) => {
  const { value, placeholder, allowClear } = props;
  const api = useMemo(() => new Api(axios), []);

  const [list, setList] = useState<API.CarList.Item[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const [err, data] = await api.getCarList();
    setLoading(false);
    if (err) return;
    const next = Array.isArray(data) ? data : [];
    setList(next);
    if (!value && next.length) {
      props.onInitChange?.(String(next[0].id || ""), next);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const mapById = useMemo(() => {
    const map = new Map<string, API.CarList.Item>();
    list.forEach((it) => map.set(String(it.id), it));
    return map;
  }, [list]);

  return (
    <Select
      value={value}
      loading={loading}
      onChange={(v) => {
        const id = typeof v === "string" ? v : undefined;
        props.onChange?.(id, id ? mapById.get(id) : undefined);
      }}
      style={{ width: "100%", minWidth: "200px" }}
      placeholder={placeholder || "请选择车型"}
      allowClear={allowClear}
    >
      {list.map((item) => (
        <Option value={String(item.id)} key={String(item.id)}>
          <span aria-label={item.name || String(item.id)}>{item.name || String(item.id)}</span>
        </Option>
      ))}
    </Select>
  );
};

export default observer(CarSelect);

