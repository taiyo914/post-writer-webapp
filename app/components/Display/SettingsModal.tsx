"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import useSettingsModalStore from "./store/settingsModalStore";
import { UserWordsSettingsType } from "@/types/Types";
import useUserWordsSettingsStore from "@/store/userWordsSettingsStore";
import { motion, AnimatePresence } from "framer-motion";

type SettingsProps = {
  userId: string;
  initialUserWordsSettings: UserWordsSettingsType;
};

export default function SettingsModal({ userId, initialUserWordsSettings }: SettingsProps) {
  const { isOpen, toggleModal } = useSettingsModalStore();
  const { setUserWordsSettings } = useUserWordsSettingsStore();
  const supabase = createClient();
  const [temporarySettings, setTemporarySettings] = useState<UserWordsSettingsType>(initialUserWordsSettings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTemporarySettings({
      ...temporarySettings,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Supabaseにデータを保存
    const { error } = await supabase
      .from("user_words_settings")
      .update({
        ...temporarySettings,
        page_offset: 1,
      })
      .eq("user_id", userId);

    if (error) {
      alert(`設定の更新に失敗しました...: ${error.message}`);
    } else {
      setUserWordsSettings({ ...temporarySettings, page_offset: 1 });
      toggleModal()
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";  // モーダルが開いたとき、スクロールを無効にする
    } else {
      document.body.style.overflow = "";  // モーダルが閉じたら元に戻す
    }
    return () => {
      document.body.style.overflow = "";  // クリーンアップ
    };
  }, [isOpen]);

  const [isExiting, setIsExiting] = useState(false);  // 追加: アニメーション中かどうかのフラグ
  const handleClose = () => {
    setIsExiting(true);  // アニメーションの終了を待つためにフラグを立てる
  };
  const handleAnimationComplete = () => {
    if (isExiting) {
      toggleModal();  // アニメーション終了後にモーダルを閉じる
      setIsExiting(false);  // フラグをリセット
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <motion.div
            className="absolute inset-0 bg-black z-40"
            initial={{ opacity: 0 }}    
            animate={{ opacity: 0.5 }}   
            exit={{ opacity: 0 }}        
            transition={{ duration: 0.3 }}  
          ></motion.div>
          

          <motion.div
            className="bg-white rounded-xl shadow-lg p-5 xs:px-10 m-5 xs:py-7 xs:m-7 w-1/2 xs:min-w-[400px] min-w-[300px] max-w-lg z-50 relative max-h-screen"
            initial={{ opacity: 0, y: -50 }}  
            animate={{ opacity: 1, y: 0 }}    
            exit={{ opacity: 0, y: -50 }}      
            transition={{ duration: 0.3 }}   
          >
          
              <h1 className="text-2xl font-bold mb-5 text-center">設定</h1>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 xs:gap-6 gap-3 ">
                <div className="">
                  <label className="block  font-medium text-gray-500 xs:mb-2 xs:-mt-2 -mt-4">表示件数</label>
                  <input
                    type="number"
                    name="display_count"
                    value={temporarySettings.display_count}
                    onChange={handleChange}
                    className="xs:px-3 p-2 xs:py-3 py-1 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block font-medium xs:mb-2  text-gray-500">並び替え</label>
                  <div className="flex items-center space-x-2">
                    <select
                      name="sort_field"
                      value={temporarySettings.sort_field}
                      onChange={handleChange}
                      className="xs:pl-3 pl-1 xs:py-3 py-1 pr-0 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-black"
                    >
                      <option value="created_at">作成日</option>
                      <option value="index">優先度</option>
                      <option value="word">語句</option>
                      <option value="review_count">復習回数</option>
                      <option value="reviewed_at">復習日</option>
                      <option value="updated_at">更新日</option>
                    </select>
                    <span className=" text-gray-600 ">で</span>
                    <select
                      name="sort_order"
                      value={temporarySettings.sort_order}
                      onChange={handleChange}
                      className="xs:pl-3 pl-1 xs:py-3 py-1 pr-0 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-black"
                    >
                      <option value="ASC">昇順</option>
                      <option value="DESC">降順</option>
                    </select>
                    <span className=" text-gray-600 min-w-max ">にする</span>
                  </div>
                </div>

                <div>
                  <label className="block font-medium xs:mb-2  text-gray-500">優先度</label>
                  <div className="flex items-center space-x-2 ">
                    <input
                      type="number"
                      name="start_index"
                      min={0}
                      max={temporarySettings.end_index}
                      value={temporarySettings.start_index}
                      onChange={handleChange}
                      className="xs:px-3 p-2 xs:py-3 py-1 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-black"
                    />
                    <span className=" text-gray-600 min-w-max ">から</span>
                    <input
                      type="number"
                      name="end_index"
                      min={temporarySettings.start_index}
                      max={10}
                      value={temporarySettings.end_index}
                      onChange={handleChange}
                      className="xs:px-3 p-2 xs:py-3 py-1 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-black"
                    />
                    <span className=" text-gray-600 min-w-max">まで</span>
                  </div>
                </div>

                <div>
                  <label className="block font-medium xs:mb-2 text-gray-500">復習回数</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      name="start_review_count"
                      min={0}
                      max={temporarySettings.end_review_count}
                      value={temporarySettings.start_review_count}
                      onChange={handleChange}
                      className="xs:px-3 p-2 xs:py-3 py-1 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-black"
                    />
                    <span className="min-w-max  text-gray-600">から</span>
                    <input
                      type="number"
                      name="end_review_count"
                      min={temporarySettings.start_review_count}
                      max={100}
                      value={temporarySettings.end_review_count}
                      onChange={handleChange}
                      className="xs:px-3 p-2 xs:py-3 py-1 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-black"
                    />
                    <span className="min-w-max text-gray-600 text-center">まで</span>
                  </div>
                </div>

                <div>
                  <label className="block font-medium xs:mb-2 text-gray-500">日付範囲</label>
                  <div className="flex flex-wrap items-baseline -mr-2">
                    <div className="flex flex-grow items-center mb-2">
                      <select
                        name="date_field"
                        value={temporarySettings.date_field}
                        onChange={handleChange}
                        className="xs:px-3 p-2 xs:py-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-black flex-grow  max-w"
                      >
                        <option value="created_at">作成日</option>
                        <option value="updated_at">更新日</option>
                        <option value="reviewed_at">復習日</option>
                      </select>
                      <span className="text-gray-600 mx-2">を</span>
                    </div>
                    <div className="flex items-center flex-wrap flex-grow">
                      <div className="flex items-center flex-grow mb-2">
                        <input
                          type="date"
                          name="start_date"
                          value={temporarySettings.start_date ?? ""}
                          onChange={handleChange}
                          className="xs:px-3 p-2 xs:py-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-black flex-grow"
                        />
                        <span className="text-gray-600 min-w-8 mx-2 ">から</span>
                      </div>
                      <div className="flex items-center flex-grow mb-2">
                        <input
                          type="date"
                          name="end_date"
                          value={temporarySettings.end_date ?? ""}
                          onChange={handleChange}
                          className="xs:px-3 p-2 xs:py-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-black flex-grow"
                        />
                        <span className="text-gray-600 min-w-8 mx-2">まで</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between xs:mt-3 mt-1 space-x-3">
                  <button
                    type="submit"
                    className="bg-blue-500 text-lg text-white px-3 xs:py-3 py-2 rounded-lg hover:bg-blue-600 transition-all w-full"
                  >
                    設定を保存
                  </button>
                  <button
                    className="bg-gray-500 text-lg text-white px-3 xs:py-3 py-2 rounded-lg hover:bg-gray-600 transition-all mr-1 w-full"
                    onClick={handleClose}
                  >
                    閉じる
                  </button>
                </div>
              </form>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
