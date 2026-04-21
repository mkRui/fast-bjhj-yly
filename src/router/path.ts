/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-04-28 15:03:08
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-26 14:31:21
 * @FilePath: /fast-bjhj-website-admin/src/router/path.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
enum Path {
  LOGIN = "/login",
}

enum FullPath {
  SYSTEM = "/system",
  cms = "/cms",
  operation = "/operation",
  business = "/business",
  sort = "/sort",
  product = "/product",
  tms = "/tms",
}

enum BasePath {
  CMS = "/cms/*",
  OPERATION = "/operation/*",
  SYSTEM = "/system/*",
  BUSINESS = "/business/*",
  SORT = "/sort/*",
  PRODUCT = "/product/*",
  TMS = "/tms/*",
  BASE = "/*",
  WELCOME = "/welcome",
}

export { Path, BasePath, FullPath };
