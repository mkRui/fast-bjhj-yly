/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-04-28 16:25:31
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2026-01-05 15:19:51
 * @FilePath: /fast-bjhj-website-admin/src/stores/root.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 抓取store
import { makeObservable, observable, action } from "mobx";
import { Store } from "mor-request";
import axios from "@/api";
// 全局
import { Api } from "@/api/api";
import { API } from "@/api/type";

class RootStore extends Store<Api> {
  public init: API.Init.User = {
    id: 0,
    enableFlag: false,
    lockFlag: false,
    account: "",
  };

  public roleList: API.Init.RoleList[] = [];

  public resList: string[] = [];

  public enumList: API.GetEnum.Data[] = [];

  constructor() {
    super(new Api(axios));
    makeObservable(this, {
      init: observable,
      $setInit: action,
      roleList: observable,
      $setRoleList: action,
      resList: observable,
      $setResList: action,
      enumList: observable,
      $setEnumList: action,
    });
  }

  // 初始化用户信息
  public $setInit(params: Partial<API.Init.User>): void {
    Object.assign(this.init, params);
  }

  // 初始化用户信息
  public $setEnumList(data: API.GetEnum.Data[]): void {
    this.enumList = data;
  }

  // 初始化角色列表
  public $setRoleList(list: API.Init.RoleList[]): void {
    this.roleList = list;
  }

  // 初始化权限菜单
  public $setResList(list: string[]): void {
    this.resList = list;
  }

  public getEnumData(code: string): API.GetEnum.Dict[] | undefined {
    return this.enumList.find((item) => item.code === code)?.dict;
  }

  // 初始化
  public async getInit(): Promise<boolean> {
    const [err, data] = await this.api.init();
    if (!err && data) {
      this.$setInit(data.loginUser);
      this.$setResList(data.resList);
      this.$setRoleList(data.roleList);
      return true;
    }
    return false;
  }

  // 退出登录
  public async logout() {
    const [err] = await this.api.logout();
    if (!err) return true;
  }

  // 获取枚举
  public async getEnum() {
    const [err, data] = await this.api.getEnum();
    if (!err) {
      this.$setEnumList(data);
    }
  }
}

export const root = new RootStore();

export default RootStore;
