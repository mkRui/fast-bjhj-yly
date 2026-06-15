import { describe, expect, it } from "vitest";

import { DictCode } from "@/constants/dict-code";
import { getDictLabel, resolveEnumDict } from "@/utils/common/dict";

describe("resolveEnumDict", () => {
  it("接口有数据时返回字典项", () => {
    const apiDict = [{ code: "1", desc: "男" }];
    expect(resolveEnumDict(DictCode.GENDER, apiDict)).toEqual(apiDict);
  });

  it("接口为空时返回空数组", () => {
    expect(resolveEnumDict(DictCode.GENDER, [])).toEqual([]);
  });

  it("getDictLabel 能解析字典文案", () => {
    const dict = [{ code: "1", desc: "男" }, { code: "2", desc: "女" }];
    expect(getDictLabel(dict, 1)).toBe("男");
    expect(getDictLabel(dict, 2)).toBe("女");
  });
});
