import { FC, useEffect } from "react";
import MonacoEditor, { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useWindowSize } from "react-use";
loader.config({ monaco });

interface EditorTypes {
  value?: string;
  full: boolean;
  onChange?: (value?: string) => void;
}
const Editor: FC<EditorTypes> = (props) => {
  /**
   * @props
   * @description 组件传参
   */

  const { value, onChange, full } = props;

  const { height } = useWindowSize();

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

  const handleChange = (value?: string) => {
    onChange?.(value);
  };

  /**
   * @watch
   * @description 监听方法
   */

  useEffect(() => {}, []);

  /**
   * @lifeCycle
   * @description 生命周期
   */

  useEffect(() => {
    console.log(height);
  }, []);

  return (
    <MonacoEditor
      language="html"
      height={full ? height - 180 : height - 400}
      theme="vs-dark"
      value={value}
      onChange={handleChange}
      options={{
        selectOnLineNumbers: true,
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        language: "html", // 设置编程语言
      }}
    />
  );
};

export default Editor;
