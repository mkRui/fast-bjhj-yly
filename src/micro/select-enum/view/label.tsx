import { FC, useContext, useMemo } from "react";
import { observer } from "mobx-react";

import root from "@/stores/root-context";
import { getDictLabel } from "@/utils/common/dict";

export interface EnumLabelProps {
  name: string;
  value?: unknown;
  fallback?: string;
  className?: string;
  style?: React.CSSProperties;
}

const EnumLabel: FC<EnumLabelProps> = (props) => {
  const { name, value, fallback = "-", className, style } = props;
  const store = useContext(root);

  const dict = useMemo(() => store.getEnumData(name) || [], [store.enumList, name]);
  const text = getDictLabel(dict, value, fallback);

  return (
    <span className={className} style={style}>
      {text}
    </span>
  );
};

export default observer(EnumLabel);
