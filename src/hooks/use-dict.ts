import { useContext, useMemo } from "react";

import type { API } from "@/api/type";
import RootContext from "@/stores/root-context";
import { dictToOptions, getDictLabel } from "@/utils/common/dict";

export function useDict(code: string) {
  const root = useContext(RootContext);
  const dict = useMemo(
    () => root.getEnumData(code) || [],
    [root.enumList, code]
  );

  return {
    dict,
    label: (value: unknown, fallback = "-") => getDictLabel(dict, value, fallback),
    options: (valueType: "string" | "number" = "string") =>
      dictToOptions(dict, valueType),
  };
}

export type DictItem = API.GetEnum.Dict;
