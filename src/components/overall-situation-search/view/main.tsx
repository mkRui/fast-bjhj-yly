/*
 * @Author: mkRui
 * @Date: 2021-10-16 09:43:57
 * @LastEditTime: 2021-12-07 17:43:20
 * @交易流水
 */
import { Form } from "antd";
import { observer } from "mobx-react";
import { FC, useState, useEffect } from "react";
import Button from "@/components/button";
import { ArrowsAltOutlined, ShrinkOutlined } from "@ant-design/icons";
import Styles from "../styles/main.module.less";

const Item = Form.Item;

interface OverallSituationSearchProps {
  onFinish?: (value: any) => void;
  onReset?: () => void;
  info?: any;
  children?: any;
}

enum WidthType {
  XS = 1,
  LG = 2,
  XL = 3,
  XXL = 5,
}

const OverallSituationSearch: FC<OverallSituationSearchProps> = (props) => {
  const { children, onFinish, onReset, info } = props;

  const [form] = Form.useForm();

  const [type, setType] = useState<number>(0);

  const [show, setShow] = useState<boolean>(false);

  const handleFinish = (value: any): void => {
    onFinish?.(value);
  };

  // 重置
  const handleReset = (): void => {
    onReset?.();
    form.resetFields();
  };

  const handleWatchViewSize = (): void => {
    const clientWidth = document.body.clientWidth;
    if (clientWidth >= 1600) {
      setType(WidthType.XXL);
    } else if (clientWidth >= 1200) {
      setType(WidthType.XL);
    } else if (clientWidth >= 992) {
      setType(WidthType.LG);
    } else if (clientWidth >= 768) {
      setType(WidthType.XS);
    } else if (clientWidth >= 576) {
      setType(WidthType.XS);
    } else if (clientWidth <= 576) {
      setType(WidthType.XS);
    }
  };

  useEffect(() => {
    handleWatchViewSize();
    window.addEventListener("resize", handleWatchViewSize);
    return () => {
      window.removeEventListener("resize", handleWatchViewSize);
    };
  }, []);

  useEffect(() => {
    if (info) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { page, limit, ...all } = info;
      if (!Object.keys(all).length) {
        form.resetFields();
      } else {
        form.setFieldsValue(all);
      }
    }
  }, [JSON.stringify(info)]);

  return (
    <Form form={form} layout="inline" onFinish={handleFinish}>
      <div className={Styles["form-item-container"]}>
        {children &&
          (Object.prototype.toString.call(children).includes("Array") ? (
            children
              .slice(0, show ? 5 : type)
              .map((item: any, index: number) => <div key={index}>{item}</div>)
          ) : (
            <div>{children}</div>
          ))}
        <div>
          <Item>
            <Button.Group>
              {type < children.length && (
                <Button type="primary" onClick={() => setShow(!show)}>
                  {show ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
                </Button>
              )}
              {!!onFinish && (
                <Button action="search" htmlType="submit" type="primary">
                  搜索
                </Button>
              )}
              {!!onReset && (
                <Button action="reset" onClick={handleReset}>
                  重置
                </Button>
              )}
            </Button.Group>
          </Item>
        </div>
      </div>
    </Form>
  );
};

export default observer(OverallSituationSearch);
