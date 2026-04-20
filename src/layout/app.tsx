/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-04-28 15:03:08
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-29 16:24:50
 * @FilePath: /fast-bjhj-website-admin/src/layout/app.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { rootRoutes } from "@/router/routes";
import RouteComponent from "@/router/route-component";
export function App() {
  document.body.setAttribute("mor-theme", "light");

  return (
    <div className="min-h-screen bg-gray-50">
      <RouteComponent routes={rootRoutes} />
    </div>
  );
}
