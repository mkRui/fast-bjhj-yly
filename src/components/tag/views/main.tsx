import { FC, useState, useEffect, useCallback, memo } from "react";
import { Tag } from "antd";
import { getTypesValue } from "@/types";

interface MorTagTypes {
  name?: any;
  value: any;
  success?: any;
  error?: any;
  warning?: any;
  processing?: any;
}

const MorTag: FC<MorTagTypes> = memo((props) => {
  const { name, value, success, error, warning, processing } = props;

  const [type, setType] = useState("default");

  const typeSwitch = useCallback((theme: string, state: any): void => {
    if (typeof state === "object") {
      if (state.indexOf(value) !== -1) {
        setType(theme);
      }
    } else {
      if (state === value) {
        setType(theme);
      }
    }
  }, [value]);

  useEffect(() => {
    ["success", "error", "warning", "processing"].forEach((item) => {
      const stateValue = item === "success" ? success : 
                        item === "error" ? error :
                        item === "warning" ? warning : processing;
      typeSwitch(item, stateValue);
    });
  }, [value, success, error, warning, processing, typeSwitch]);

  return (
    <Tag color={type}>{name ? getTypesValue(name, value) : value}</Tag>
  );
});

MorTag.displayName = 'MorTag';

export default MorTag;
