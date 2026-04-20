/* eslint-disable @typescript-eslint/no-namespace */
import { BaseRequest } from "mor-request";

export declare namespace API {
  export namespace List {
    export interface Params {
      categoryId?: string;
      keyword?: string;
      current: number;
      size: number;
    }

    export interface Product {
      id: string;
      categoryId: number;
      name: string;
      sname: string;
    }

    export interface Image {
      id: number;
      productId: number;
      attr: number;
      type: number;
      value: string;
      sort: number;
    }

    export interface Spec {
      id: number;
      categoryId: number;
      productId: number;
      name: string;
      sname: string;
    }

    export interface Records {
      product: Product;
      mainImage: Image;
      carouselList: Image[];
      specList: Spec[];
    }

    export interface Data {
      size: number;
      pages: number;
      total: number;
      current: number;
      records: Records[];
    }
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace AddItem {
    export interface Params {
      categoryId: string;
      name: string;
      sname: string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace EditItem {
    export interface Params {
      id: number | string;
      product: {
        categoryId: number | string;
        name: string;
        sname: string;
      };
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace DelItem {
    export interface Params {
      id: number | string;
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace ParamList {
    export interface Params {
      productId?: number | string;
    }

    export interface CategoryParamItem {
      id: number;
      categoryId: number;
      paramId: number;
      name: string;
      value: string;
      attr1: string;
      attr2: string;
      attr3: string;
    }

    export interface CategoryParam {
      id: number;
      categoryId: number;
      name: string;
      sname: string;
      attr1Desc: string;
      attr2Desc: string;
      attr3Desc: string;
    }

    export interface Data {
      categoryParam: CategoryParam;
      categoryParamItemList: CategoryParamItem[];
    }

    export type Response = BaseRequest.Response<Data[]>;
  }

  export namespace SetProductParam {
    export interface ParamItem {
      paramId: string;
      paramItemIdList: string;
    }

    export interface Params {
      productId: string;
      paramList: ParamItem[];
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }

  export namespace GetProductParam {
    export interface ParamItem {
      id: string;
      categoryId: string;
      productId: string;
      paramId: string;
      paramItemId: string;
    }

    export interface Params {
      productId: string;
    }

    export type Data = ParamItem;
    export type Response = BaseRequest.Response<Data[]>;
  }

  export namespace EditProductAttr {
    export interface Params {
      id: number;
      productAttr: {
        productId: number | string;
        attr: string;
        type: string;
        value: string[];
        sort: number;
      };
    }

    export type Data = null;
    export type Response = BaseRequest.Response<Data>;
  }
}
