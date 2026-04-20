import "dayjs/locale/zh-cn";
import { FC, CSSProperties } from "react";

import { PickerProps } from "antd/es/date-picker/generatePicker";
import locale from "antd/es/date-picker/locale/zh_CN";
import dayjs, { Dayjs } from "dayjs";

import Picker from "../utils/picker";

type DayType = Omit<PickerProps<Dayjs>, "onChange" | "value">;

interface DataPickerProps {
  format?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  style?: CSSProperties;
  showTime?: boolean;
}

const DataPicker: FC<DataPickerProps & DayType> = (props) => {
  const { value, onChange, format = "YYYY-MM-DD", style, ...all } = props;

  const handleChange = (value: Dayjs | Dayjs[] | null): void => {
    if (value) {
      onChange?.(dayjs(value as Dayjs).format(format));
    } else {
      onChange?.("");
    }
  };

  return (
    <Picker
      {...all}
      style={style ?? { width: "200px" }}
      value={value ? dayjs(value) : null}
      onChange={handleChange}
      locale={locale}
    />
  );
};

export default DataPicker;
