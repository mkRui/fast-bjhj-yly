export class Debounced {
  public use = <T extends (...args: any[]) => void>(
    func: T,
    delay: number,
    immediate = false
  ) => {
    let timer: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      if (immediate) {
        func.apply(this, args);
        immediate = false;
        return;
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
}
