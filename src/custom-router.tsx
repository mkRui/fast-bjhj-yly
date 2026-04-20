import { useLayoutEffect, useState } from "react";
import { BrowserRouterProps, HashRouter } from "react-router-dom";
import { BrowserHistory } from "history";

interface CustomRouterProps extends BrowserRouterProps {
  history: BrowserHistory;
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
 const CustomRouter = ({ history, children }: CustomRouterProps) => {
  const [, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);
  return <HashRouter basename={"/"}>{children}</HashRouter>;
};

export default CustomRouter