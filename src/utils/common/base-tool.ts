export function SynthesisUrl(list: string[]): string {
    return list.join("").replace(/\*\//g, "");
}

// 默认导出所有函数
const baseTool = {
  SynthesisUrl,
};

export default baseTool;
  