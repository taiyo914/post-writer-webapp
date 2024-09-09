"use client";
import { InitialInfoProps } from "@/types/Types";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

// export default function Home2({ initialWords, userId, initialUserWordsSettings }: InitialInfoProps) {
export default function Home2() {
  const [words, setWords] = useState<any>([]);

  const supabase = createClient();
  //3つの関数を定義し、あとで順番に実行します
  useEffect(() => {
    const supabase = createClient();
    const doAll = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data: userWordsSettings } = await supabase
        .from("user_words_settings")
        .select(
          "sort_field, sort_order, start_index, end_index, start_review_count, end_review_count, date_field, start_date, end_date, display_count, page_offset"
        )
        .eq("user_id", user?.id)
        .single();
      const { data: initialWords } = await supabase
        .from("words")
        .select(
          "id, word, meaning, example, example_translation, memo, index, favorite, review_count, reviewed_at, created_at, updated_at, deleted_at"
        )
        .eq("user_id", user?.id)
        .gte("index", userWordsSettings?.start_index || 0)
        .lte("index", userWordsSettings?.end_index || 10)
        .gte("review_count", userWordsSettings?.start_review_count || 0)
        .lte("review_count", userWordsSettings?.end_review_count || 100)
        .gte(userWordsSettings?.date_field, userWordsSettings?.start_date || "1900-01-01")
        .lte(userWordsSettings?.date_field, userWordsSettings?.end_date || "2100-12-31")
        .order(userWordsSettings?.sort_field || "increment", {
          ascending: userWordsSettings?.sort_order === "ASC",
        })
        .range(
          (userWordsSettings?.page_offset - 1) * userWordsSettings?.display_count,
          userWordsSettings?.page_offset * userWordsSettings?.display_count - 1
        );
      setWords(initialWords)
    };

    doAll()
  }, []);

  return (
    <div className="flex flex-col min-h-screen ">
      {words.map((word:any, index:any)  => (
        <div key={index}>{word.word} </div>
      ))}
      <Link href="/"> ホームへ </Link>
    </div>
  );
}
