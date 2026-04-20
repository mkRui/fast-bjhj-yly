/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-08-27 18:45:12
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-23 15:53:18
 * @FilePath: /fast-bjhj-website-admin/src/views/sort/modules/category/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import HocUtils from "@/utils/react/hoc-utils";

import Context, { CategoryStore } from "./store";
import Main from "./views/main";

export default HocUtils<CategoryStore, object>(Context, CategoryStore)(Main);
