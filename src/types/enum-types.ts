// 性别
export enum GenderEnum {
  // 男
  MALE = 1,
  // 女
  FEMALE = 2,
}

// 读取状态
export enum NoticeStateEnum {
  // 全部
  ALL = 0,
  // 已读
  READ = 1,
  // 未读
  UNREAD = 2,
}

// 读取状态
export enum NoticePushStateEnum {
  // 全部
  ALL = 0,
  // 已发布
  READY = 1,
  // 未发布
  UNREAD = 2,
}

export enum NoticeTypeEnum {
  NOTICE = "notice",
  MESSAGE = "message",
}

export enum ResTypeEnum {
  MENU = "MENU",
  SUBMENU = "SUBMENU",
  PERMISSION = "PERMISSION",
}

export enum LiveStateEnum {
  NOT_STARTED = "NOT_STARTED",
  LIVING = "LIVING",
  FINISHED = "FINISHED",
}

export enum LiveImageEnum {
  SWIPER = "SWIPER",
  INTRO = "INTRO",
}

export enum DeviceTypeEnum {
  SERVICE = 1,
  // 智能门锁
  LOCK = 2,
  // 智能水表
  WATER_METER = 4,
  // 智能电表
  WATT_HOUR_METER = 3,
}

export enum CategoryTypeEnum {
  PLATFORM = 1,
  COMPANY = 2,
  AFFILIATED_ENTERPRISES = 3,
}

export enum CheckOrNoEnum {
  TRUE = 1,
  FALSE = 2,
}

export enum TrueOrFalseEnum {
  TRUE = 1,
  FALSE = 0,
}

export enum ActivationStateEnum {
  NO_ACTIVATION = 0,
  NORMAL = 1,
  DISABLE = 2,
}

export enum AuthTypeEnum {
  PASSWORD = 1,
}
