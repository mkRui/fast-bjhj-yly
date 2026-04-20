import { FC, useContext } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Modal } from "antd";
import ClassNames from "classnames";
import { observer } from "mobx-react";
import Avatar from "@/components/avatar";
import RootContext from "@/stores/root-context";
import Screen from "@/components/screen";
import { AppContext } from "../main";
import Style from "../style/header.module.less";
import RunComponents from "@/components/run-component";
import { useNavigate } from "react-router-dom";
import { Path } from "@/router/path";

import SetPassword from "@/micro/set-password";

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
    }
  };

  const handleLogout = async (): Promise<void> => {
    modal.confirm({
      title: "确认退出登录吗?",
      onOk: async () => {
        const res = await root.logout();
        if (res) {
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
      <Menu.Item key="reset-password">修改密码</Menu.Item>
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  );

  return (
    <div className={Style.header}>
      <div className={Style["header--flex-start"]}>
        <div className={headerLogo()}>
          <div className={Style["header-block_icon"]}>
            <img
              src="http://www.liangwannian.cn/img/header-logo-img.png"
              alt="logo"
            />
          </div>
          {/* <span className={Style["header--title"]}>两万年</span> */}
        </div>
      </div>
      <div className={Style["header-block_function"]}>
        <div className={Style["header-block_trigger"]}>
          <div onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </div>
        <div className={Style["header-block_user__container"]}>
          <Screen />
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
