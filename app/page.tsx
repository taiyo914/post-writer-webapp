import Home from "./components/Home";
import { createClient } from "@/utils/supabase/server";
import { UserWordsSettingsType } from "@/types/Types";

export default async function Server() {
  const supabase = createClient();
  //3つの関数を定義し、あとで順番に実行します
  //1. userIDを取得します
  const getUserId = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error(error);
      return "";
    }
    return data.user.id;
  };
  //2. userIDから単語の設定情報userWordsSettingsを取得します
  const getUserWordsSettings = async (userId: string):Promise<UserWordsSettingsType> => {
    const { data: userWordsSettings, error } = await supabase.from("user_words_settings").select("sort_field, sort_order, start_index, end_index, start_review_count, end_review_count, date_field, start_date, end_date, display_count, page_offset").eq("user_id", userId).single();
    if (error) {
      console.log(`Error fetching data: ${error.message}`);
    }
    return userWordsSettings as UserWordsSettingsType;
  };
  //3. userIDとuserWordsSettingsから初期表示の単語一覧initialWordsを取得します
  const getInitialWords = async (userId: string, userWordsSettings: any) => {
    const { data: initialWords, error } = await supabase
      .from("words")
      .select("id, word, meaning, example, example_translation, memo, index, favorite, review_count, reviewed_at, created_at, updated_at, deleted_at")
      .eq("user_id", userId)
      .gte("index", userWordsSettings.start_index || 0)
      .lte("index", userWordsSettings.end_index || 10)
      .gte("review_count", userWordsSettings.start_review_count || 0)
      .lte("review_count", userWordsSettings.end_review_count || 100)
      .gte(userWordsSettings.date_field, userWordsSettings.start_date || "1900-01-01")
      .lte(userWordsSettings.date_field, userWordsSettings.end_date || "2100-12-31")
      .order(userWordsSettings.sort_field || "increment", { ascending: userWordsSettings.sort_order === "ASC" })
      .range((userWordsSettings.page_offset - 1) * userWordsSettings.display_count, userWordsSettings.page_offset * userWordsSettings.display_count - 1);
    if (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
    return initialWords;
  };
  //1,2,3を実行し、Propsで各コンポーネントに渡します
  const userId = await getUserId();
  const initialUserWordsSettings = await getUserWordsSettings(userId);
  const initialWords = await getInitialWords(userId, initialUserWordsSettings);

  return <Home userId={userId} initialUserWordsSettings={initialUserWordsSettings} initialWords={initialWords}/>
}