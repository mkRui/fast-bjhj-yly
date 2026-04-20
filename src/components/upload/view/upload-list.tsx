/*
 * @Author: mkRui
 * @Date: 2021-10-04 15:28:24
 * @LastEditTime: 2026-01-20 11:02:36
 */
import { CloseOutlined } from "@ant-design/icons";
import { UploadProps } from "antd/lib/upload";
import ClassNames from "classnames";
import { FC, useEffect, useState } from "react";

import Styles from "../styles/upload-list.module.less";
import Upload from "./upload";

interface UploadListProps {
  action: string;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  dataType: "array" | "string";
}

const UploadList: FC<UploadListProps & Omit<UploadProps, "onChange">> = (
  props
) => {
  const { action, value, style, onChange, dataType, ...resetProps } = props;

  const [paths, setPaths] = useState<string[]>([]);

  const [dists, setDists] = useState<string[]>([]);

  const uploadListContainer = ClassNames(`${Styles["upload-list__container"]}`);

  const handleChange = (url: string, dist: string) => {
    const p: string[] = ([] as string[]).concat(paths);
    const d: string[] = ([] as string[]).concat(dists);
    p.push(url);
    d.push(dist);
    setPaths(p);
    setDists(d);
    onChange?.(dataType === "string" ? d.join(",") : d);
  };

  const handleDel = (url: string) => {
    const index = paths.findIndex((item) => item === url);
    const p: string[] = ([] as string[]).concat(paths);
    const d: string[] = ([] as string[]).concat(dists);
    p.splice(index, 1);
    d.splice(index, 1);
    setPaths(p);
    setDists(d);
    onChange?.(dataType === "string" ? d.join(",") : d);
  };

  useEffect(() => {
    if (!value) return;
    if (Array.isArray(value) && value.length) {
      setDists(value.map(String));
      return;
    }
    if (typeof value === "string") {
      const arr = value.split(",").filter(Boolean);
      setDists(arr);
    }
  }, [value]);

  return (
    <div style={style} className={uploadListContainer}>
      <ul className={Styles["images__list"]}>
        {paths.map((item) => (
          <li key={item} className={Styles["images__item"]}>
            <div className={Styles["images__container__img"]}>
              <img
                className={Styles["images__img"]}
                width="60"
                height="60"
                src={item}
                alt=""
              />
              <div className={Styles["images__container--position"]}>
                <div onClick={() => handleDel(item)}>
                  <CloseOutlined style={{ fontSize: "12px" }} />
                </div>
              </div>
            </div>
          </li>
        ))}
        <li className={Styles["images__item"]}>
          <div className={Styles["upload"]}>
            <Upload
              block
              {...resetProps}
              action={action}
              isList
              onChangeList={handleChange}
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default UploadList;
