/** /common/dict 字典编码，与后端保持一致 */
export const DictCode = {
  GENDER: "TEACHER_GENDER",
  POLITICAL_STATUS: "TEACHER_POLITICAL_STATUS",
  DEGREE: "TEACHER_DEGREE",
  LEAVE_TYPE: "TEACHER_LEAVE_TYPE",
  WORK_SUBJECT: "TEACHER_WORK_SUBJECT",
} as const;

export type DictCodeKey = (typeof DictCode)[keyof typeof DictCode];
