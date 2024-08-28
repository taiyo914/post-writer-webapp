import React from "react";

interface PaginationControlsProps {
  currentPage: number;
  totalItems: number;
  displayCount: number;
  onNext: () => void;
  onPrev: () => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalItems,
  displayCount,
  onNext,
  onPrev,
}) => {
  const totalPages = Math.ceil(totalItems / displayCount);

  return (
    <div className="flex items-center justify-center mt-4 space-x-5">
    <button
      onClick={onPrev}
      disabled={currentPage === 1}
      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
    >
      前へ
    </button>
    <span className="text-gray-700">
      ページ {currentPage} / {totalPages}
    </span>
    <button
      onClick={onNext}
      disabled={currentPage >= totalPages}
      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
    >
      次へ
    </button>
  </div>
  );
};

export default PaginationControls;
