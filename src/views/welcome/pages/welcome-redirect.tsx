import { FC } from "react";
import { Navigate } from "react-router-dom";

import { UserFullPath } from "@/views/user/router/path";

const WelcomeRedirect: FC = () => (
  <Navigate to={UserFullPath.SUBMIT} replace />
);

export default WelcomeRedirect;
