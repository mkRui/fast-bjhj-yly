import { toast } from "@/components/message";

export type MutationFailure = { ok: false; err?: unknown };
export type MutationResult = true | false | MutationFailure | undefined;

/**
 * 判断 mutation 请求是否成功。
 * - 后端成功时 data 常为 null，不能用 if (res) 判断
 * - store 失败时常返回 false，不能与 undefined 混用
 */
export function isMutationSuccess(result: unknown): boolean {
  if (result && typeof result === "object" && "ok" in result) {
    return (result as MutationFailure).ok !== false;
  }
  if (typeof result === "boolean") return result;
  return result !== undefined;
}

export function getMutationError(result: unknown): unknown {
  if (
    result &&
    typeof result === "object" &&
    "ok" in result &&
    (result as MutationFailure).ok === false
  ) {
    return (result as MutationFailure).err ?? result;
  }
  return undefined;
}

export function extractErrorMessage(err: unknown, fallback = "操作失败"): string {
  if (typeof err === "string" && err) return err;
  if (err && typeof err === "object") {
    const record = err as Record<string, unknown>;
    if (typeof record.msg === "string" && record.msg) return record.msg;
    if (typeof record.message === "string" && record.message) return record.message;
  }
  return fallback;
}

/** mor-request 返回 [err] 后，统一解析 mutation 结果（失败时保留 err 供 toast 展示） */
export async function resolveMutation(
  err: unknown,
  onSuccess?: () => void | Promise<unknown>
): Promise<true | MutationFailure> {
  if (err) return { ok: false, err };
  if (onSuccess) await onSuccess();
  return true;
}

/** store 返回 boolean | MutationFailure 时，统一弹出成功/失败 toast */
export function toastActionResult(
  ok: unknown,
  successMsg: string,
  failMsg = "操作失败"
): boolean {
  if (isMutationSuccess(ok)) {
    toast("success", successMsg);
    return true;
  }
  toast("error", extractErrorMessage(getMutationError(ok), failMsg));
  return false;
}

/** 直接 await api 返回 [err] 时，统一弹出成功/失败 toast */
export function toastRequestResult(
  err: unknown,
  successMsg: string,
  failMsg?: string
): boolean {
  if (!err) {
    toast("success", successMsg);
    return true;
  }
  toast("error", failMsg ?? extractErrorMessage(err));
  return false;
}
