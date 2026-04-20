/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createContext } from "react";

import Root from "./root";

const RootContext = createContext<Root>({} as Root);

export default RootContext;
