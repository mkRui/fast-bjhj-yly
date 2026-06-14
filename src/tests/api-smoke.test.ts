import { describe, expect, it } from "vitest";

const API_BASE = "http://aqzoracms.liangwannian.cn";
const runApiSmoke = process.env.RUN_API_SMOKE === "1";

describe.runIf(runApiSmoke)("后端 API 冒烟（需网络，RUN_API_SMOKE=1 启用）", () => {
  it("验证码接口可访问", async () => {
    const res = await fetch(`${API_BASE}/auth/captcha`, { method: "GET" });
    expect(res.status).toBeLessThan(500);
  });

  it("未登录访问业务接口应返回业务错误而非 5xx", async () => {
    const res = await fetch(`${API_BASE}/auth/init`, { method: "GET" });
    expect(res.status).toBeLessThan(500);
  });
});
