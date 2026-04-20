import { FC, useEffect, useState, useRef } from "react";
import { Form, Input, Tabs } from "antd";
import Upload from "@/components/upload";
import Button from "@/components/button";
import RichEditor from "@/components/rich-editor";

interface MetaPanelProps {
  form: any;
  info: any;
  templateId: string;
  store: any;
  api: any;
}

const MetaPanel: FC<MetaPanelProps> = ({ form, info, templateId, store, api }) => {
  const [metaList, setMetaList] = useState<any[]>([]);
  const [metaValues, setMetaValues] = useState<any[]>([]);
  const [activeLang, setActiveLang] = useState<string>("");
  const latestValuesRef = useRef<Record<string, any>>({});
  const getFieldLangKey = (code: any): string => `LANG_${String(code)}`;
  const localPreview = "http://local.aqzora.com";
  const renderInput = (type: number, langKey?: string, metaId?: string) => {
    const t = String(type);
    if (t === "1" || t === "2") {
      const init = langKey && metaId ? form.getFieldValue([langKey, metaId, "init"]) : undefined;
      let previewInit = init;
      if (t === "2" && typeof init === "string" && init) {
        const idx = init.indexOf("://") > -1 ? init.indexOf("://") + 3 : 0;
        const slash = init.indexOf("/", idx);
        const path = slash > -1 ? init.slice(slash) : init;
        console.log("path", path);
        previewInit = `${localPreview}${path.startsWith("/") ? "" : "/"}${path}`;
      }
      if (t === "2") {
        return (
          <Upload
            block
            action="/common/upload"
            uploadType="img"
            init={previewInit}
            onChange={(dist: string) => {
              if (langKey && metaId) {
                form.setFieldValue([langKey, metaId, "value"], dist);
              }
            }}
          />
        );
      }
      return (
        <Upload inline action="/common/upload" init={localPreview}>
          <Button>上传{t === "1" ? "附件" : "图片"}</Button>
        </Upload>
      );
    }
    if (t === "3" || t === "4") {
      return <Input placeholder="请输入内容" />;
    }
    if (t === "5") {
      return (
        <RichEditor height={400} />
      );
    }
    return <Input placeholder="请输入内容" />;
  };
  const fetchMetaList = async (): Promise<void> => {
    if (!templateId) return;
    const [, data] = await api.getMetaList({ templateId: templateId });
    if (Array.isArray(data)) setMetaList(data);
  };
  const fetchMetaValues = async (lang: string): Promise<void> => {
    if (!info?.id) return;
    const [, list] = await api.getRes({ channelId: info.id, language: lang });
    setMetaValues(Array.isArray(list) ? list : []);
    const values: Record<string, any> = {};
    const langKey = getFieldLangKey(lang);
    values[langKey] = {};
    const arr: any[] = Array.isArray(list) ? (list as any[]) : [];
    arr.forEach((item: any) => {
      const val = item?.type === 2 && item?.metaFile?.dist ? item?.metaFile?.dist : item?.value ?? "";
      const fileInit =
        item?.metaFile?.previewDomain && item?.metaFile?.filename
          ? `${item?.metaFile?.previewDomain}/${item?.metaFile?.filename}`
          : item?.metaFile?.filename
            ? `/${item?.metaFile?.filename}`
            : undefined;
      const keyName = item.keyName ?? String(item.metaId);
      values[langKey][keyName] = {
        metaId: keyName,
        value: val,
        init: fileInit,
      };
    });
    latestValuesRef.current = { ...latestValuesRef.current, ...values };
    form.setFieldsValue(values);
  };
  useEffect(() => {
    const first = store.getEnumData("LANGUAGE")?.[0]?.code;
    if (first && !activeLang) setActiveLang(String(first));
  }, [store]);
  useEffect(() => {
    if (templateId) fetchMetaList();
  }, [templateId]);
  useEffect(() => {
    if (activeLang) fetchMetaValues(activeLang);
  }, [activeLang]);
  useEffect(() => {
    if (metaList.length) {
      form.setFieldsValue(latestValuesRef.current);
    }
  }, [metaList]);
  return (
    <div
      style={{
        width: "70%",
        paddingLeft: "20px",
      }}
    >
      <Form form={form} layout="vertical">
        <Tabs
          activeKey={activeLang}
          onChange={(key) => setActiveLang(key)}
          items={(store.getEnumData("LANGUAGE") || []).map((item: any) => {
            const langKey = getFieldLangKey(item.code);
            const renderList =
              metaList && metaList.length > 0
                ? metaList.map((m: any) => ({
                  id: m.id,
                  keyName: m.keyName ?? String(m.id),
                  name: m.name,
                  type: m.type,
                }))
                : (metaValues || []).map((m: any) => ({
                  id: m.metaId,
                  keyName: m.keyName ?? String(m.metaId),
                  name: m.name,
                  type: m.type,
                }));
            return {
              label: item.desc,
              key: String(item.code),
              children: (
                <div>
                  {renderList.map((elem: any) => (
                    <Form.Item noStyle key={`${langKey}-${elem.keyName}`}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Form.Item
                          name={[langKey, elem.keyName, "metaId"]}
                          style={{ marginRight: "10px" }}
                          initialValue={elem.keyName}
                        >
                          <div style={{ whiteSpace: "nowrap" }}>{elem.name}:</div>
                        </Form.Item>
                        <Form.Item
                          name={[langKey, elem.keyName, "value"]}
                          valuePropName={String(elem.type) === "5" ? "value" : undefined}
                          trigger={String(elem.type) === "5" ? "onChange" : undefined}
                          getValueFromEvent={String(elem.type) === "5" ? (value: string) => value : undefined}
                          style={{ marginRight: "10px", width: "100%" }}
                        >
                          {renderInput(Number(elem.type), langKey, elem.keyName)}
                        </Form.Item>
                      </div>
                    </Form.Item>
                  ))}
                </div>
              ),
            };
          })}
        />
      </Form>
    </div>
  );
};

export default MetaPanel;
