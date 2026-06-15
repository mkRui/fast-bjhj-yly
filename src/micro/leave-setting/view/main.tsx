import { observer } from "mobx-react";
import { FC, JSX, useContext, useEffect } from "react";

import StoreContext from "../store";
import { API } from "../types";

export interface LeaveSettingProps extends JSX.IntrinsicAttributes {
  onInit?: (data: API.Setting.Data) => void;
}

const LeaveSetting: FC<LeaveSettingProps> = (props) => {
  const store = useContext(StoreContext);

  useEffect(() => {
    const load = async (): Promise<void> => {
      await store.fetchSetting();
      if (store.data) props.onInit?.(store.data);
    };
    void load();
  }, [store]);

  return null;
};

export default observer(LeaveSetting);
