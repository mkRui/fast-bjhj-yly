/**
 * 菜单资源编码，需与后端 sys/res 及角色授权 resList 保持一致。
 */
export const MenuCode = {
  WELCOME: "user:welcome",
  PERSONAL_INFO: "user:teacher:info",
  TMS_TEACHER: "tms:teacher",
  TMS_WORK: "tms:work",
  TMS_LEAVE: "tms:leave",
  TMS_EXHIBITION: "tms:exhibition",
  SALARY_BASE: "sms:salary:base",
  SALARY_CALC: "sms:salary:calc",
  SYS_USER: "sys:user:manage",
  SYS_ROLE: "sys:role:manage",
  SYS_RES: "sys:res:manage",
  SMS_PERIOD: "sms:period",
  AMS_CATEGORY: "ams:category",
  AMS_ASSETS: "ams:assets",
  CRMS_CAR: "crms:car",
  AMS_CONSUMABLES: "ams:consumables",
} as const;
