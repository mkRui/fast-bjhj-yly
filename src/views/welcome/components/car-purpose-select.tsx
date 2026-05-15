import { Select } from "antd";
import { observer } from "mobx-react";
import { FC, JSX, useEffect, useMemo, useState } from "react";

import axios from "@/api";
import { Api } from "../api";
import { API } from "../types/api";

const Option = Select.Option;

export interface CarPurposeSelectProps extends JSX.IntrinsicAttributes {
  carId?: string;
  value?: string;
  onChange?: (value?: string, item?: API.CarPurposeList.Item) => void;
  onInitChange?: (value?: string, list?: API.CarPurposeList.Item[]) => void;
  placeholder?: string;
  allowClear?: boolean;
}

const CarPurposeSelect: FC<CarPurposeSelectProps> = (props) => {
  const { carId, value, placeholder, allowClear } = props;
  const api = useMemo(() => new Api(axios), []);

  const [list, setList] = useState<API.CarPurposeList.Item[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const id = String(carId || "");
    if (!id) {
      setList([]);
      return;
    }
    setLoading(true);
    const [err, data] = await api.getCarPurposeList({ carId: id });
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
  }, [carId]);

  const mapById = useMemo(() => {
    const map = new Map<string, API.CarPurposeList.Item>();
    list.forEach((it) => map.set(String(it.id), it));
    return map;
  }, [list]);

  return (
    <Select
      value={value}
      loading={loading}
      disabled={!carId}
      onChange={(v) => {
        const id = typeof v === "string" ? v : undefined;
        props.onChange?.(id, id ? mapById.get(id) : undefined);
      }}
      style={{ width: "100%", minWidth: "200px" }}
      placeholder={placeholder || "请选择用途"}
      allowClear={allowClear}
    >
      {list.map((item) => (
        <Option value={String(item.id)} key={String(item.id)}>
          <span aria-label={item.purpose || String(item.id)}>{item.purpose || String(item.id)}</span>
        </Option>
      ))}
    </Select>
  );
};

export default observer(CarPurposeSelect);

