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
