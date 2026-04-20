import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";

import context from "../store";

const ImgVCode: FC = () => {
  const loginStore = useContext(context);
  const refresh = (): void => {
    void loginStore.getCaptcha();
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <img
      style={{
        width: "auto",
        height: "21px",
        marginTop: "1px",
      }}
      src={loginStore.captchaImage}
      onClick={refresh}
      alt=""
    />
  );
};

export default observer(ImgVCode);
