"use client";
import { WordType } from "@/types/Types";
import TableItem from "./TableItem";
import { motion } from "framer-motion";

const TableDisplay = ({ fetchingKey, words }: { fetchingKey: number; words: WordType[] }) => {
  if (fetchingKey === 0) {
    return <div className="flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
    </div>;
  } else {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="px-2 xs:px-4 pb-4 bg-white overflow-x-auto">
          <div className="xs:min-w-[1080px] min-w-[1750px]">
            <div className="flex items-center mb-1 ">
              <div className="flex-1 grid grid-cols-5">
                <div className="col-span-1 font-bold text-gray-400 text-sm text-center">語句 </div>
                <div className="col-span-1 font-bold text-gray-400 text-sm text-center">意味 </div>
                <div className="col-span-1 font-bold text-gray-400 text-sm text-center">例文</div>
                <div className="col-span-1 font-bold text-gray-400 text-sm text-center">例文訳</div>
                <div className="col-span-1 font-bold text-gray-400 text-sm text-center">メモ</div>
              </div>
            </div>
            <div className="space-y-2">
              {words.map((word) => (
                <TableItem key={word.id} word={word} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
};

export default TableDisplay;
