interface ListType {
  [key: string]: (() => void)[];
}

class EventDispatch {
  public list: ListType = {};
  public on(event: string, fn: () => void): void {
    (this.list[event] || (this.list[event] = [])).push(fn);
  }

  public emit(...args: any): boolean | undefined {
    const argu = args;
    const event = [].shift.call(args) ?? "";
    const fns = [...this.list[event]];
    if (!fns.length) {
      return false;
    }
    fns.forEach((item) => {
      item.apply(this, argu);
    });
  }

  public once(event: string, fn: () => void): void {
    this.list[event] = [fn];
  }

  public off(event: string, fn: () => void): boolean | undefined {
    const fns = this.list[event];
    if (!fns) {
      return false;
    }
    if (!fn) {
      if (fns) fns.length = 0;
    } else {
      let cb;
      for (let i = 0, cbLen = fns.length; i < cbLen; i++) {
        cb = fns[i];
        if (cb === fn) {
          fns.splice(i, 1);
          break;
        }
      }
    }
  }
}

const eventDispatch = new EventDispatch();

export default eventDispatch;
