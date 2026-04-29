import { observer } from "mobx-react";
import { FC, JSX, useContext, useEffect } from "react";

import StoreContext from "../store";
import { API } from "../types";

export interface LeavePeriodSettingProps extends JSX.IntrinsicAttributes {
  periodId?: string;
  onInit?: (data: API.PeriodSetting.Data) => void;
}

const LeavePeriodSetting: FC<LeavePeriodSettingProps> = (props) => {
  const store = useContext(StoreContext);

  const load = async (periodId: string): Promise<void> => {
    await store.getData(periodId);
    if (store.data) props.onInit?.(store.data);
  };

  useEffect(() => {
    const periodId = props.periodId || '';
    if (!periodId) return;
    void load(periodId);
  }, [props.periodId]);

  return null;
};

export default observer(LeavePeriodSetting);
