/**
 * 菜单资源编码，需与后端 sys/res 及角色授权 resList 保持一致。
 */
export const MenuCode = {
  // 系统设置 sys
  SYS_RES: "sys:res",
  SYS_ROLE: "sys:role",
  SYS_USER: "sys:user",

  // 用户功能 user
  USER_SUBMIT: "user:submit",
  USER_TEACHER: "user:teacher",
  USER_LEAVE: "user:leave",
  USER_ASSETS: "user:assets",
  USER_CAR: "user:car",
  USER_EXHIBITION: "user:exhibition",

  // 工资管理 sms
  SMS_SALARY: "sms:salary",
  SMS_BASE: "sms:base",

  // 教师管理 tms
  TMS_TEACHER: "tms:teacher",
  TMS_LEAVE: "tms:leave",
  TMS_WORK: "tms:work",
  TMS_EXHIBITION: "tms:exhibition",
  TMS_COMPETITION: "tms:competition",

  // 资产管理 ams
  AMS_ASSETS: "ams:assets",
  AMS_CATEGORY: "ams:category",
  AMS_CONSUMABLES: "ams:consumables",
  AMS_ASSETS_CHECK: "ams:assetsCheck",
  AMS_CONSUMABLES_CHECK: "ams:consumablesCheck",

  // 用车管理 crms
  CRMS_CAR: "crms:car",
  CRMS_APPLY: "crms:apply",
} as const;
