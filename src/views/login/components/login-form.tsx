/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-04-28 15:03:08
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-26 14:26:13
 * @FilePath: /fast-bjhj-website-admin/src/views/login/components/login-form.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Form, Input } from "antd";
import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";

import RootContext from "@/stores/root-context";
import Button from "@/components/button";
import morStorage from "@/utils/common/local-storage";
import { toast } from "@/components/message";

import context from "../store";
import { API } from "../types/api";
import styles from "../styles/login-form.module.less";
import ImgVCode from "./img-vcode";
import { BasePath } from "@/router/path";

const Item = Form.Item;

interface LoginFormTypes {
  children?: any;
}

const LoginForm: FC<LoginFormTypes> = () => {
  const [form] = Form.useForm();

  const loginStore = useContext(context);

  const store = useContext(RootContext);

  const navigate = useNavigate();

  const handleSubmit = async (form: API.Login.Params): Promise<void> => {
    loginStore.$setParams(form);
    const res = await loginStore.login();
    if (res) {
      morStorage.setItem("token", res);
      await store.getInit();
      navigate(BasePath.WELCOME);
      toast("success", "登录成功");
    }
  };

  return (
    <div className={styles.login}>
      <h2 className={styles.title}>Login</h2>
      <Form form={form} size="large" layout="vertical" onFinish={handleSubmit}>
        <Item
          rules={[
            {
              required: true,
              message: "请输入用户名",
            },
          ]}
          name="account"
          validateTrigger="onBlur"
        >
          <Input placeholder="用户名" />
        </Item>
        <Item
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
          ]}
          name="password"
          validateTrigger="onBlur"
        >
          <Input.Password placeholder="密码" type="password" />
        </Item>
        <Item
          rules={[
            {
              required: true,
              message: "请输入验证码",
            },
          ]}
          name="captchaCode"
          noStyle
          validateTrigger="onBlur"
        >
          <Input placeholder="验证码" suffix={<ImgVCode />} />
        </Item>
        <Item style={{ marginTop: "20px", textAlign: "center" }}>
          <Button htmlType="submit" type="primary" shape="round" size="large">
            登录
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default LoginForm;
