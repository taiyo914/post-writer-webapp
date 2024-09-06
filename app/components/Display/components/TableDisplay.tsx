"use client";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { InitialInfoProps, WordType } from "@/types/Types";
//zustandのStoreからインポート
import useUserIdStore from "@/store/userIdStore";
import useUserWordsSettingsStore from "@/store/userWordsSettingsStore";
//offsetの更新を遅らせるためのデバウンズライブラリ
import { debounce } from "lodash";
import TableDisplayItem from "./TableDisplayItem";
import Pagination from "./Pagination";

const TableDisplay = ({ initialWords, userId, initialUserWordsSettings }: InitialInfoProps) => {
  const setUserId = useUserIdStore((state) => state.setUserId);
  const { userWordsSettings, setUserWordsSettings, incrementPageOffset, decrementPageOffset } =
    useUserWordsSettingsStore();
  const [words, setWords] = useState<WordType[]>(initialWords);
  const [loading, setLoading] = useState(false);
  const [totalWords, setTotalWords] = useState<number>(0);
  console.log(initialWords, initialWords.length);
  const [message, setMessage] = useState<string | null>(null);
  const [isSettingsInitialized, setIsSettingsInitialized] = useState(false); // 初期設定が完了したか確認するためのフラグ

  useEffect(() => {
    // ZustandにuserIdとuserWordsSettingsをセット
    setUserId(userId);
    setUserWordsSettings(initialUserWordsSettings);
    setIsSettingsInitialized(true); // 初期設定が完了したらフラグをtrueに
  }, [userId, initialUserWordsSettings]);

  const fetchWords = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/getWords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          userWordsSettings,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setWords(data.words);
        console.log("fetchData", data.words);
        setTotalWords(data.totalWords);
        console.log("データの取得に成功しました:", data.words);
      } else {
        console.error("Error fetching words:", data.error);
      }
    } catch (error) {
      console.error("Error fetching words:", error);
    } finally {
      setLoading(false);
    }
  };

  const updatePageOffsetInSupabase = useCallback(
    debounce(async (newOffset) => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("user_words_settings")
          .update({ page_offset: newOffset })
          .eq("user_id", userId);
        console.log("updateが実行されました", data);
        if (error) {
          console.error("Error updating page_offset in Supabase:", error.message);
        } else {
          console.log("updateが実行されました", data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }, 5000), //5秒後にデバウンズ
    [userId]
  );

  useEffect(() => {
    if (isSettingsInitialized) {
      fetchWords();
      updatePageOffsetInSupabase(userWordsSettings.page_offset);
      // デバウンズすることで5秒以内なら何回page_offsetが更新されても5秒後の最新の状態で1回だけ更新される
    }
  }, [userWordsSettings.page_offset, isSettingsInitialized]);

  return (
    <div className="">
      <Pagination
        pageOffset={userWordsSettings.page_offset}
        displayCount={userWordsSettings.display_count}
        totalWords={totalWords}
        incrementPageOffset={incrementPageOffset}
        decrementPageOffset={decrementPageOffset}
      />
      <div className="bg-white p-5 pt-0 overflow-x-auto">
        <div className="min-w-[1200px]">
          <div className="flex items-center mb-1 ">
            <div className="flex-1 grid grid-cols-5">
              <div className="col-span-1 font-bold text-gray-400 text-sm text-center">語句 </div>
              <div className="col-span-1 font-bold text-gray-400 text-sm text-center">意味 </div>
              <div className="col-span-1 font-bold text-gray-400 text-sm text-center">例文</div>
              <div className="col-span-1 font-bold text-gray-400 text-sm text-center">例文訳</div>
              <div className="col-span-1 font-bold text-gray-400 text-sm text-center">メモ</div>
            </div>
          </div>
          <div className="space-y-1">
            {words.map((word) => (
              <TableDisplayItem key={word.id} word={word} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDisplay;
