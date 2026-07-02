import { action, makeObservable, observable } from "mobx";
import { Store } from "mor-request";
import { createContext } from "react";

import axios from "@/api";
import { resolveMutation } from "@/utils/common/mutation-success";
import type { Teacher } from "@/views/personal-info/types/api";
import { Api } from "../api";
import { API } from "../types/api";

export class CompetitionStore extends Store<Api> {
  public loading = false;

  public params: API.Page.Params = {
    current: "0",
    size: "10",
  };

  public page: API.Page.Data = {
    size: 10,
    pages: 0,
    total: 0,
    records: [],
    current: 0,
  };

  constructor() {
    super(new Api(axios));
    makeObservable(this, {
      loading: observable,
      params: observable,
      page: observable,
      $setLoading: action,
      $setParams: action,
      $setPage: action,
    });
  }

  public $setLoading(loading: boolean): void {
    this.loading = loading;
  }

  public $setParams(params: Partial<API.Page.Params>): void {
    Object.assign(this.params, params);
  }

  public $setPage(data: API.Page.Data): void {
    this.page = data;
  }

  public async fetchPage(): Promise<void> {
    this.$setLoading(true);
    const [err, data] = await this.api.getPage(this.params);
    this.$setLoading(false);
    if (!err) this.$setPage(data);
  }

  public async searchTeachers(keyword: string): Promise<Teacher[]> {
    const [err, data] = await this.api.searchTeacherList({ keyword: keyword || " " });
    if (err) return [];
    return data || [];
  }

  public async fetchCompetitionTeachers(competitionId: string): Promise<Teacher[]> {
    const [err, data] = await this.api.getCompetitionTeachers({ competitionId });
    if (err) return [];
    return data || [];
  }

  public async fetchCompetitionStudents(competitionId: string): Promise<string[]> {
    const [err, data] = await this.api.getCompetitionStudents({ competitionId });
    if (err) return [];
    return (data || []).map((item) => item.studentName).filter(Boolean);
  }

  public async addCompetition(params: API.Add.Params) {
    this.$setLoading(true);
    const [err] = await this.api.addCompetition(params);
    this.$setLoading(false);
    return resolveMutation(err, () => this.fetchPage());
  }

  public async editCompetition(params: API.Edit.Params) {
    this.$setLoading(true);
    const [err] = await this.api.editCompetition(params);
    this.$setLoading(false);
    return resolveMutation(err, () => this.fetchPage());
  }

  public async delCompetition(params: API.Del.Params) {
    this.$setLoading(true);
    const [err] = await this.api.delCompetition(params);
    this.$setLoading(false);
    return resolveMutation(err, () => this.fetchPage());
  }

  public async fetchAttachmentList(
    competitionId: string
  ): Promise<API.AttachmentList.Data[]> {
    const [err, data] = await this.api.getAttachmentList({ competitionId });
    if (err) return [];
    return data || [];
  }

  public async addAttachment(params: API.AttachmentAdd.Params) {
    const [err] = await this.api.addAttachment(params);
    return resolveMutation(err);
  }

  public async delAttachment(params: API.AttachmentDel.Params) {
    const [err] = await this.api.delAttachment(params);
    return resolveMutation(err);
  }
}

const CompetitionContext = createContext<CompetitionStore>({} as CompetitionStore);

export default CompetitionContext;
