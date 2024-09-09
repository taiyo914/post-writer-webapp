"use client";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { InitialInfoProps, WordType } from "@/types/Types";
import Pagination from "./Pagination";
import TableDisplay from "./TableDisplay";
//ZustandからStoreを取得
import useUserIdStore from "@/store/userIdStore";
import useUserWordsSettingsStore from "@/store/userWordsSettingsStore";
import useTabStore from "../store/curretTabStore";
//offsetの更新を遅らせるためのデバウンズライブラリ
import { debounce } from "lodash"; 
import CardsDisplay from "./CardsDisplay";


const DisplayContent = ({ initialWords, userId, initialUserWordsSettings }: InitialInfoProps) => {
  const { setUserId }= useUserIdStore();
  const { userWordsSettings, setUserWordsSettings, incrementPageOffset, decrementPageOffset } = useUserWordsSettingsStore();
  const { currentTab } = useTabStore();

  const [words, setWords] = useState<WordType[]>(initialWords);
  const [totalWords, setTotalWords] = useState<number>(0);
  const [isSettingsInitialized, setIsSettingsInitialized] = useState(false); // 初期設定が完了したか確認するためのフラグ

//追加
  const [fetchingKey, setFetchingKey] = useState<number>(0); // アニメーションを再発動させるためのキー
  console.log("フェッチングキー", fetchingKey)

  useEffect(() => {
    // ZustandにuserIdとuserWordsSettingsをセット
    // リロードすると初期化されちゃうからもしかしてZustand使えない...??
    setUserId(userId);
    setUserWordsSettings(initialUserWordsSettings);
    setIsSettingsInitialized(true); // 初期設定が完了したらフラグをtrueに
  }, [userId, initialUserWordsSettings]);

  // 単語を取得する関数
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
        setTotalWords(data.totalWords);
        setFetchingKey(prevKey => prevKey + 1); // フェッチ後にキーを更新してアニメーションをトリガー
      
      } else {
        console.error("Error fetching words:", data.error);
      }
    } catch (error) {
      console.error("Error fetching words:", error);
    } 
  };

  //ページネーションを更新する関数
  const updatePageOffsetInSupabase = useCallback(
    debounce(async (newOffset) => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("user_words_settings")
          .update({ page_offset: newOffset })
          .eq("user_id", userId);
        if (error) {
          console.error("Error updating page_offset in Supabase:", error.message);
        } else{
          console.log("デバウンズが実行されました")
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }, 500), //0.5秒後にデバウンズ
    [userId]
  );

  useEffect(() => {
    // if (isSettingsInitialized) {
      fetchWords();
      updatePageOffsetInSupabase(userWordsSettings.page_offset);
      // 0.5秒デバウンズすることで0.5秒以内にpage_offsetが更新されてもfetchせず、最後の更新から0.5秒間経ってからfetchする
      // これにより連続クリックによるデータの送信を防ぐことができる
      // でもこれだと3秒以内に/reviewに移ったときちゃんと反映されるのか？
    // }
  }, [userWordsSettings, isSettingsInitialized]);

  return (
    <div className="border rounded rounded-tl-none shadow">
      <div className="flex justify-end items-start xs:mt-3 xs:mr-2 mt-2 mr-1 mb-2">
        <Pagination
          pageOffset={userWordsSettings.page_offset}
          displayCount={userWordsSettings.display_count}
          totalWords={totalWords}
          incrementPageOffset={incrementPageOffset}
          decrementPageOffset={decrementPageOffset}
        />
      </div>
      {currentTab === 'cards' ? (
        <CardsDisplay key={fetchingKey} fetchingKey={fetchingKey} words = {words}/>
      ) : (
        <TableDisplay key={fetchingKey} fetchingKey={fetchingKey} words = {words}/>
      )}
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
