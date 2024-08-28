import { Settings } from "@/types/settings";
import { Word } from "@/types/word";

// 単語リストのフィルタリングとソートを行う関数
export const filterAndSortWords = (wordsData: Word[], settings: Settings): Word[] => {
  const { sortOrder, priorityRange, dateRange } = settings;

  let filteredWords = wordsData
    //優先度でフィルター
    .filter(
      (word) =>
        word.priority >= priorityRange[0] && word.priority <= priorityRange[1]
    )
    //日付でフィルター
    .filter((word) => {
      const wordDate = new Date(word.date);
      const startDate = dateRange[0] ? new Date(dateRange[0]) : null;
      const endDate = dateRange[1] ? new Date(dateRange[1]) : null;

      if (startDate && endDate) {
        return wordDate >= startDate && wordDate <= endDate;
      } else if (startDate) {
        return wordDate >= startDate;
      } else if (endDate) {
        return wordDate <= endDate;
      } else {
        return true;
      }
    });

  //sortメソッドで並び替え
  if (sortOrder === "日付順（新しい順）") {
    filteredWords.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } else if (sortOrder === "日付順（古い順）") {
    filteredWords.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  } else if (sortOrder === "優先度順（高い順）") {
    filteredWords.sort((a, b) => b.priority - a.priority);
  } else if (sortOrder === "優先度順（低い順）") {
    filteredWords.sort((a, b) => a.priority - b.priority);
  }

  return filteredWords;
};