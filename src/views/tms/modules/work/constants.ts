export const WORK_STAT_FIELDS = [
  { key: "morningReadNum", label: "早读" },
  { key: "eveningStudyNum", label: "晚自习" },
  { key: "classHour", label: "课时" },
  { key: "oralPracticeNum", label: "口语练习" },
  { key: "collegeCounselingNum", label: "升学指导" },
  { key: "overtimeNum", label: "加班" },
] as const;

export type WorkStatFieldKey = (typeof WORK_STAT_FIELDS)[number]["key"];
