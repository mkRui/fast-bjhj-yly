/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-12-23 19:26:24
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-25 16:11:37
 * @FilePath: /fast-bjhj-website-admin/src/views/product/modules/product/components/spec-modal.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { FC } from "react";
import { observer } from "mobx-react";
import { Form, Modal } from "antd";
import { ModalProps } from "antd/lib/modal";

import { API } from "../types/api";
import SelectProductParam from "@/micro/select-product-param";

const Item = Form.Item;

export interface NoticeModalComponentType {
  onCancel: ModalProps["onCancel"];
  onOk: (params: any) => void;
  info?: API.GetProductParam.Data[];
  title: string;
  productId: string;
}

const FormModal: FC<NoticeModalComponentType> = (props) => {
  const { onCancel, info, onOk, title, productId } = props;

  const [form] = Form.useForm();

  const handleOk = (): void => {
    void form.validateFields().then(async (data: any) => {
      const payload: API.SetProductParam.Params = {
        productId: productId,
        paramList: data.paramList || [],
      };

      onOk(payload);
    });
  };

  return (
    <Modal
      title={title}
      open={true}
      onCancel={onCancel}
      onOk={handleOk}
      width={800}
    >
      <Form form={form} layout="vertical">
        <Item
          name="paramList"
          rules={[{ required: true, message: "请选择参数" }]}
        >
          <SelectProductParam productId={productId} info={info} />
        </Item>
      </Form>
    </Modal>
  );
};

export default observer(FormModal);
