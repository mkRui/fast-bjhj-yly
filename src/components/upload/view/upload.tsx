/*
 * @Author: mkRui
 * @Date: 2021-10-04 15:28:24
 * @LastEditTime: 2026-01-08 15:05:38
 */
import { Spin, Upload } from "antd";
import { RcFile, UploadChangeParam, UploadProps } from "antd/lib/upload";
import ClassNames from "classnames";
import { CSSProperties, FC, useEffect, useState } from "react";
import { baseURL } from "@/api";
import { toast } from "@/components/message";
import morStorage from "@/utils/common/local-storage";
import Styles from "../styles/upload.module.less";

interface CompressionUploadProps {
  action: string;
  value?: string;
  init?: string;
  onChange?: (value: string) => void;
  onChangeList?: (path: string, value: string) => void;
  onPath?: (value: string) => void;
  block?: boolean;
  inline?: boolean;
  style?: CSSProperties;
  size?: number;
  uploadType?: string;
  isList?: boolean;
}

const CompressionUpload: FC<
  CompressionUploadProps & Omit<UploadProps, "onChange">
> = (props) => {
  const {
    action,
    value,
    init,
    block,
    inline,
    style,
    children,
    size = 10,
    uploadType = "img",
    isList = false,
    ...resetProps
  } = props;

  const actions = baseURL + action;

  const picHeaders = {
    Authorization: `Bearer ${morStorage.getItem("token")}`,
  };

  const [loading, setLoading] = useState(false);

  const [imgUrl, setImgUrl] = useState("");

  const [uploadedUrl, setUploadedUrl] = useState("");

  const uploadContainer = ClassNames(`${Styles["upload__container"]}`, {
    [`${Styles["upload--block"]}`]: block,
    [`${Styles["upload--inline"]}`]: inline,
  });

  const isBlock = ClassNames({
    [`${Styles["upload--block"]}`]: block,
  });

  // 上传之前
  const beforeUpload = (file: RcFile) => {
    setLoading(true);
    if (file.size / 1024 / 1024 > size) {
      toast("error", "超出文件大小");
      setLoading(false);
      return false;
    } else {
      return true;
    }
  };

  // 上传成功的回调
  const handleChange = (data: UploadChangeParam) => {
    if (data.file.status === "done" && data.file.response.code === 0) {
      const uploadData = data.file.response.data;

      if (isList) {
        props.onChangeList?.(
          `${uploadData.previewDomain}/${uploadData.filePath}`,
          data.file.response.data.dist
        );
      } else {
        setUploadedUrl(`${uploadData.previewDomain}/${uploadData.filePath}`);
        props.onChange?.(data.file.response.data.dist);
      }

      toast("success", "上传成功");
      setLoading(false);
    }
    if (data.file.status === "done" && data.file.response.code !== 0) {
      toast("error", "上传错误");
      setLoading(false);
    }
    if (data.file.status === "error") {
      toast("error", "上传错误");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (init) {
      setUploadedUrl("");
      setImgUrl(init);
    }
  }, [init]);

  useEffect(() => {
    if (!init && value) {
      const str = String(value);
      if (str.startsWith("http") || str.startsWith("/")) {
        setImgUrl(str);
      } else {
        setImgUrl(`${baseURL}/common/preview?dist=${str}`);
      }
    }
  }, [value, init]);

  return (
    <div style={style} className={uploadContainer}>
      <Spin
        spinning={loading}
        wrapperClassName={Styles["spin__container"]}
        style={{ height: "100%" }}
      >
        <Upload
          {...resetProps}
          action={actions}
          showUploadList={false}
          headers={picHeaders}
          onChange={handleChange}
          beforeUpload={beforeUpload}
          className={isBlock}
        >
          {children || (
            <>
              <div className={Styles["upload"]}>
                {!!value || !!uploadedUrl || !!imgUrl ? (
                  uploadType === "img" ? (
                    <img src={uploadedUrl || imgUrl} alt="" />
                  ) : (
                    <video src={uploadedUrl || imgUrl} controls className="h-[100%]" />
                  )
                ) : (
                  "上传"
                )}
              </div>
            </>
          )}
        </Upload>
      </Spin>
    </div>
  );
};

export default CompressionUpload;
