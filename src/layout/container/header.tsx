import { FC, useContext } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Modal } from "antd";
import ClassNames from "classnames";
import { observer } from "mobx-react";
import Avatar from "@/components/avatar";
import RootContext from "@/stores/root-context";
import Screen from "@/components/screen";
import ThemeSwitch from "@/components/theme-switch";
import { AppContext } from "../main";
import Style from "../style/header.module.less";
import RunComponents from "@/components/run-component";
import { useNavigate } from "react-router-dom";
import { Path } from "@/router/path";

import SetPassword from "@/micro/set-password";
import { toastActionResult } from "@/utils/common/mutation-success";
import headerLogoImg from "@/assets/header-logo.png";
import NotificationBell from "@/views/notification/components/notification-bell";

const LayoutHeader: FC = () => {
  const { collapsed, setCollapsed } = useContext(AppContext);

  const navigate = useNavigate();

  const root = useContext(RootContext);

  const [modal, contextHolder] = Modal.useModal();

  const init = root.init;

  const click = async ({ key }: { key: string }): Promise<void> => {
    if (key === "logout") {
      void handleLogout();
    } else if (key === "reset-password") {
      changePassword();
    } else if (key === "personal-info") {
      navigate("/personal-info");
    }
  };

  const handleLogout = async (): Promise<void> => {
    modal.confirm({
      title: "确认退出登录吗?",
      onOk: async () => {
        const res = await root.logout();
        if (toastActionResult(res, "退出成功", "退出失败")) {
          navigate(Path.LOGIN);
        }
      },
    });
  };

  const changePassword = (): void => {
    const modal = new RunComponents({
      state: {},
      render: () => (
        <SetPassword
          onCancel={() => {
            modal.unmount();
          }}
          onOk={() => {
            modal.unmount();
          }}
        />
      ),
    });
  };

  const headerLogo = (): string => {
    return ClassNames(`${Style.header__logo}`, {
      [`${Style["header__logo--collapsed"]}`]: collapsed,
    });
  };

  const MenuList = (
    <Menu onClick={click}>
      <Menu.Item key="personal-info">教师信息</Menu.Item>
      <Menu.Item key="reset-password">修改密码</Menu.Item>
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  );

  return (
    <div className={Style.header}>
      <div className={Style["header--flex-start"]}>
        <div className={headerLogo()}>
          <div className={Style["header-block_icon"]}>
            <img src={headerLogoImg} alt="101中学怀柔国际部" />
          </div>
        </div>
      </div>
      <div className={Style["header-block_function"]}>
        <div className={Style["header-block_trigger"]}>
          <div onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </div>
        <div className={Style["header-block_user__container"]}>
          <NotificationBell />
          <Screen />
          <ThemeSwitch />
          <Dropdown trigger={["click"]} overlay={MenuList}>
            <div className={Style["header-block_user"]}>
              <Avatar />
              <span className={Style["header--title"]}>{init.account}</span>
            </div>
          </Dropdown>
        </div>
      </div>
      {contextHolder}
    </div>
  );
};

export default observer(LayoutHeader);
