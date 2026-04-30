import HocUtils from "@/utils/react/hoc-utils";

import Context, { AssetsCategorySelectStore } from "./store";
import Main, { AssetsCategorySelectProps } from "./view/main";

export default HocUtils<AssetsCategorySelectStore, AssetsCategorySelectProps>(Context, AssetsCategorySelectStore)(Main);
