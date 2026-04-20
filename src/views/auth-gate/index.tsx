import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RootContext from "@/stores/root-context";
import morStorage from "@/utils/common/local-storage";
import { BasePath, Path } from "@/router/path";

const AuthGate: FC = () => {
  const navigate = useNavigate();
  const store = useContext(RootContext);
  const [status, setStatus] = useState<"checking" | "failed">("checking");

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const token = morStorage.getItem("token");
      if (!token) {
        navigate(Path.LOGIN, { replace: true });
        return;
      }

      const ok = await store.getInit();
      if (!ok) {
        window.localStorage.removeItem(`${morStorage.name}_token`);
        if (!cancelled) {
          setStatus("failed");
        }
        navigate(Path.LOGIN, { replace: true });
        return;
      }

      void store.getEnum();
      navigate(BasePath.WELCOME, { replace: true });
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [navigate, store]);

  if (status === "failed") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">登录状态失效，正在跳转到登录页…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-500">正在初始化…</div>
    </div>
  );
};

export default AuthGate;
