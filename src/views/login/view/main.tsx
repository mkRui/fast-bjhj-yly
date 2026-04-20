import { FC, useEffect } from "react";

import LoginForm from "../components/login-form";

import styles from "../styles/main.module.less";

const Login: FC = () => {
  /**
   * @emits
   * @description 组件方法
   */

  /**
   * @store
   * @description 数据管理中心
   */

  /**
   * @state
   * @description 变量声明
   */

  /**
   * @route-state
   * @description 获取页面参数
   */

  /**
   * @route
   * @description 跳转页面
   */

  /**
   * @methods
   * @description 方法
   */

  /**
   * @watch
   * @description 监听方法
   */

  useEffect(() => {}, []);

  /**
   * @lifeCycle
   * @description 生命周期
   */

  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <div className={styles["forms-container"]}>
        <div className={styles["signin-signup"]}>
          <LoginForm />
        </div>
      </div>
      <div className={styles["panels-container"]}>
        <div className={`${styles["panel"]} ${styles["left-panel"]}`}>
          <div className={styles["content"]}>
            <h3>New here ?</h3>
            <p>Enter your details and start your journey with us</p>
          </div>
          <img
            src={new URL("../static/log.svg", import.meta.url).href}
            alt=""
          />
        </div>
        <div className={`${styles["panel"]} ${styles["right-panel"]}`}>
          <div className={styles["content"]}>
            <h3>New here ?</h3>
            <p>Enter your details and start your journey with us</p>
          </div>
          <img
            src={new URL("../static/register.svg", import.meta.url).href}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
