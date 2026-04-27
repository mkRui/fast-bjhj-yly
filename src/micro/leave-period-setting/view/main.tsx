import { observer } from "mobx-react";
import { FC, JSX, useContext, useEffect } from "react";

import StoreContext from "../store";
import { API } from "../types";

export interface LeavePeriodSettingProps extends JSX.IntrinsicAttributes {
  periodId?: number;
  onInit?: (data: API.PeriodSetting.Data) => void;
}

const LeavePeriodSetting: FC<LeavePeriodSettingProps> = (props) => {
  const store = useContext(StoreContext);

  const load = async (periodId: number): Promise<void> => {
    await store.getData(periodId);
    if (store.data) props.onInit?.(store.data);
  };

  useEffect(() => {
    const periodId = Number(props.periodId || 0);
    if (!periodId) return;
    void load(periodId);
  }, [props.periodId]);

  return null;
};

export default observer(LeavePeriodSetting);

