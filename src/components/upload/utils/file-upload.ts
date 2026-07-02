import { RcFile } from "antd/lib/upload";

import { baseURL } from "@/api";

const IMAGE_SUFFIXES = new Set(["png", "jpg", "jpeg", "gif", "webp"]);
const VIDEO_SUFFIXES = new Set(["mp4"]);
const DOC_SUFFIXES = new Set(["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"]);
const ARCHIVE_SUFFIXES = new Set(["rar", "zip", "7z"]);

const FILE_RULES: { suffixes: Set<string>; maxMb: number; label: string }[] = [
  { suffixes: IMAGE_SUFFIXES, maxMb: 20, label: "图片" },
  { suffixes: VIDEO_SUFFIXES, maxMb: 200, label: "视频" },
  { suffixes: DOC_SUFFIXES, maxMb: 5, label: "文档" },
  { suffixes: ARCHIVE_SUFFIXES, maxMb: 50, label: "压缩包" },
];

export const UPLOAD_FILE_HINT =
  "支持图片(png/jpg/jpeg/gif/webp≤20MB)、视频(mp4≤200MB)、文档(pdf/doc/docx/xls/xlsx/ppt/pptx≤5MB)、压缩包(rar/zip/7z≤50MB)";

export const UPLOAD_FILE_TAGS = [
  "图片 ≤20MB",
  "视频 ≤200MB",
  "文档 ≤5MB",
  "压缩包 ≤50MB",
];

export const UPLOAD_FILE_ACCEPT = [
  ...IMAGE_SUFFIXES,
  ...VIDEO_SUFFIXES,
  ...DOC_SUFFIXES,
  ...ARCHIVE_SUFFIXES,
]
  .map((suffix) => `.${suffix}`)
  .join(",");

export function getFileSuffix(name: string): string {
  const base = String(name || "")
    .split(/[/\\]/)
    .pop()
    ?.split("?")[0] || "";
  const index = base.lastIndexOf(".");
  if (index < 0) return "";
  return base.slice(index + 1).toLowerCase();
}

export function normalizeFileSuffix(suffix?: string, filename?: string): string {
  const rawSuffix = String(suffix || "")
    .trim()
    .replace(/^\./, "")
    .toLowerCase();
  if (rawSuffix && !rawSuffix.includes("/") && !rawSuffix.includes("\\")) {
    return rawSuffix;
  }
  return getFileSuffix(filename || suffix || "");
}

export function buildAttachmentPreviewUrl(filepath?: string, dist?: string): string {
  const source = String(filepath || dist || "").trim();
  if (!source) return "";
  if (source.startsWith("http") || source.startsWith("/")) return source;
  return `${baseURL}/common/preview?dist=${encodeURIComponent(source)}`;
}

export function isImageSuffix(suffix: string): boolean {
  return IMAGE_SUFFIXES.has(suffix.toLowerCase());
}

export function isVideoSuffix(suffix: string): boolean {
  return VIDEO_SUFFIXES.has(suffix.toLowerCase());
}

export function isArchiveSuffix(suffix: string): boolean {
  return ARCHIVE_SUFFIXES.has(suffix.toLowerCase());
}

export function getUploadFileRule(file: RcFile | File) {
  const suffix = getFileSuffix(file.name);
  return FILE_RULES.find((rule) => rule.suffixes.has(suffix));
}

export function validateUploadFile(file: RcFile): string | null {
  const rule = getUploadFileRule(file);
  if (!rule) {
    return "不支持该文件类型";
  }
  if (file.size / 1024 / 1024 > rule.maxMb) {
    return `${rule.label}大小不能超过 ${rule.maxMb}MB`;
  }
  return null;
}

export function filenameFromDist(dist: string): string {
  const parts = String(dist || "")
    .split(/[/\\]/)
    .filter(Boolean);
  return parts[parts.length - 1] || dist || "附件";
}

export function formatDisplayFilename(filename: string, maxLength = 16): string {
  const name = String(filename || "附件");
  if (name.length <= maxLength) return name;

  const suffix = getFileSuffix(name);
  if (!suffix) {
    return `${name.slice(0, maxLength - 1)}…`;
  }

  const baseName = name.slice(0, -(suffix.length + 1));
  const extPart = `.${suffix}`;
  const remain = maxLength - extPart.length - 1;
  if (remain <= 2) {
    return `${name.slice(0, maxLength - 1)}…`;
  }

  return `${baseName.slice(0, remain)}…${extPart}`;
}

export type UploadFileCategory = "image" | "video" | "document" | "archive" | "other";

export function getUploadFileCategory(suffix: string): UploadFileCategory {
  const normalized = suffix.toLowerCase();
  if (isImageSuffix(normalized)) return "image";
  if (isVideoSuffix(normalized)) return "video";
  if (isArchiveSuffix(normalized)) return "archive";
  if (DOC_SUFFIXES.has(normalized)) return "document";
  return "other";
}
