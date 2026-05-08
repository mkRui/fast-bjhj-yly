import { MenuType } from "../types";
import { SystemPath, SystemFullPath } from "@/views/system/router/path";
import { CmsFullPath, CmsPath } from "@/views/cms/router/path";
import {
  OperationFullPath,
  OperationPath,
} from "@/views/operation/router/path";
import { BusinessFullPath, BusinessPath } from "@/views/business/router/path";
import { SortFullPath, SortPath } from "@/views/sort/router/path";
import { ProductFullPath, ProductPath } from "@/views/product/router/path";
import { TmsFullPath, TmsPath } from "@/views/tms/router/path";
import { SmsFullPath, SmsPath } from "@/views/sms/router/path";

const SysMenuList: MenuType[] = [
  {
    name: "用户管理",
    href: SystemFullPath.SYSTEM_ACCOUNT,
    code: "sys:user:manage",
    id: "6597066531825664",
    parentId: "6596728778221568",
  },
  {
    name: "角色管理",
    href: SystemFullPath.SYSTEM_ROLE,
    code: "sys:role:manage",
    id: "6597066531825665",
    parentId: "6596728778221568",
  },
  {
    name: "资源管理",
    href: SystemFullPath.SYSTEM_RESOURCES,
    code: "sys:res:manage",
    id: "6597066531825666",
    parentId: "6596728778221568",
  },
];

const CmsMenuList: MenuType[] = [
  {
    name: "模版管理",
    href: CmsFullPath.CMS_TEMPLATE,
    code: "sys:user:manage",
    id: "6830006150981632",
    parentId: "6829987219466240",
  },
];

const CmsOperationMenuList: MenuType[] = [
  {
    name: "频道管理",
    href: OperationFullPath.OPERATION_CHANNEL,
    code: "sys:user:manage",
    id: "6830011014604800",
    parentId: "6829989729757184",
  },
  {
    name: "编辑管理",
    href: OperationFullPath.OPERATION_EDITOR,
    code: "sys:user:manage",
    id: "6830011014604801",
    parentId: "6829989729757184",
  },
  {
    name: "页面管理",
    href: OperationFullPath.OPERATION_PAGE,
    code: "sys:user:manage",
    id: "6830011014604802",
    parentId: "6829989729757184",
  },
];

const BusinessMenuList: MenuType[] = [
  {
    name: "意向收集",
    href: BusinessFullPath.BUSINESS_TEMPLATE,
    code: "sys",
    id: "6830011014604900",
    parentId: "6829989729757200",
  },
];

const SortMenuList: MenuType[] = [
  {
    name: "产品分类",
    href: SortFullPath.SORT_CATEGORY,
    code: "sys",
    id: "7962076323407872",
    parentId: "7962062274848768",
  },
  {
    name: "产品分类参数",
    href: SortFullPath.SORT_CATEGORY_PARAM,
    code: "sys",
    id: "7962076323407873",
    parentId: "7962062274848768",
  },
  {
    name: "产品分类参数项",
    href: SortFullPath.SORT_CATEGORY_PARAM_ITEM,
    code: "sys",
    id: "7962076323407874",
    parentId: "7962062274848768",
  },
];

const ProductMenuList: MenuType[] = [
  {
    name: "产品管理",
    href: ProductFullPath.PRODUCT_MAIN,
    code: "sys",
    id: "7962076323407875",
    parentId: "7962062274848769",
  },
];

const TmsMenuList: MenuType[] = [
  {
    name: "教师管理",
    href: TmsFullPath.TEACHER,
    code: "sys",
    id: "9000000000000001",
    parentId: "9000000000000000",
  },
  {
    name: "课时管理",
    href: TmsFullPath.WORK,
    code: "sys",
    id: "9000000000000002",
    parentId: "9000000000000000",
  },
  {
    name: "请假管理",
    href: TmsFullPath.LEAVE,
    code: "sys",
    id: "9000000000000003",
    parentId: "9000000000000000",
  },
];

const SmsMenuList: MenuType[] = [
  {
    name: "周期管理",
    href: SmsFullPath.PERIOD,
    code: "sys",
    id: "9100000000000001",
    parentId: "9100000000000000",
  },
  {
    name: "资产分类",
    href: SmsFullPath.AMS_CATEGORY,
    code: "sys",
    id: "9100000000000002",
    parentId: "9100000000000000",
  },
  {
    name: "固定资产",
    href: SmsFullPath.AMS_ASSETS,
    code: "sys",
    id: "9100000000000003",
    parentId: "9100000000000000",
  },
  {
    name: "易耗品管理",
    href: SmsFullPath.AMS_CONSUMABLES,
    code: "sys",
    id: "9100000000000004",
    parentId: "9100000000000000",
  },
];

const MenuList: MenuType[] = [
  {
    name: "系统设置",
    href: SystemPath.LINE,
    code: "sys",
    children: SysMenuList,
    id: "6596728778221568",
    parentId: "0",
  },
  {
    name: "CMS管理",
    href: CmsPath.LINE,
    code: "sys",
    children: CmsMenuList,
    id: "6829987219466240",
    parentId: "0",
  },
  {
    name: "CMS运营",
    href: OperationPath.LINE,
    code: "sys",
    children: CmsOperationMenuList,
    id: "6829989729757184",
    parentId: "0",
  },
  {
    name: "业务管理",
    href: BusinessPath.LINE,
    code: "sys",
    children: BusinessMenuList,
    id: "6829989729757200",
    parentId: "0",
  },
  {
    name: "分类管理",
    href: SortPath.LINE,
    code: "sys",
    children: SortMenuList,
    id: "7962062274848768",
    parentId: "0",
  },
  {
    name: "产品管理",
    href: ProductPath.LINE,
    code: "sys",
    children: ProductMenuList,
    id: "7962062274848769",
    parentId: "0",
  },
  {
    name: "教师管理",
    href: TmsPath.LINE,
    code: "sys",
    children: TmsMenuList,
    id: "9000000000000000",
    parentId: "0",
  },
  {
    name: "后台管理",
    href: SmsPath.LINE,
    code: "sys",
    children: SmsMenuList,
    id: "9100000000000000",
    parentId: "0",
  },
  {
    name: "教师信息上报",
    href: "/personal-info",
    code: "sys",
    id: "9200000000000000",
    parentId: "0",
  },
];

export { MenuList };
