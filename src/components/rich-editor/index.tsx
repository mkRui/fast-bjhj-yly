import { FC } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "tinymce/tinymce";
import "tinymce/models/dom";
import "tinymce/themes/silver";
import "tinymce/icons/default";
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/lists";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/charmap";
import "tinymce/plugins/preview";
import "tinymce/plugins/anchor";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/code";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/help";
import "tinymce/plugins/wordcount";

// 导入 TinyMCE 样式
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/skins/content/default/content.min.css";

interface RichEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  height?: number | string;
  placeholder?: string;
}

const RichEditor: FC<RichEditorProps> = ({
  value,
  onChange,
  height = 400,
  placeholder,
}) => {
  return (
    <Editor
      apiKey="sxr3qkz4gfbi4qdahgco3kwdwz9if53tsq5fquf2pyykg5kz"
      licenseKey="gpl"
      init={{
        height: height,
        menubar: false,
        placeholder: placeholder,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "table link image | removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        language: "zh_CN",
        skin: false,
        content_css: false,
        branding: false,
        promotion: false,
      }}
      value={value || ""}
      onEditorChange={onChange}
    />
  );
};

export default RichEditor;
