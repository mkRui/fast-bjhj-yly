import { FC } from "react";
import {
  FileImageOutlined,
  FileOutlined,
  FilePdfOutlined,
  FileZipOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import ClassNames from "classnames";

import {
  buildAttachmentPreviewUrl,
  getUploadFileCategory,
  isArchiveSuffix,
  isImageSuffix,
  isVideoSuffix,
  normalizeFileSuffix,
} from "@/components/upload/utils/file-upload";

const FileTypeIcon: FC<{ suffix: string }> = ({ suffix }) => {
  if (isImageSuffix(suffix)) return <FileImageOutlined />;
  if (isVideoSuffix(suffix)) return <VideoCameraOutlined />;
  if (suffix === "pdf") return <FilePdfOutlined />;
  if (isArchiveSuffix(suffix)) return <FileZipOutlined />;
  return <FileOutlined />;
};

interface AttachmentFilenameCellProps {
  filename: string;
  filepath?: string;
  suffix?: string;
  dist?: string;
}

const AttachmentFilenameCell: FC<AttachmentFilenameCellProps> = ({
  filename,
  filepath,
  suffix,
  dist,
}) => {
  const normalizedSuffix = normalizeFileSuffix(suffix, filename);
  const isImage = isImageSuffix(normalizedSuffix);
  const category = getUploadFileCategory(normalizedSuffix);
  const displayName = filename || "未命名附件";
  const previewUrl = buildAttachmentPreviewUrl(filepath, dist);

  const previewClass = ClassNames(
    "flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200",
    {
      "bg-blue-50 text-xl text-blue-500": category === "document",
      "bg-purple-50 text-xl text-purple-500": category === "video",
      "bg-orange-50 text-xl text-orange-500": category === "archive",
      "bg-gray-50 text-xl text-gray-500": category === "other",
    }
  );

  const preview =
    isImage && previewUrl ? (
      <a
        href={previewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
        title={displayName}
      >
        <img src={previewUrl} alt={displayName} className="h-full w-full object-cover" />
      </a>
    ) : (
      <div className={previewClass}>
        <FileTypeIcon suffix={normalizedSuffix} />
      </div>
    );

  const nameNode = previewUrl ? (
    <a
      href={previewUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="truncate text-blue-600 hover:text-blue-500"
      title={displayName}
    >
      {displayName}
    </a>
  ) : (
    <span className="truncate text-gray-800" title={displayName}>
      {displayName}
    </span>
  );

  return (
    <div className="flex min-w-0 items-center gap-3 py-1">
      {preview}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm leading-5">{nameNode}</div>
        {normalizedSuffix ? (
          <div className="mt-0.5 text-xs text-gray-400">{normalizedSuffix.toUpperCase()} 文件</div>
        ) : null}
      </div>
    </div>
  );
};

export default AttachmentFilenameCell;
