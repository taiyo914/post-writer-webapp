import React from "react";

const VocabListHeader: React.FC = () => {
  return (
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
  );
};

export default VocabListHeader;
