import { FC } from "react";

const IMAGE_SUFFIXES = new Set(["png", "jpg", "jpeg", "gif", "webp", "bmp", "svg"]);

function isImageSuffix(suffix: string): boolean {
  return IMAGE_SUFFIXES.has(suffix?.toLowerCase().replace(/^\./, ""));
}

interface AttachmentFilenameCellProps {
  filename: string;
  filepath?: string;
  suffix: string;
}

const AttachmentFilenameCell: FC<AttachmentFilenameCellProps> = ({
  filename,
  filepath,
  suffix,
}) => {
  if (!filepath) {
    return <span className="break-all">{filename}</span>;
  }

  const isImage = isImageSuffix(suffix);

  return (
    <div className="flex flex-col gap-1">
      {isImage && (
        <a href={filepath} target="_blank" rel="noopener noreferrer">
          <img
            src={filepath}
            alt={filename}
            className="max-h-16 max-w-[120px] object-contain"
          />
        </a>
      )}
      {
        !isImage && (
          <a href={filepath} target="_blank" rel="noopener noreferrer" className="break-all">
            {filename}
          </a>
        )
      }
    </div>
  );
};

export default AttachmentFilenameCell;
