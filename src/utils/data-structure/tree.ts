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

// 查找 Tree id 并附带链路
export function Search(config: any, target: string): any {
  const arr: any = [];

  const find = config.find((elem: any) => target.includes(elem.href));

  if (find) {
    arr.push(find.id);
    if (find.children) {
      deep(find.children, target);
    }
  }

  function deep(config: any, target: string): void {
    const deepFind = config.find((elem: any) => target.includes(elem.href));

    if (deepFind) {
      arr.push(deepFind.id);
      if (deepFind.children) {
        deep(deepFind.children, target);
      }
    }
  }

  return arr;
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
