import { action, makeObservable, observable } from "mobx";
import { BaseRequest, Request } from "mor-request";

export interface PageParams {
  pageNo: number;
  pageSize: number;
}

export interface PageResponse<T> {
  records: T;
  total: number;
  size: number;
  current: number;
}

export type RequestResponse<T> = BaseRequest.Response<PageResponse<T>>;

export abstract class PaginationModel<P, D> {
  abstract getList(params: P): Promise<D>;
  abstract delItem(id: number): Promise<any>;
  abstract jumpPage(page: number): any;
}

export class PaginationBaseStore<T extends Request, P extends PageParams, D>
  implements PaginationModel<P, RequestResponse<D[]>>
{
  public api: T;

  public params: P | undefined;

  public data: D[] = [];

  public loading = false;

  public pageData = {
    total: 0,
    pageSize: 0,
    current: 0,
  };

  public constructor(request: T) {
    this.api = request;
    makeObservable(this, {
      params: observable,
      data: observable,
      pageData: observable,
      loading: observable,
      $setParams: action,
      $setPageData: action,
      $reSetParams: action,
      $setData: action,
      $setLoading: action,
      jumpPage: action,
    });
    Object.defineProperty(this, "api", {
      enumerable: false,
    });
  }

  public $setParams(params: Partial<P>): void {
    this.params = Object.assign(this.params ?? {}, params) as P;
    console.log(this.params);
  }

  public $setLoading(loading: boolean): void {
    this.loading = loading;
  }

  public $reSetParams(params: Partial<P> = {}): void {
    this.$setParams({
      pageNo: 1,
      pageSize: 10,
      ...params,
    });
    this.refreshPage();
  }

  public $setData(Data: D[]): void {
    this.data = Data;
  }

  public $setPageData(data: this["pageData"]): void {
    this.pageData = data;
  }

  // 获取列表
  public async getList(params: P): Promise<RequestResponse<D[]>> {
    console.log(params);
    throw "请在子类实现";
  }

  // 删除某一项
  public async delItem(
    id: number | string
  ): Promise<BaseRequest.Response<any>> {
    console.log(id);
    throw "请在子类实现";
  }

  // 按页跳转
  public async jumpPage(page: number): Promise<boolean | undefined> {
    console.log(this.params);
    if (!this.params) return false;
    this.$setParams({
      ...this.params,
      pageNo: page,
      pageSize: 10,
    });
    this.$setLoading(true);
    const [, data] = await this.getList(this.params);
    this.$setLoading(false);
    if (data) {
      this.$setData(data.records);
      this.$setPageData({
        total: data.total,
        pageSize: this.params.pageSize,
        current: page,
      });
    }
  }

  // todo
  public async changeSize(size: number): Promise<boolean | undefined> {
    if (!this.params) return false;
    this.$setParams({
      ...this.params,
      pageNo: 1,
      pageSize: size,
    });
    const [, data] = await this.getList(this.params);
    if (data) {
      this.$setData(data.records);
      this.$setPageData({
        total: data.total,
        pageSize: this.params.pageSize,
        current: 1,
      });
    }
  }

  // 刷新当前列表
  public refreshPage(): void {
    void this.jumpPage(this.params?.pageNo ?? 1);
  }

  // 删除某一项 - 并刷新列表
  public async del(
    id: number | string
  ): Promise<BaseRequest.Response<null> | undefined> {
    const [, data] = await this.delItem(id);
    if (data) {
      void this.refreshPage();
      return data;
    }
  }
}
