/*
 * @Author: mkRui
 * @Date: 2021-10-04 15:28:24
 * @LastEditTime: 2026-01-20 11:02:36
 */
import {
  CloseOutlined,
  CloudUploadOutlined,
  FileImageOutlined,
  FileOutlined,
  FilePdfOutlined,
  FileZipOutlined,
  PlusOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { UploadProps } from "antd/lib/upload";
import ClassNames from "classnames";
import { FC, useEffect, useState } from "react";

import Styles from "../styles/upload-list.module.less";
import {
  buildAttachmentPreviewUrl,
  filenameFromDist,
  formatDisplayFilename,
  getFileSuffix,
  getUploadFileCategory,
  isArchiveSuffix,
  isImageSuffix,
  isVideoSuffix,
  UPLOAD_FILE_ACCEPT,
  UPLOAD_FILE_TAGS,
} from "../utils/file-upload";
import Upload from "./upload";

export interface UploadListItem {
  url: string;
  dist: string;
  filename: string;
  suffix: string;
}

interface UploadListProps {
  action: string;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  dataType: "array" | "string";
  fileMode?: boolean;
}

const FileTypeIcon: FC<{ suffix: string }> = ({ suffix }) => {
  if (isImageSuffix(suffix)) return <FileImageOutlined />;
  if (isVideoSuffix(suffix)) return <VideoCameraOutlined />;
  if (suffix === "pdf") return <FilePdfOutlined />;
  if (isArchiveSuffix(suffix)) return <FileZipOutlined />;
  return <FileOutlined />;
};

const toUploadListItem = (dist: string, url?: string): UploadListItem => {
  const filename = filenameFromDist(dist);
  const suffix = getFileSuffix(filename);
  return {
    dist,
    url: url || buildAttachmentPreviewUrl(undefined, dist),
    filename,
    suffix,
  };
};

const UploadList: FC<UploadListProps & Omit<UploadProps, "onChange">> = (props) => {
  const { action, value, style, onChange, dataType, fileMode = false, ...resetProps } = props;

  const [items, setItems] = useState<UploadListItem[]>([]);

  const uploadListContainer = ClassNames(`${Styles["upload-list__container"]}`, {
    [Styles["upload-list__container--file"]]: fileMode,
  });

  const emitChange = (nextItems: UploadListItem[]): void => {
    const dists = nextItems.map((item) => item.dist);
    onChange?.(dataType === "string" ? dists.join(",") : dists);
  };

  const handleChange = (item: UploadListItem): void => {
    setItems((prev) => {
      const nextItems = [...prev, item];
      emitChange(nextItems);
      return nextItems;
    });
  };

  const handleDel = (dist: string): void => {
    setItems((prev) => {
      const nextItems = prev.filter((item) => item.dist !== dist);
      emitChange(nextItems);
      return nextItems;
    });
  };

  useEffect(() => {
    if (!value) {
      setItems([]);
      return;
    }
    const dists = Array.isArray(value)
      ? value.map(String).filter(Boolean)
      : String(value)
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
    setItems((prev) => {
      const prevMap = new Map(prev.map((item) => [item.dist, item]));
      return dists.map((dist) => prevMap.get(dist) || toUploadListItem(dist));
    });
  }, [value]);

  const renderUploadTrigger = (variant: "empty" | "button") => (
    <Upload
      inline={variant === "button"}
      block={variant === "empty"}
      {...resetProps}
      action={action}
      accept={fileMode ? UPLOAD_FILE_ACCEPT : resetProps.accept}
      fileMode={fileMode}
      isList
      onChangeList={(url, dist, meta) => {
        handleChange({
          url,
          dist,
          filename: meta?.filename || filenameFromDist(dist),
          suffix: meta?.suffix || getFileSuffix(meta?.filename || dist),
        });
      }}
    >
      {variant === "empty" ? (
        <div className={Styles["file__empty-trigger"]}>
          <CloudUploadOutlined className={Styles["file__empty-icon"]} />
          <span className={Styles["file__empty-title"]}>点击上传附件</span>
          <span className={Styles["file__empty-desc"]}>支持图片、视频、文档、压缩包</span>
        </div>
      ) : (
        <button type="button" className={Styles["file__add-btn"]}>
          <PlusOutlined />
          <span>添加附件</span>
        </button>
      )}
    </Upload>
  );

  if (fileMode) {
    return (
      <div style={style} className={uploadListContainer}>
        <div className={Styles["file__panel"]}>
          {items.length ? (
            <>
              <div className={Styles["file__header"]}>
                <span className={Styles["file__count"]}>已选 {items.length} 个附件</span>
                <div className={Styles["file__header-action"]}>{renderUploadTrigger("button")}</div>
              </div>
              <ul className={Styles["file__grid"]}>
                {items.map((item) => {
                  const isImage = isImageSuffix(item.suffix);
                  const category = getUploadFileCategory(item.suffix);

                  return (
                    <li key={item.dist} className={Styles["file__tile"]}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={ClassNames(Styles["file__tile-body"], {
                          [Styles[`file__tile-body--${category}`]]: !isImage,
                        })}
                        title={item.filename}
                      >
                        {isImage ? (
                          <>
                            <img
                              className={Styles["file__tile-img"]}
                              src={item.url}
                              alt={item.filename}
                            />
                            <span className={Styles["file__tile-caption"]}>
                              {formatDisplayFilename(item.filename, 12)}
                            </span>
                          </>
                        ) : (
                          <>
                            {item.suffix ? (
                              <span className={Styles["file__tile-badge"]}>
                                {item.suffix.toUpperCase()}
                              </span>
                            ) : null}
                            <div className={Styles["file__tile-icon"]}>
                              <FileTypeIcon suffix={item.suffix} />
                            </div>
                          </>
                        )}
                      </a>
                      <button
                        type="button"
                        className={Styles["file__tile-remove"]}
                        aria-label="删除附件"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          handleDel(item.dist);
                        }}
                      >
                        <CloseOutlined />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <div className={Styles["file__empty"]}>{renderUploadTrigger("empty")}</div>
          )}

          <div className={Styles["file__tags"]}>
            {UPLOAD_FILE_TAGS.map((tag) => (
              <span key={tag} className={Styles["file__tag"]}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const uploadTrigger = (
    <Upload
      block
      {...resetProps}
      action={action}
      accept={resetProps.accept}
      isList
      onChangeList={(url, dist, meta) => {
        handleChange({
          url,
          dist,
          filename: meta?.filename || filenameFromDist(dist),
          suffix: meta?.suffix || getFileSuffix(meta?.filename || dist),
        });
      }}
    />
  );

  return (
    <div style={style} className={uploadListContainer}>
      <ul className={Styles["images__list"]}>
        {items.map((item) => (
          <li key={item.dist} className={Styles["images__item"]}>
            <div className={Styles["images__container__img"]}>
              <img
                className={Styles["images__img"]}
                width="60"
                height="60"
                src={item.url}
                alt={item.filename}
              />
              <div className={Styles["images__container--position"]}>
                <div onClick={() => handleDel(item.dist)}>
                  <CloseOutlined style={{ fontSize: "12px" }} />
                </div>
              </div>
            </div>
          </li>
        ))}
        <li className={Styles["images__item"]}>
          <div className={Styles["upload"]}>{uploadTrigger}</div>
        </li>
      </ul>
    </div>
  );
};

export default UploadList;
