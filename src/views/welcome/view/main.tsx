import { FC } from "react";
import { observer } from "mobx-react";
import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import Button from "@/components/button";

const WelcomeMain: FC = () => {
  return (
    <Content>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle>
            欢迎使用管理后台
          </HeaderTitle>
        </Content.Header>
        <Content.Main>
          <div className="p-6 bg-white rounded shadow">
            <div className="text-2xl font-semibold mb-2">你好，管理员！</div>
            <div className="text-gray-600 mb-4">
              这是登录后的默认页面。您可以通过左侧菜单进入各个模块。
            </div>
            <Button type="primary">开始使用</Button>
          </div>
        </Content.Main>
      </Content.Layout>
    </Content>
  );
};

export default observer(WelcomeMain);
