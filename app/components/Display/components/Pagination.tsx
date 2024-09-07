"use client";
import { ChevronLeftIcon, ChevronRightIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { div } from "framer-motion/client";
import { useState } from "react";

interface PaginationProps {
  pageOffset: number;
  displayCount: number;
  totalWords: number;
  incrementPageOffset: () => void;
  decrementPageOffset: () => void;
}

const Pagination = ({
  pageOffset,
  displayCount,
  totalWords,
  incrementPageOffset,
  decrementPageOffset,
}: PaginationProps) => {
  return (
    <div>
      <div className="flex justify-end items-center my-3 mx-2 ">
        {/* <div className="ml-4">
          <span className="text-gray-500 text-lg">Something</span>
        </div> */}
        <div className="flex items-center">
          <button
            onClick={decrementPageOffset}
            disabled={pageOffset === 1}
            className={`p-1 rounded-full transition duration-200 ${
              pageOffset === 1 ? "opacity-30" : "hover:bg-gray-100"
            }`}
          >
            <ChevronLeftIcon className="h-6 text-gray-600" />
          </button>
          <span className="bg-gray-100 py-1 px-3 mx-1 rounded-md text-lg font-medium text-gray-700">
            {pageOffset}
          </span>
          <span className="text-sm text-gray-500 mr-1">
            {" "}
            / {totalWords !== 0 ? Math.ceil(totalWords / displayCount) : "..."}
          </span>
          <button
            onClick={incrementPageOffset}
            disabled={pageOffset * displayCount >= totalWords}
            className={`p-1 rounded-full transition duration-200 ${
              totalWords !== 0 && pageOffset * displayCount >= totalWords
                ? "opacity-30"
                : "hover:bg-gray-100"
              // "totalWords !== 0 &&"は初回レンダリングで2つ目の四季が計算できないときにfalseを返し、ボタンが一瞬透明になるのを防ぐため
            }`}
          >
            <ChevronRightIcon className="h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
