/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-06-12 18:03:04
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-31 17:12:16
 * @FilePath: /fast-bjhj-website-admin/src/micro/select-meta/view/main.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { observer } from "mobx-react";
import { FC, useContext, JSX, useEffect } from "react";

import BranchStoreContext from "../store";

export interface SelectMetaProp extends JSX.IntrinsicAttributes {
  onInit?: (list: any) => void;
  templateId: string;
}

const SelectTemplate: FC<SelectMetaProp> = (props) => {
  const { templateId, onInit } = props;

  const store = useContext(BranchStoreContext);

  // methods
  const handleInit = async (): Promise<void> => {
    await store.getData({ templateId });
    onInit?.(store.data);
  };

  useEffect(() => {
    if (templateId) {
      handleInit();
    }
  }, [templateId]);

  return <div></div>;
};

export default observer(SelectTemplate);
