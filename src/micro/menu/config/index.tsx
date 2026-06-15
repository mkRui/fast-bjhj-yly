import {
  AccountBookOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  AuditOutlined,
  CarOutlined,
  ClusterOutlined,
  ContainerOutlined,
  EditOutlined,
  FolderOpenOutlined,
  FundOutlined,
  IdcardOutlined,
  SafetyOutlined,
  SettingOutlined,
  ShopOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { MenuCode } from "@/constants/menu-code";
import { MenuType } from "../types";
import { SystemPath, SystemFullPath } from "@/views/system/router/path";
import { TmsFullPath, TmsPath } from "@/views/tms/router/path";
import { SmsFullPath, SmsPath } from "@/views/sms/router/path";
import { SalaryFullPath } from "@/views/salary/router/path";
import { UserFullPath } from "@/views/user/router/path";

const SysMenuList: MenuType[] = [
  {
    name: "资源管理",
    href: SystemFullPath.SYSTEM_RESOURCES,
    code: MenuCode.SYS_RES,
    id: "6597066531825666",
    parentId: "6596728778221568",
    icon: <ClusterOutlined />,
  },
  {
    name: "角色管理",
    href: SystemFullPath.SYSTEM_ROLE,
    code: MenuCode.SYS_ROLE,
    id: "6597066531825665",
    parentId: "6596728778221568",
    icon: <SafetyOutlined />,
  },
  {
    name: "用户管理",
    href: SystemFullPath.SYSTEM_ACCOUNT,
    code: MenuCode.SYS_USER,
    id: "6597066531825664",
    parentId: "6596728778221568",
    icon: <UserOutlined />,
  },
];

const UserMenuList: MenuType[] = [
  {
    name: "课时上报",
    href: UserFullPath.SUBMIT,
    code: MenuCode.USER_SUBMIT,
    id: "9200000000000001",
    parentId: "9200000000000000",
    icon: <EditOutlined />,
  },
  {
    name: "教师信息",
    href: "/personal-info",
    code: MenuCode.USER_TEACHER,
    id: "9200000000000002",
    parentId: "9200000000000000",
    icon: <IdcardOutlined />,
  },
  {
    name: "请假申请",
    href: UserFullPath.LEAVE,
    code: MenuCode.USER_LEAVE,
    id: "9200000000000003",
    parentId: "9200000000000000",
    icon: <CalendarOutlined />,
  },
  {
    name: "资产管理",
    href: UserFullPath.ASSETS,
    code: MenuCode.USER_ASSETS,
    id: "9200000000000004",
    parentId: "9200000000000000",
    icon: <ContainerOutlined />,
  },
  {
    name: "用车申请",
    href: UserFullPath.CAR,
    code: MenuCode.USER_CAR,
    id: "9200000000000005",
    parentId: "9200000000000000",
    icon: <CarOutlined />,
  },
];

const SmsMenuList: MenuType[] = [
  {
    name: "工资测算",
    href: SalaryFullPath.CALC,
    code: MenuCode.SMS_SALARY,
    id: "9100000000000002",
    parentId: "9100000000000000",
    icon: <FundOutlined />,
  },
];

const TmsMenuList: MenuType[] = [
  {
    name: "教师信息管理",
    href: TmsFullPath.TEACHER,
    code: MenuCode.TMS_TEACHER,
    id: "9000000000000001",
    parentId: "9000000000000000",
    icon: <IdcardOutlined />,
  },
  {
    name: "请假管理",
    href: TmsFullPath.LEAVE,
    code: MenuCode.TMS_LEAVE,
    id: "9000000000000003",
    parentId: "9000000000000000",
    icon: <CalendarOutlined />,
  },
  {
    name: "课时管理",
    href: TmsFullPath.WORK,
    code: MenuCode.TMS_WORK,
    id: "9000000000000002",
    parentId: "9000000000000000",
    icon: <SolutionOutlined />,
  },
  {
    name: "展会管理",
    href: TmsFullPath.EXHIBITION,
    code: MenuCode.TMS_EXHIBITION,
    id: "9000000000000004",
    parentId: "9000000000000000",
    icon: <ShopOutlined />,
  },
];

const AmsMenuList: MenuType[] = [
  {
    name: "固定资产管理",
    href: SmsFullPath.AMS_ASSETS,
    code: MenuCode.AMS_ASSETS,
    id: "9500000000000001",
    parentId: "9500000000000000",
    icon: <ContainerOutlined />,
  },
  {
    name: "资产分类管理",
    href: SmsFullPath.AMS_CATEGORY,
    code: MenuCode.AMS_CATEGORY,
    id: "9500000000000002",
    parentId: "9500000000000000",
    icon: <FolderOpenOutlined />,
  },
  {
    name: "易耗品管理",
    href: SmsFullPath.AMS_CONSUMABLES,
    code: MenuCode.AMS_CONSUMABLES,
    id: "9500000000000003",
    parentId: "9500000000000000",
    icon: <AppstoreOutlined />,
  },
];

const CrmsMenuList: MenuType[] = [
  {
    name: "车型管理",
    href: SmsFullPath.CAR,
    code: MenuCode.CRMS_CAR,
    id: "9600000000000001",
    parentId: "9600000000000000",
    icon: <CarOutlined />,
  },
  {
    name: "用车审核",
    href: SmsFullPath.CAR_APPLY,
    code: MenuCode.CRMS_APPLY,
    id: "9600000000000002",
    parentId: "9600000000000000",
    icon: <AuditOutlined />,
  },
];

const MenuList: MenuType[] = [
  {
    name: "系统设置",
    href: SystemPath.LINE,
    code: "",
    children: SysMenuList,
    id: "6596728778221568",
    parentId: "0",
    icon: <SettingOutlined />,
  },
  {
    name: "用户功能",
    href: UserFullPath.SUBMIT,
    code: "",
    children: UserMenuList,
    id: "9200000000000000",
    parentId: "0",
    icon: <UserOutlined />,
  },
  {
    name: "工资管理",
    href: SmsPath.LINE,
    code: "",
    children: SmsMenuList,
    id: "9100000000000000",
    parentId: "0",
    icon: <AccountBookOutlined />,
  },
  {
    name: "教师管理",
    href: TmsPath.LINE,
    code: "",
    children: TmsMenuList,
    id: "9000000000000000",
    parentId: "0",
    icon: <TeamOutlined />,
  },
  {
    name: "资产管理",
    href: SmsPath.LINE,
    code: "",
    children: AmsMenuList,
    id: "9500000000000000",
    parentId: "0",
    icon: <ContainerOutlined />,
  },
  {
    name: "用车管理",
    href: SmsPath.LINE,
    code: "",
    children: CrmsMenuList,
    id: "9600000000000000",
    parentId: "0",
    icon: <CarOutlined />,
  },
];

export { MenuList };
