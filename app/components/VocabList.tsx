import React from "react";
import { wordsData } from "../data/wordsData";

const VocabList = () => {
  return (
    <>
      <div className="bg-white rounded-lg p-6 border shadow-md overflow-x-auto">
        <div className="min-w-[1200px]">
          <div className="flex items-center mb-2">
            <div className="w-10 mr-4"></div> {/* 優先度の位置合わせ用 */}
            <div className="flex-1 grid grid-cols-8 px-4">
              <div className="col-span-1 font-bold text-center pr-3">Word </div>
              <div className="col-span-1 font-bold text-center px-3">Meanig </div>
              <div className="col-span-2 font-bold text-center px-3">Example</div>
              <div className="col-span-2 font-bold text-center px-3">Translation</div>
              <div className="col-span-2 font-bold text-center px-3">Memo </div>
            </div>
          </div>
          <div className="space-y-3">
            {wordsData.map((word, index) => (
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
    </>
  );
};

export default VocabList;
