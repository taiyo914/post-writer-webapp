"use client";
import React, { useState, useEffect } from "react";
import { wordsData } from "../data/wordsData";

type Settings = {
  sortOrder: string;
  // "日付順（新しい順）" | "日付順（古い順）" | "優先度順（高い順 " | "優先度順（低い順）"としたほうがより厳密
  displayCount: number;
  priorityRange: [number, number];
  dateRange: [string, string];
};

interface VocabListProps {
  settings: Settings;
}

const VocabList: React.FC<VocabListProps> = ({ settings }) => {
  const { sortOrder, displayCount, priorityRange, dateRange } = settings;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

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

  // 指定された個数だけ表示
  const startIndex = (currentPage - 1) * displayCount;
  const endIndex = startIndex + displayCount;
  const paginatedWords = filteredWords.slice(startIndex, endIndex);

  // 表示されてるデータをローカルストレージに保存(キーはreviewWords)
  useEffect(() => {
    localStorage.setItem('reviewWords', JSON.stringify(paginatedWords));
  }, [paginatedWords]);

  return (
    <>
      <div className="bg-white rounded-lg p-6 border shadow-md overflow-x-auto">
        <div className="min-w-[1200px]">
          <div className="flex items-center mb-2">
            <div className="w-10 mr-4"></div> {/* 優先度の位置合わせ用 */}
            <div className="flex-1 grid grid-cols-8 px-4">
              <div className="col-span-1 font-bold text-center pr-3">語句 </div>
              <div className="col-span-1 font-bold text-center px-3">意味 </div>
              <div className="col-span-2 font-bold text-center px-3">例文</div>
              <div className="col-span-2 font-bold text-center px-3">例文訳</div>
              <div className="col-span-2 font-bold text-center px-3">メモ</div>
            </div>
          </div>
          <div className="space-y-3">
            {paginatedWords.map((word, index) => (
              <div key={index} className="flex items-center ">
                <div className="flex justify-center items-center h-10 w-10 bg-gray-300 rounded-full text-lg font-bold mr-4">
                  {word.priority}
                </div>
                <div className="flex-1 grid grid-cols-8 border-gray-200 bg-white border shadow rounded-lg px-4 py-3">
                  <div className="col-span-1 flex items-center  border-r border-gray-200 pr-3 font-bold">
                    {word.word}
                  </div>
                  <div className="col-span-1 flex items-center justify-center border-r border-gray-200 px-3">
                    {word.meaning}
                  </div>
                  <div className="col-span-2 flex items-center justify-center border-r border-gray-200 px-3 text-sm">
                    {word.example}
                  </div>
                  <div className="col-span-2 flex items-center justify-center border-r border-gray-200 px-3 text-sm">
                    {word.exampleTranslation}
                  </div>
                  <div className="col-span-2 flex items-center pl-3 text-sm">
                    {word.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4 space-x-5">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
        >
          前へ
        </button>
        <span className="text-gray-700">
          ページ {currentPage} / {Math.ceil(filteredWords.length / displayCount)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={endIndex >= filteredWords.length}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
        >
          次へ
        </button>
      </div>
    </>
  );
};

export default VocabList;
