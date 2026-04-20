import { FC, useEffect, useState, useRef, useContext } from "react";
import { observer } from "mobx-react";
import { Form, Modal } from "antd";
import { ModalProps } from "antd/lib/modal";

import Root from "@/stores/root-context";
import axios from "@/api";
import { Api } from "../api";
import BasicInfo from "./basic-info";
import MetaPanel from "./meta-panel";

import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";

export interface NoticeModalComponentType {
  onCancel: ModalProps["onCancel"];
  onOk: (params: any) => void;
  info?: any;
  title: string;
}

const NoticeModal: FC<NoticeModalComponentType> = (props) => {
  const { onCancel, info, onOk, title } = props;

  const [templateId, setTemplateId] = useState("");

  const [isFull, setIsFull] = useState(true);

  const [form] = Form.useForm();

  const store = useContext(Root);
  const api = useRef(new Api(axios)).current;

  const handleOk = (): void => {
    void form.validateFields().then(async (data: any) => {
      const metaData: any[] = [];
      const metaObj: Record<string, any> = {};
      const [, meta] = await api.getMetaList({ templateId });
      if (meta) {
        meta.forEach((item) => {
          metaObj[item.keyName] = item.id;
        });
      }

      Object.keys(data).forEach((key) => {
        if (key.startsWith("LANG_")) {
          const lang = key.replace("LANG_", "");
          const group = data[key] || {};
          Object.keys(group).forEach((mid) => {
            const elem = group[mid] || {};
            metaData.push({
              language: lang,
              metaId: metaObj[elem.metaId],
              value: elem.value,
            });
          });
          delete data[key];
        }
      });
      onOk({
        ...data,
        metaData,
      });
    });
  };

  useEffect(() => {
    if (info?.id) {
      const data = info;
      form.setFieldsValue({
        ...data,
      });
      if (info?.templateId) {
        setTemplateId(info.templateId);
      }
    } else {
      form.setFieldsValue({
        newWindowFlag: false,
        hiddenFlag: false,
        linkFlag: false,
        accessibleFlag: false,
      });
    }
  }, [info]);

  return (
    <Modal
      title={
        <div
          style={{
            position: "relative",
          }}
        >
          <span>{title}</span>
          <div
            style={{
              position: "absolute",
              top: "-4px",
              right: "24px",
              cursor: "pointer",
            }}
            onClick={() => setIsFull(!isFull)}
          >
            {isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          </div>
        </div>
      }
      open={true}
      width={1000}
      onCancel={onCancel}
      onOk={handleOk}
      wrapClassName={isFull ? "fullModal" : ""}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <BasicInfo form={form} setTemplateId={setTemplateId} />
        <MetaPanel
          form={form}
          info={info}
          templateId={templateId}
          store={store}
          api={api}
        />
      </div>
    </Modal>
  );
};

export default observer(NoticeModal);
