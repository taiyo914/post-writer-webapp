export type Settings = {
  sortOrder: string;
  // "日付順（新しい順）" | "日付順（古い順）" | "優先度順（高い順 " | "優先度順（低い順）"としたほうがより厳密
  displayCount: number;
  priorityRange: [number, number];
  dateRange: [string, string];
};