import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Content } from "@/components/container";
import HeaderTitle from "@/components/card-header";
import { Divider, Form, Input, InputNumber, Select, Space, Spin, Switch } from "antd";
import Button from "@/components/button";
import { toast } from "@/components/message";
import Upload from "@/components/upload";

import StoreContext from "../store";
import { API, EditTeacherInfoBody } from "../types/api";

const Item = Form.Item;

const PersonalInfoMain: FC = () => {
  const store = useContext(StoreContext);
  const [form] = Form.useForm();

  const toText = (value: unknown): string => {
    if (value === null || value === undefined) return "";
    if (typeof value === "string") return value;
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  };

  const toNumber = (value: unknown, fallback = 0): number => {
    if (typeof value === "number" && !Number.isNaN(value)) return value;
    const n = Number(value);
    return Number.isNaN(n) ? fallback : n;
  };

  const buildEditBody = (
    data: API.TeacherInfo.Data,
    values: any
  ): API.EditTeacherInfo.Params => {
    const originTeacher: any = data.teacher || {};
    const originTeacherInfo: any = data.teacherInfo || {};

    const vTeacher: any = values?.teacher || {};
    const vInfo: any = values?.teacherInfo || {};

    const editTeacherInfo: EditTeacherInfoBody = {
      dateOfBirth: toText(vInfo.dateOfBirth ?? originTeacherInfo.dateOfBirth),
      idNo: toText(vInfo.idNo ?? originTeacherInfo.idNo),
      registeredAddress: toText(vInfo.registeredAddress ?? originTeacherInfo.registeredAddress),
      currentResidentialAddress: toText(
        vInfo.currentResidentialAddress ?? originTeacherInfo.currentResidentialAddress
      ),
      politicalStatus: toNumber(vInfo.politicalStatus ?? originTeacherInfo.politicalStatus, 0),
      phone: toText(vInfo.phone ?? originTeacherInfo.phone),
      emergencyContact: toText(vInfo.emergencyContact ?? originTeacherInfo.emergencyContact),
      emergencyContactPhone: toText(
        vInfo.emergencyContactPhone ?? originTeacherInfo.emergencyContactPhone
      ),
      firstDegreeGraduationInstitution: toText(
        vInfo.firstDegreeGraduationInstitution ?? originTeacherInfo.firstDegreeGraduationInstitution
      ),
      firstDegreeMajor: toText(vInfo.firstDegreeMajor ?? originTeacherInfo.firstDegreeMajor),
      firstDegreeDuration: toNumber(vInfo.firstDegreeDuration ?? originTeacherInfo.firstDegreeDuration, 0),
      firstDegree: toNumber(vInfo.firstDegree ?? originTeacherInfo.firstDegree, 0),
      firstDegreeGraduationDate: toText(
        vInfo.firstDegreeGraduationDate ?? originTeacherInfo.firstDegreeGraduationDate
      ),
      highestDegreeGraduationInstitution: toText(
        vInfo.highestDegreeGraduationInstitution ??
        originTeacherInfo.highestDegreeGraduationInstitution
      ),
      highestDegreeMajor: toText(vInfo.highestDegreeMajor ?? originTeacherInfo.highestDegreeMajor),
      highestDegreeDuration: toNumber(
        vInfo.highestDegreeDuration ?? originTeacherInfo.highestDegreeDuration,
        0
      ),
      highestDegree: toNumber(vInfo.highestDegree ?? originTeacherInfo.highestDegree, 0),
      highestDegreeGraduationDate: toText(
        vInfo.highestDegreeGraduationDate ?? originTeacherInfo.highestDegreeGraduationDate
      ),
      teachingLicense: Boolean(vInfo.teachingLicense ?? originTeacherInfo.teachingLicense ?? false),
      teachingLicenseType: toNumber(
        vInfo.teachingLicenseType ?? originTeacherInfo.teachingLicenseType,
        0
      ),
      teachingLicenseSubject: toText(
        vInfo.teachingLicenseSubject ?? originTeacherInfo.teachingLicenseSubject
      ),
      teachingLicenseCertificateNumber: toText(
        vInfo.teachingLicenseCertificateNumber ??
        originTeacherInfo.teachingLicenseCertificateNumber
      ),
      teachingLicenseIssuingAuthority: toText(
        vInfo.teachingLicenseIssuingAuthority ?? originTeacherInfo.teachingLicenseIssuingAuthority
      ),
      awards: toText(vInfo.awards ?? originTeacherInfo.awards),
      honors: toText(vInfo.honors ?? originTeacherInfo.honors),
      trainingExperience: toText(vInfo.trainingExperience ?? originTeacherInfo.trainingExperience),
      financialBankAccount: toText(vInfo.financialBankAccount ?? originTeacherInfo.financialBankAccount),
      financialBankName: toText(vInfo.financialBankName ?? originTeacherInfo.financialBankName),
    };

    return {
      id: data.teacher.id,
      teacher: {
        name: toText(vTeacher.name ?? originTeacher.name),
        gender: toNumber(vTeacher.gender ?? originTeacher.gender, 0),
        ethnicity: toText(vTeacher.ethnicity ?? originTeacher.ethnicity),
        idPhoto: toText(vTeacher.idPhoto ?? originTeacher.idPhoto),
      },
      teacherInfo: editTeacherInfo,
      familyMember: Array.isArray(values?.familyMember)
        ? values.familyMember.map((item: any) => ({
          relation: toNumber(item?.relation, 0),
          name: toText(item?.name),
          employer: toText(item?.employer),
        }))
        : [],
      professionalTitle: Array.isArray(values?.professionalTitle)
        ? values.professionalTitle.map((item: any) => ({
          title: toText(item?.title),
          evaluationDate: toText(item?.evaluationDate),
        }))
        : [],
      teachingExperience: Array.isArray(values?.teachingExperience)
        ? values.teachingExperience.map((item: any) => ({
          years: toNumber(item?.years, 0),
          grade: toText(item?.grade),
          subject: toText(item?.subject),
        }))
        : [],
      workExperience: Array.isArray(values?.workExperience)
        ? values.workExperience.map((item: any) => ({
          employer: toText(item?.employer),
          startDate: toText(item?.startDate),
          endDate: toText(item?.endDate),
          position: toText(item?.position),
          job: toText(item?.job),
        }))
        : [],
    };
  };

  useEffect(() => {
    void store.getInfo();
  }, [store]);

  useEffect(() => {
    if (store.data) {
      form.setFieldsValue({
        teacher: {
          id: store.data.teacher?.id,
          name: store.data.teacher?.name,
          gender: store.data.teacher?.gender,
          ethnicity: store.data.teacher?.ethnicity,
          idPhoto: store.data.teacher?.idPhoto,
        },
        teacherInfo: {
          id: store.data.teacherInfo?.id,
          dateOfBirth: toText(store.data.teacherInfo?.dateOfBirth),
          idNo: store.data.teacherInfo?.idNo,
          registeredAddress: store.data.teacherInfo?.registeredAddress,
          currentResidentialAddress: store.data.teacherInfo?.currentResidentialAddress,
          politicalStatus: store.data.teacherInfo?.politicalStatus,
          phone: store.data.teacherInfo?.phone,
          emergencyContact: store.data.teacherInfo?.emergencyContact,
          emergencyContactPhone: store.data.teacherInfo?.emergencyContactPhone,
          firstDegreeGraduationInstitution: store.data.teacherInfo?.firstDegreeGraduationInstitution,
          firstDegreeMajor: store.data.teacherInfo?.firstDegreeMajor,
          firstDegreeDuration: store.data.teacherInfo?.firstDegreeDuration,
          firstDegree: store.data.teacherInfo?.firstDegree,
          firstDegreeGraduationDate: store.data.teacherInfo?.firstDegreeGraduationDate,
          highestDegreeGraduationInstitution:
            store.data.teacherInfo?.highestDegreeGraduationInstitution,
          highestDegreeMajor: store.data.teacherInfo?.highestDegreeMajor,
          highestDegreeDuration: store.data.teacherInfo?.highestDegreeDuration,
          highestDegree: store.data.teacherInfo?.highestDegree,
          highestDegreeGraduationDate: store.data.teacherInfo?.highestDegreeGraduationDate,
          teachingLicense: Boolean(store.data.teacherInfo?.teachingLicense),
          teachingLicenseType: store.data.teacherInfo?.teachingLicenseType,
          teachingLicenseSubject: store.data.teacherInfo?.teachingLicenseSubject,
          teachingLicenseCertificateNumber:
            store.data.teacherInfo?.teachingLicenseCertificateNumber,
          teachingLicenseIssuingAuthority: store.data.teacherInfo?.teachingLicenseIssuingAuthority,
          awards: store.data.teacherInfo?.awards,
          honors: store.data.teacherInfo?.honors,
          trainingExperience: store.data.teacherInfo?.trainingExperience,
          financialBankAccount: store.data.teacherInfo?.financialBankAccount,
          financialBankName: store.data.teacherInfo?.financialBankName,
        },
        familyMember: (store.data.familyMemberList || []).map((item) => ({
          relation: item.relation,
          name: item.name,
          employer: item.employer,
        })),
        professionalTitle: (store.data.professionalTitleList || []).map((item) => ({
          title: item.title,
          evaluationDate: toText(item.evaluationDate),
        })),
        teachingExperience: (store.data.teachingExperienceList || []).map((item) => ({
          years: item.years,
          grade: item.grade,
          subject: item.subject,
        })),
        workExperience: (store.data.workExperienceList || []).map((item) => ({
          employer: item.employer,
          startDate: toText(item.startDate),
          endDate: toText(item.endDate),
          position: item.position,
          job: item.job,
        })),
      });
    }
  }, [store.data, form]);

  const handleSubmit = async (values: any): Promise<void> => {
    if (!store.data) return;
    const payload = buildEditBody(store.data, values);
    const ok = await store.editInfo(payload);
    if (ok) {
      toast("success", "保存成功");
    }
  };

  return (
    <Content style={{ flex: 1 }}>
      <Content.Layout style={{ height: "100%" }}>
        <Content.Header>
          <HeaderTitle>个人信息</HeaderTitle>
        </Content.Header>
        <Content.Main style={{ overflow: "unset" }}>
          <Spin spinning={store.loading}>
            <div className="p-6 bg-white rounded shadow">
              <Form
                form={form}
                layout="vertical"
                onFinish={(values) => {
                  void handleSubmit(values);
                }}
              >
                <Divider orientation="left">教师</Divider>
                <div className="grid grid-cols-2 gap-4">
                  <Item
                    label="姓名"
                    name={["teacher", "name"]}
                    rules={[{ required: true, message: "请输入姓名" }]}
                  >
                    <Input placeholder="请输入姓名" />
                  </Item>
                  <Item label="性别" name={["teacher", "gender"]}>
                    <Select
                      options={[
                        { label: "未知", value: 0 },
                        { label: "男", value: 1 },
                        { label: "女", value: 2 },
                      ]}
                    />
                  </Item>
                  <Item label="民族" name={["teacher", "ethnicity"]}>
                    <Input placeholder="请输入民族" />
                  </Item>
                  <Item label="证件照" name={["teacher", "idPhoto"]}>
                    <Upload action="/common/upload" uploadType="img" block />
                  </Item>
                </div>

                <Divider orientation="left">教师信息</Divider>
                <div className="grid grid-cols-2 gap-4">
                  <Item label="出生日期" name={["teacherInfo", "dateOfBirth"]}>
                    <Input placeholder="请输入出生日期（字符串）" />
                  </Item>
                  <Item label="手机" name={["teacherInfo", "phone"]}>
                    <Input placeholder="请输入手机" />
                  </Item>
                  <Item label="身份证号" name={["teacherInfo", "idNo"]}>
                    <Input placeholder="请输入身份证号" />
                  </Item>
                  <Item label="户籍地址" name={["teacherInfo", "registeredAddress"]}>
                    <Input placeholder="请输入户籍地址" />
                  </Item>
                  <Item
                    label="现居住地址"
                    name={["teacherInfo", "currentResidentialAddress"]}
                  >
                    <Input placeholder="请输入现居住地址" />
                  </Item>
                  <Item label="政治面貌" name={["teacherInfo", "politicalStatus"]}>
                    <InputNumber style={{ width: "100%" }} placeholder="请输入政治面貌（数字）" />
                  </Item>
                  <Item label="紧急联系人" name={["teacherInfo", "emergencyContact"]}>
                    <Input placeholder="请输入紧急联系人" />
                  </Item>
                  <Item
                    label="紧急联系人电话"
                    name={["teacherInfo", "emergencyContactPhone"]}
                  >
                    <Input placeholder="请输入紧急联系人电话" />
                  </Item>
                </div>

                <Divider orientation="left">第一学历</Divider>
                <div className="grid grid-cols-2 gap-4">
                  <Item
                    label="第一学历毕业院校"
                    name={["teacherInfo", "firstDegreeGraduationInstitution"]}
                  >
                    <Input placeholder="请输入第一学历毕业院校" />
                  </Item>
                  <Item label="第一学历专业" name={["teacherInfo", "firstDegreeMajor"]}>
                    <Input placeholder="请输入第一学历专业" />
                  </Item>
                  <Item label="第一学历学制" name={["teacherInfo", "firstDegreeDuration"]}>
                    <InputNumber style={{ width: "100%" }} placeholder="请输入第一学历学制" />
                  </Item>
                  <Item label="第一学历学位" name={["teacherInfo", "firstDegree"]}>
                    <InputNumber style={{ width: "100%" }} placeholder="请输入第一学历学位" />
                  </Item>
                  <Item
                    label="第一学历毕业日期"
                    name={["teacherInfo", "firstDegreeGraduationDate"]}
                  >
                    <Input placeholder="请输入第一学历毕业日期" />
                  </Item>
                </div>

                <Divider orientation="left">最高学历</Divider>
                <div className="grid grid-cols-2 gap-4">
                  <Item
                    label="最高学历毕业院校"
                    name={["teacherInfo", "highestDegreeGraduationInstitution"]}
                  >
                    <Input placeholder="请输入最高学历毕业院校" />
                  </Item>
                  <Item label="最高学历专业" name={["teacherInfo", "highestDegreeMajor"]}>
                    <Input placeholder="请输入最高学历专业" />
                  </Item>
                  <Item label="最高学历学制" name={["teacherInfo", "highestDegreeDuration"]}>
                    <InputNumber style={{ width: "100%" }} placeholder="请输入最高学历学制" />
                  </Item>
                  <Item label="最高学历学位" name={["teacherInfo", "highestDegree"]}>
                    <InputNumber style={{ width: "100%" }} placeholder="请输入最高学历学位" />
                  </Item>
                  <Item
                    label="最高学历毕业日期"
                    name={["teacherInfo", "highestDegreeGraduationDate"]}
                  >
                    <Input placeholder="请输入最高学历毕业日期" />
                  </Item>
                </div>

                <Divider orientation="left">教师资格证</Divider>
                <div className="grid grid-cols-2 gap-4">
                  <Item
                    label="是否拥有教师资格证"
                    name={["teacherInfo", "teachingLicense"]}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Item>
                  <Item
                    label="教师资格证类型"
                    name={["teacherInfo", "teachingLicenseType"]}
                  >
                    <InputNumber style={{ width: "100%" }} placeholder="请输入教师资格证类型" />
                  </Item>
                  <Item
                    label="教师资格证学科"
                    name={["teacherInfo", "teachingLicenseSubject"]}
                  >
                    <Input placeholder="请输入教师资格证学科" />
                  </Item>
                  <Item
                    label="教师资格证编号"
                    name={["teacherInfo", "teachingLicenseCertificateNumber"]}
                  >
                    <Input placeholder="请输入教师资格证编号" />
                  </Item>
                  <Item
                    label="教师资格证发证机关"
                    name={["teacherInfo", "teachingLicenseIssuingAuthority"]}
                  >
                    <Input placeholder="请输入教师资格证发证机关" />
                  </Item>
                </div>

                <Divider orientation="left">其他信息</Divider>
                <div className="grid grid-cols-2 gap-4">
                  <Item label="奖励情况" name={["teacherInfo", "awards"]}>
                    <Input.TextArea rows={3} placeholder="请输入奖励情况" />
                  </Item>
                  <Item label="荣誉称号" name={["teacherInfo", "honors"]}>
                    <Input.TextArea rows={3} placeholder="请输入荣誉称号" />
                  </Item>
                  <Item label="培训经历" name={["teacherInfo", "trainingExperience"]}>
                    <Input.TextArea rows={3} placeholder="请输入培训经历" />
                  </Item>
                </div>

                <Divider orientation="left">银行信息</Divider>
                <div className="grid grid-cols-2 gap-4">
                  <Item label="银行账号" name={["teacherInfo", "financialBankAccount"]}>
                    <Input placeholder="请输入银行账号" />
                  </Item>
                  <Item label="开户行" name={["teacherInfo", "financialBankName"]}>
                    <Input placeholder="请输入开户行" />
                  </Item>
                </div>

                <Divider orientation="left">家庭成员</Divider>
                <Form.List name="familyMember">
                  {(fields, { add, remove }) => (
                    <div className="flex flex-col gap-4">
                      {fields.map((field) => (
                        <div key={field.key} className="grid grid-cols-3 gap-4 items-end">
                          <Item
                            label="关系"
                            name={[field.name, "relation"]}
                            rules={[{ required: true, message: "请输入关系（数字）" }]}
                          >
                            <InputNumber style={{ width: "100%" }} placeholder="关系（数字）" />
                          </Item>
                          <Item
                            label="姓名"
                            name={[field.name, "name"]}
                            rules={[{ required: true, message: "请输入姓名" }]}
                          >
                            <Input placeholder="请输入姓名" />
                          </Item>
                          <div className="flex gap-3">
                            <Item label="工作单位" name={[field.name, "employer"]} style={{ flex: 1 }}>
                              <Input placeholder="请输入工作单位" />
                            </Item>
                            <div style={{ paddingBottom: 24 }}>
                              <Button
                                type="link"
                                action="del"
                                onConfirm={() => remove(field.name)}
                              >
                                删除
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div>
                        <Button
                          action="add"
                          onClick={() => add({ relation: 0, name: "", employer: "" })}
                        >
                          新增家庭成员
                        </Button>
                      </div>
                    </div>
                  )}
                </Form.List>

                <Divider orientation="left">职称</Divider>
                <Form.List name="professionalTitle">
                  {(fields, { add, remove }) => (
                    <div className="flex flex-col gap-4">
                      {fields.map((field) => (
                        <div key={field.key} className="grid grid-cols-3 gap-4 items-end">
                          <Item
                            label="职称"
                            name={[field.name, "title"]}
                            rules={[{ required: true, message: "请输入职称" }]}
                          >
                            <Input placeholder="请输入职称" />
                          </Item>
                          <Item label="取得时间" name={[field.name, "evaluationDate"]}>
                            <Input placeholder="请输入取得时间（字符串）" />
                          </Item>
                          <div style={{ paddingBottom: 24 }}>
                            <Button
                              type="link"
                              action="del"
                              onConfirm={() => remove(field.name)}
                            >
                              删除
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div>
                        <Button
                          action="add"
                          onClick={() => add({ title: "", evaluationDate: "" })}
                        >
                          新增职称
                        </Button>
                      </div>
                    </div>
                  )}
                </Form.List>

                <Divider orientation="left">任教经历</Divider>
                <Form.List name="teachingExperience">
                  {(fields, { add, remove }) => (
                    <div className="flex flex-col gap-4">
                      {fields.map((field) => (
                        <div key={field.key} className="grid grid-cols-4 gap-4 items-end">
                          <Item
                            label="从教年限"
                            name={[field.name, "years"]}
                            rules={[{ required: true, message: "请输入从教年限" }]}
                          >
                            <InputNumber style={{ width: "100%" }} placeholder="从教年限" />
                          </Item>
                          <Item label="年级" name={[field.name, "grade"]}>
                            <Input placeholder="请输入年级" />
                          </Item>
                          <Item label="学科" name={[field.name, "subject"]}>
                            <Input placeholder="请输入学科" />
                          </Item>
                          <div style={{ paddingBottom: 24 }}>
                            <Button
                              type="link"
                              action="del"
                              onConfirm={() => remove(field.name)}
                            >
                              删除
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div>
                        <Button
                          action="add"
                          onClick={() => add({ years: 0, grade: "", subject: "" })}
                        >
                          新增任教经历
                        </Button>
                      </div>
                    </div>
                  )}
                </Form.List>

                <Divider orientation="left">工作经历</Divider>
                <Form.List name="workExperience">
                  {(fields, { add, remove }) => (
                    <div className="flex flex-col gap-4">
                      {fields.map((field) => (
                        <div key={field.key} className="grid grid-cols-5 gap-4 items-end">
                          <Item
                            label="工作单位"
                            name={[field.name, "employer"]}
                            rules={[{ required: true, message: "请输入工作单位" }]}
                          >
                            <Input placeholder="请输入工作单位" />
                          </Item>
                          <Item label="起始时间" name={[field.name, "startDate"]}>
                            <Input placeholder="请输入起始时间（字符串）" />
                          </Item>
                          <Item label="截止时间" name={[field.name, "endDate"]}>
                            <Input placeholder="请输入截止时间（字符串）" />
                          </Item>
                          <Item label="岗位" name={[field.name, "position"]}>
                            <Input placeholder="请输入岗位" />
                          </Item>
                          <div className="flex gap-3 items-end">
                            <Item label="职务" name={[field.name, "job"]} style={{ flex: 1 }}>
                              <Input placeholder="请输入职务" />
                            </Item>
                            <div style={{ paddingBottom: 24 }}>
                              <Button
                                type="link"
                                action="del"
                                onConfirm={() => remove(field.name)}
                              >
                                删除
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div>
                        <Button
                          action="add"
                          onClick={() =>
                            add({
                              employer: "",
                              startDate: "",
                              endDate: "",
                              position: "",
                              job: "",
                            })
                          }
                        >
                          新增工作经历
                        </Button>
                      </div>
                    </div>
                  )}
                </Form.List>

                <div className="mt-6 flex gap-3">
                  <Space>
                    <Button type="primary" htmlType="submit" loading={store.loading}>
                      保存
                    </Button>
                    <Button
                      onClick={() => {
                        void store.getInfo();
                      }}
                    >
                      刷新
                    </Button>
                  </Space>
                </div>
              </Form>
            </div>
          </Spin>
        </Content.Main>
      </Content.Layout>
    </Content>
  );
};

export default observer(PersonalInfoMain);
