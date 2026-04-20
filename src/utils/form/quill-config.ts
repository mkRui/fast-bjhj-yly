// 通用的 Quill 编辑器配置
export const defaultQuillModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // 切换按钮
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // 用户自定义按钮值
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // 上标/下标
    [{ indent: "-1" }, { indent: "+1" }], // 减少缩进/缩进
    [{ direction: "rtl" }], // 文本方向

    [{ size: ["small", false, "large", "huge"] }], // 用户自定义下拉
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // 主题默认下拉，使用主题提供的值
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ],
};

// 简化版编辑器配置
export const simpleQuillModules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["clean"],
  ],
};

export default {
  defaultQuillModules,
  simpleQuillModules,
};