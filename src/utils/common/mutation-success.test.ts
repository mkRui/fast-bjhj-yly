import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  extractErrorMessage,
  getMutationError,
  isMutationSuccess,
  resolveMutation,
  toastActionResult,
  toastRequestResult,
} from "./mutation-success";

vi.mock("@/components/message", () => ({
  toast: vi.fn(),
}));

import { toast } from "@/components/message";

describe("isMutationSuccess", () => {
  it("true 为成功", () => {
    expect(isMutationSuccess(true)).toBe(true);
  });

  it("false 为失败（修复入库误报成功）", () => {
    expect(isMutationSuccess(false)).toBe(false);
  });

  it("undefined 为失败", () => {
    expect(isMutationSuccess(undefined)).toBe(false);
  });

  it("非空字符串为成功（如登录 token）", () => {
    expect(isMutationSuccess("token-abc")).toBe(true);
  });

  it("{ ok: false } 为失败", () => {
    expect(isMutationSuccess({ ok: false, err: { msg: "操作失败" } })).toBe(false);
  });
});

describe("extractErrorMessage", () => {
  it("优先读取 msg", () => {
    expect(extractErrorMessage({ msg: "库存不足" }, "默认")).toBe("库存不足");
  });

  it("字符串错误直接返回", () => {
    expect(extractErrorMessage("网络异常")).toBe("网络异常");
  });

  it("无信息时返回 fallback", () => {
    expect(extractErrorMessage(null)).toBe("操作失败");
  });
});

describe("resolveMutation", () => {
  it("无 err 时执行 onSuccess 并返回 true", async () => {
    const onSuccess = vi.fn();
    const result = await resolveMutation(null, onSuccess);
    expect(result).toBe(true);
    expect(onSuccess).toHaveBeenCalledOnce();
  });

  it("有 err 时不执行 onSuccess 并返回失败对象", async () => {
    const err = { code: 1, msg: "操作失败" };
    const onSuccess = vi.fn();
    const result = await resolveMutation(err, onSuccess);
    expect(result).toEqual({ ok: false, err });
    expect(onSuccess).not.toHaveBeenCalled();
  });
});

describe("toastActionResult", () => {
  beforeEach(() => {
    vi.mocked(toast).mockClear();
  });

  it("成功时弹出 success", () => {
    const ok = toastActionResult(true, "保存成功", "保存失败");
    expect(ok).toBe(true);
    expect(toast).toHaveBeenCalledWith("success", "保存成功");
  });

  it("false 时弹出 error 且不显示成功", () => {
    const ok = toastActionResult(false, "入库成功", "入库失败");
    expect(ok).toBe(false);
    expect(toast).toHaveBeenCalledWith("error", "入库失败");
  });

  it("失败对象展示接口 msg", () => {
    toastActionResult({ ok: false, err: { msg: "操作失败" } }, "入库成功", "入库失败");
    expect(toast).toHaveBeenCalledWith("error", "操作失败");
  });
});

describe("toastRequestResult", () => {
  beforeEach(() => {
    vi.mocked(toast).mockClear();
  });

  it("无 err 为成功", () => {
    expect(toastRequestResult(null, "申请成功", "申请失败")).toBe(true);
    expect(toast).toHaveBeenCalledWith("success", "申请成功");
  });

  it("有 err 为失败并展示 msg", () => {
    expect(toastRequestResult({ msg: "参数错误" }, "申请成功")).toBe(false);
    expect(toast).toHaveBeenCalledWith("error", "参数错误");
  });
});

describe("getMutationError", () => {
  it("从失败对象提取 err", () => {
    const err = { msg: "x" };
    expect(getMutationError({ ok: false, err })).toBe(err);
  });
});
