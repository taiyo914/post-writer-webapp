"use client";
import React, { useState, useEffect } from "react";
import { wordsData } from "@/data/wordsData";
import { Settings } from "@/types/settings";
import { filterAndSortWords } from "@/utils/filterAndSortWords";
import VocabListHeader from "./VocabListHeader";
import VocabListItem from "./VocabListItem";
import PaginationControls from "./PaginationControls";

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

  //ソート&フィルターの処理(from /utils/filterAndSortWords.ts)
  const filteredWords = filterAndSortWords(wordsData, settings);

  // 指定された個数(displayCount)だけ表示
  const startIndex = (currentPage - 1) * displayCount;
  const endIndex = startIndex + displayCount;
  const paginatedWords = filteredWords.slice(startIndex, endIndex);

  // 表示されてるデータをローカルストレージに保存(キーはreviewWords)
  useEffect(() => {
    localStorage.setItem("reviewWords", JSON.stringify(paginatedWords));
  }, [paginatedWords]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortOrder, displayCount, priorityRange, dateRange]);

  return (
    <>
      <div className="bg-white rounded-lg p-6 border shadow-md overflow-x-auto">
        <div className="min-w-[1200px]">
          <VocabListHeader />
          <div className="space-y-3">
            {paginatedWords.map((word, index) => (
              <VocabListItem key={index} word={word} />
            ))}
          </div>
        </div>
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalItems={filteredWords.length}
        displayCount={displayCount}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
      />
    </>
  );
};

export default VocabList;
