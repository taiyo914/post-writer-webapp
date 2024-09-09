"use client";
import Link from "next/link";
import { useState, FormEvent, ChangeEvent, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";
import useUserIdStore from "@/store/userIdStore";


interface FormData {
  word: string;
  meaning: string;
  example: string;
  example_translation: string;
  memo: string;
  index: number;
}

const initialValue = {
  word: "",
  meaning: "",
  example: "",
  example_translation: "",
  memo: "",
  index: 0,
}

export default function Form() {
  const  userId  = useUserIdStore(state => state.userId)
  const [formData, setFormData] = useState<FormData>(initialValue);
  const supabase = createClient()
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      index: Number(e.target.value),
    }));
  };

  const saveDataToDatabase = async (data: FormData) => {
    if (!userId){
      alert("ユーザー情報がありません.一度ホームに戻ってください");
      return
    }

    const { error: insertError } = await supabase.from("words").insert([
      { ...data, user_id: userId },
    ]);
    if (insertError) {
      alert("単語の追加に失敗しました...: " + insertError.message);
    } else {
      setFormData(initialValue);
      alert("単語が登録されました！");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await saveDataToDatabase(formData);
    router.push("/");
  };

  const handleSubmitAndContinue = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await saveDataToDatabase(formData);
    setFormData(initialValue);
  };

  return (
    <>
      <div className="py-4 md:px-6 px-4 mx-auto max-w-3xl">
        <div className="flex justify-between items-center mb-2 px-1">
          <Link href="/" className="hover:opacity-65 transition duration-300">
            ⬅ 戻る
          </Link>
          <Link
            href="new/import"
            className="p-2 bg-gray-900 text-white rounded-md shadow hover:bg-gray-300 hover:text-gray-900 transition duration-300"
          >
            <span className=""> {"CSV/TSV"}</span>からインポート
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className=" p-6 border bg-white rounded-lg shadow-lg">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold " htmlFor="word">
                語句
              </label>
              <input
                type="text"
                name="word"
                id="word"
                value={formData.word}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-gray-700 bg-white"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold "
                htmlFor="meaning"
              >
                意味
              </label>
              <input
                type="text"
                name="meaning"
                id="meaning"
                value={formData.meaning}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-gray-700 bg-white"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold"
                htmlFor="example"
              >
                例文
              </label>
              <textarea
                name="example"
                id="example"
                value={formData.example}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-gray-700 bg-white h-24"
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold"
                htmlFor="example_translation"
              >
                例文訳
              </label>
              <textarea
                name="example_translation"
                id="example_translation"
                value={formData.example_translation}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-gray-700 bg-white h-24"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold" htmlFor="memo">
                メモ
              </label>
              <textarea
                name="memo"
                id="memo"
                value={formData.memo}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-gray-700 bg-white h-24"
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                優先度{" "}
              </label>
              <div className="flex">
                <input
                  type="range"
                  name="index"
                  min="0"
                  max="10"
                  value={formData.index}
                  onChange={handleSliderChange}
                  className="w-full"
                />
                <div className="text-gray-500  pl-2">{formData.index}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-3 my-4 px-1">
            <button
              type="submit"
              className="w-2/3 py-2 px-4 bg-gray-900 hover:bg-gray-700 text-white font-bold rounded-lg transition duration-300"
            >
              追加
            </button>
            <button
              type="button"
              onClick={handleSubmitAndContinue}
              className="w-2/3 py-2 px-4 bg-gray-300 hover:bg-gray-400 text-black font-bold rounded-lg  transition duration-300"
            >
              追加して新規作成
            </button>
          </div>
        </form>

        <div className="h-32"></div>
      </div>
    </>
  );
}
