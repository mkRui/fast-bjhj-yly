interface ListType {
  id: number | string;
  parentId: number | string;
  children?: ListType[];
}

interface TreeType {
  list: ListType[];
}

export class Tree implements TreeType {
  public list: ListType[];

  public constructor(dataSource: any) {
    this.list = dataSource;
  }

  // 根据parentId 初始化 tree
  public initTree(parentId: string | number): any {
    return this.loop(parentId);
  }

  public loop(parentId: string | number): any {
    const treeList: any = [];
    const len = this.list.length;
    for (let i = 0; i < len; i++) {
      const item = this.list[i];
      if (item.parentId === parentId) {
        const loop = this.loop(item.id);
        item.children = loop.length ? loop : null;
        treeList.push(item);
      }
    }
    return treeList;
  }
}

// 查找 Tree id 并附带链路（优先匹配最长 href，避免多个父级共用前缀时选错）
function matchHref(target: string, href: string): boolean {
  if (!href) return false;
  if (target === href) return true;

  const [hrefPath, hrefQuery = ""] = href.split("?");
  const [targetPath, targetQuery = ""] = target.split("?");

  if (hrefQuery) {
    if (targetPath !== hrefPath || !targetQuery) return false;
    const hrefParams = new URLSearchParams(hrefQuery);
    const targetParams = new URLSearchParams(targetQuery);
    for (const [key, value] of hrefParams.entries()) {
      if (targetParams.get(key) !== value) return false;
    }
    return true;
  }

  if (target.startsWith(`${href}?`)) return true;
  return hrefPath.length > 1 && targetPath === hrefPath && !targetQuery;
}

export function Search(config: any, target: string): any {
  let bestChain: string[] = [];
  let bestScore = -1;

  const walk = (nodes: any[], ancestors: string[]): void => {
    for (const node of nodes) {
      const chain = [...ancestors, node.id];
      if (matchHref(target, node.href)) {
        const score = node.href.length;
        if (score > bestScore) {
          bestScore = score;
          bestChain = chain;
        }
      }
      if (node.children?.length) {
        walk(node.children, chain);
      }
    }
  };

  walk(config, []);
  return bestChain;
}

// Tree 扁平化
export function Flatten<T extends ListType>(tree: T[]): T[] {
  const arr: T[] = [];

  for (let i = 0; i < tree.length; i++) {
    const item = tree[i];
    arr.push(item);
    if (item.children) {
      arr.push(...Flatten(item.children as T[]));
    }
  }

  return arr;
}

export default {
  Tree,
  Flatten,
  Search,
};
