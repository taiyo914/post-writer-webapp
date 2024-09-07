"use client";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { InitialInfoProps, WordType } from "@/types/Types";
import useUserIdStore from "@/store/userIdStore";
import useUserWordsSettingsStore from "@/store/userWordsSettingsStore";
import { debounce } from "lodash"; //offsetの更新を遅らせるためのデバウンズライブラリ

import Pagination from "./Pagination";
import TableDisplay from "./TableDisplay";
import ReviewButton from "./ReviewButton";

const DisplayContent = ({ initialWords, userId, initialUserWordsSettings }: InitialInfoProps) => {
  const setUserId = useUserIdStore((state) => state.setUserId);
  const { userWordsSettings, setUserWordsSettings, incrementPageOffset, decrementPageOffset } = useUserWordsSettingsStore();
  const [words, setWords] = useState<WordType[]>(initialWords);
  const [totalWords, setTotalWords] = useState<number>(0);
  console.log(initialWords, initialWords.length);
  const [isSettingsInitialized, setIsSettingsInitialized] = useState(false); // 初期設定が完了したか確認するためのフラグ

  useEffect(() => {
    // ZustandにuserIdとuserWordsSettingsをセット
    setUserId(userId);
    setUserWordsSettings(initialUserWordsSettings);
    setIsSettingsInitialized(true); // 初期設定が完了したらフラグをtrueに
  }, [userId, initialUserWordsSettings]);

  const fetchWords = async () => {
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
    }, 3000), //3秒後にデバウンズ
    [userId]
  );

  useEffect(() => {
    if (isSettingsInitialized) {
      fetchWords();
      updatePageOffsetInSupabase(userWordsSettings.page_offset);
      // 3秒デバウンズすることで3秒以内なら何回page_offsetが更新されてもfetchせず、最後の更新から3秒間経ってからfetchする
      // これにより連続したデータの送信を防ぐことができる
    }
  }, [userWordsSettings, isSettingsInitialized]);

  return (
    <div className="border rounded rounded-tl-none">
      <div className="flex justify-end items-start xs:mt-3 xs:mr-2 mt-2 mr-1 mb-2">
        <Pagination
          pageOffset={userWordsSettings.page_offset}
          displayCount={userWordsSettings.display_count}
          totalWords={totalWords}
          incrementPageOffset={incrementPageOffset}
          decrementPageOffset={decrementPageOffset}
        />
      </div>
      <TableDisplay words = {words}/>
      <div className="flex justify-end items-start xs:mb-3 xs:mr-2 mb-2 mr-1 mt-3">
        <Pagination
          pageOffset={userWordsSettings.page_offset}
          displayCount={userWordsSettings.display_count}
          totalWords={totalWords}
          incrementPageOffset={incrementPageOffset}
          decrementPageOffset={decrementPageOffset}
        />
      </div>
    </div>
  );
};

export default DisplayContent;
