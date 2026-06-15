import type { API } from "@/api/type";

export function resolveEnumDict(
  _code: string,
  dict: API.GetEnum.Dict[] | undefined
): API.GetEnum.Dict[] {
  return dict?.length ? dict : [];
}

export function getDictLabel(
  dict: API.GetEnum.Dict[] | undefined,
  code: unknown,
  fallback = "-"
): string {
  if (code === null || code === undefined || code === "") return fallback;
  const key = String(code);
  return dict?.find((item) => item.code === key)?.desc ?? key;
}

export function dictToOptions(
  dict: API.GetEnum.Dict[] | undefined,
  valueType: "string" | "number" = "string"
): { label: string; value: string | number }[] {
  return (dict || []).map((item) => ({
    label: item.desc,
    value: valueType === "number" ? Number(item.code) : item.code,
  }));
}
