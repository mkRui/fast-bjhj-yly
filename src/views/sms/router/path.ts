enum SmsPath {
  LINE = "/sms",
  AMS_CATEGORY = "/ams-category",
  AMS_ASSETS = "/ams-assets",
  AMS_CONSUMABLES = "/ams-consumables",
  AMS_ASSETS_CHECK = "/ams-assets-check",
  AMS_CONSUMABLES_CHECK = "/ams-consumables-check",
  CAR = "/car",
  CAR_APPLY = "/car-apply",
}

enum SmsFullPath {
  AMS_CATEGORY = "/sms/ams-category",
  AMS_ASSETS = "/sms/ams-assets",
  AMS_CONSUMABLES = "/sms/ams-consumables",
  AMS_ASSETS_CHECK = "/sms/ams-assets-check",
  AMS_CONSUMABLES_CHECK = "/sms/ams-consumables-check",
  CAR = "/sms/car",
  CAR_APPLY = "/sms/car-apply",
}

export { SmsPath, SmsFullPath };
