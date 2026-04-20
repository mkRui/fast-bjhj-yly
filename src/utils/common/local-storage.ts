class MorStorage {
  public get name(): string {
    return "bjhj-website-admin";
  }

  public getItem(name: string, isParse?: boolean): any {
    const info = window.localStorage.getItem(`${this.name}_${name}`);
    if (!info) return "";
    if (isParse) {
      return JSON.parse(info);
    } else {
      return info;
    }
  }

  public setItem(name: string, data: any): void {
    if (typeof data === "object") {
      window.localStorage.setItem(`${this.name}_${name}`, JSON.stringify(data));
    } else {
      window.localStorage.setItem(`${this.name}_${name}`, data);
    }
  }

  public searchItem(name: string): boolean {
    const info = window.localStorage.getItem(`${this.name}_${name}`);
    return !!info;
  }
}

const morStorage = new MorStorage();

export default morStorage;
