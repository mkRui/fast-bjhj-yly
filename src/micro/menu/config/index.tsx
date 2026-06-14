import {
  AccountBookOutlined,
  AppstoreOutlined,
  CalendarOutlined,
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
  WalletOutlined,
} from "@ant-design/icons";

import { MenuCode } from "@/constants/menu-code";
import { MenuType } from "../types";
import { SystemPath, SystemFullPath } from "@/views/system/router/path";
import { TmsFullPath, TmsPath } from "@/views/tms/router/path";
import { SmsFullPath, SmsPath } from "@/views/sms/router/path";
import { SalaryFullPath, SalaryPath } from "@/views/salary/router/path";

const SysMenuList: MenuType[] = [
  {
    name: "用户管理",
    href: SystemFullPath.SYSTEM_ACCOUNT,
    code: MenuCode.SYS_USER,
    id: "6597066531825664",
    parentId: "6596728778221568",
    icon: <UserOutlined />,
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
    name: "资源管理",
    href: SystemFullPath.SYSTEM_RESOURCES,
    code: MenuCode.SYS_RES,
    id: "6597066531825666",
    parentId: "6596728778221568",
    icon: <ClusterOutlined />,
  },
];

const TmsMenuList: MenuType[] = [
  {
    name: "教师管理",
    href: TmsFullPath.TEACHER,
    code: MenuCode.TMS_TEACHER,
    id: "9000000000000001",
    parentId: "9000000000000000",
    icon: <IdcardOutlined />,
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
    name: "请假管理",
    href: TmsFullPath.LEAVE,
    code: MenuCode.TMS_LEAVE,
    id: "9000000000000003",
    parentId: "9000000000000000",
    icon: <CalendarOutlined />,
  },
  {
    name: "展会信息",
    href: TmsFullPath.EXHIBITION,
    code: MenuCode.TMS_EXHIBITION,
    id: "9000000000000004",
    parentId: "9000000000000000",
    icon: <ShopOutlined />,
  },
];

const SmsMenuList: MenuType[] = [
  {
    name: "周期管理",
    href: SmsFullPath.PERIOD,
    code: MenuCode.SMS_PERIOD,
    id: "9100000000000001",
    parentId: "9100000000000000",
    icon: <CalendarOutlined />,
  },
  {
    name: "资产分类",
    href: SmsFullPath.AMS_CATEGORY,
    code: MenuCode.AMS_CATEGORY,
    id: "9100000000000002",
    parentId: "9100000000000000",
    icon: <FolderOpenOutlined />,
  },
  {
    name: "固定资产",
    href: SmsFullPath.AMS_ASSETS,
    code: MenuCode.AMS_ASSETS,
    id: "9100000000000003",
    parentId: "9100000000000000",
    icon: <ContainerOutlined />,
  },
  {
    name: "车辆管理",
    href: SmsFullPath.CAR,
    code: MenuCode.CRMS_CAR,
    id: "9100000000000005",
    parentId: "9100000000000000",
    icon: <CarOutlined />,
  },
  {
    name: "易耗品管理",
    href: SmsFullPath.AMS_CONSUMABLES,
    code: MenuCode.AMS_CONSUMABLES,
    id: "9100000000000004",
    parentId: "9100000000000000",
    icon: <AppstoreOutlined />,
  },
];

const SalaryMenuList: MenuType[] = [
  {
    name: "基础工资",
    href: SalaryFullPath.BASE,
    code: MenuCode.SALARY_BASE,
    id: "9300000000000001",
    parentId: "9300000000000000",
    icon: <WalletOutlined />,
  },
  {
    name: "工资测算",
    href: SalaryFullPath.CALC,
    code: MenuCode.SALARY_CALC,
    id: "9300000000000002",
    parentId: "9300000000000000",
    icon: <FundOutlined />,
  },
];

const MenuList: MenuType[] = [
  {
    name: "个人中心",
    href: "/welcome",
    code: MenuCode.WELCOME,
    id: "9400000000000000",
    parentId: "0",
    icon: <UserOutlined />,
  },
  {
    name: "信息上报",
    href: "/personal-info",
    code: MenuCode.PERSONAL_INFO,
    id: "9200000000000000",
    parentId: "0",
    icon: <EditOutlined />,
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
    name: "工资管理",
    href: SalaryPath.LINE,
    code: "",
    children: SalaryMenuList,
    id: "9300000000000000",
    parentId: "0",
    icon: <AccountBookOutlined />,
  },
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
    name: "后台管理",
    href: SmsPath.LINE,
    code: "",
    children: SmsMenuList,
    id: "9100000000000000",
    parentId: "0",
    icon: <AppstoreOutlined />,
  },
];

export { MenuList };
