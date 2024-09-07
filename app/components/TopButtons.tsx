"use client";

import { color } from "framer-motion";
import Link from "next/link";

const TopButtons = () => {
  return (
    <div className="p-3 xs:p-5 mx-auto max-w-[1200px]">
      <div className="flex jusity-center flex-col xs:flex-row xs:space-x-4 xl:space-x-10">
        <Link
          href="new"
          className="
            text-center font-semibold
            w-full xs:w-1/2 py-2   
            border rounded-md shadow-md 
            hover:bg-gray-200  transition-all duration-300 "
        >
          単語を追加する
        </Link>
        <Link
          href="review"
          className="
            text-center font-semibold 
            w-full xs:w-1/2 py-2 
            mt-2 xs:mt-0
            bg-gray-300 
            rounded-md shadow-md 
            hover:bg-gray-400 transition-all duration-300"
        >
          TSV / CSV からインポート
        </Link>
      </div>
    </div>
  );
};

export default TopButtons;
