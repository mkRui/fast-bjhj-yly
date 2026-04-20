import dayjs from "dayjs";

export enum FORMAT {
  DATE = "YYYY-MM-DD",
  FULL_DATE = "YYYY-MM-DD HH:mm:ss",
}

export function format(date: string | number, format = "YYYY-MM-DD"): string {
  if (date) {
    return dayjs(date).format(format);
  }
  return dayjs().format(format);
}

export function dateFormat(date: string): string {
  return format(date);
}

export function fullDateFormat(date: string): string {
  return format(date, "YYYY-MM-DD HH:mm:ss");
}

export function timeStamp(date: string): number {
  return dayjs(date).valueOf();
}

// 两个日期相比 返回最小的日期
export function getMixDate(dates: string[]): string {
  const date = Math.min(...dates.map((item) => timeStamp(item)));
  return dayjs(date).format("YYYY-MM-DD");
}

// 两个日期相比 返回最大的日期
export function getMaxDate(dates: string[]): string {
  const date = Math.max(...dates.map((item) => timeStamp(item)));
  return dayjs(date).format("YYYY-MM-DD");
}

// 默认导出所有函数
const timeFormat = {
  FORMAT,
  format,
  dateFormat,
  fullDateFormat,
  timeStamp,
  getMixDate,
  getMaxDate,
};

export default timeFormat;
