import { useEffect, useRef } from "react";
import type { FormInstance } from "antd/es/form";

/**
 * 仅在弹窗首次挂载时写入表单初值。
 * RunComponents 在 loading 变更时会重渲染并传入新的 init 对象引用，若依赖 init 会清空用户已填内容。
 */
export function useFormInitialValues(
  form: FormInstance,
  values?: Record<string, unknown>
): void {
  const initialRef = useRef(values);

  useEffect(() => {
    if (initialRef.current) {
      form.setFieldsValue(initialRef.current);
    }
  }, [form]);
}
