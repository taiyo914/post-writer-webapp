"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import VocabList from "@/app/components/VocabList/VocabList";
import { SettingsProps } from "@/types/settings";
import Settings from "./Display/components/SettingsModal";
import { WordType } from "@/types/WordType"
import { UserWordsSettingsType } from "@/types/UserWordsSettingsType";

type Props = {
  userId: string;
  initialUserWordsSettings: UserWordsSettingsType;
  initialWords: WordType[];
};

export default function Home({ initialWords, userId, initialUserWordsSettings }: Props) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const toggleModal = () => setModalOpen(!isModalOpen);

  const [loading, setLoading] = useState(true);

  const [settings, setSettings] = useState<SettingsProps>({
    sortOrder: "日付順（新しい順）",
    displayCount: 10,
    priorityRange: [1, 10],
    dateRange: ["", ""],
  }); 

  useEffect(() => {
    const savedSettings = localStorage.getItem("userSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    setLoading(false);
  }, []);

  const handleSaveSettings = (newSettings: SettingsProps) => {
    setSettings(newSettings);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 mx-auto max-w-[2000px]">
      <div className="flex justify-center space-x-2 mb-4 p-1">
        <Link
          href="new"
          className="text-center w-1/2 py-2  font-semibold rounded-md shadow-md hover:bg-gray-200  transition-colors duration-300 border"
        >
          単語を追加する
        </Link>
        <Link
          href="review"
          className="text-center w-1/2 py-2 border font-semibold rounded-md shadow-md bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-300"
        >
          復 習
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl px-3 w-fit">Vocab</h1>
        <button
          className="text-sm font-semibold mb-1 mr-1 px-5 py-2 rounded-md bg-gray-300 hover:opacity-75 shadow w-1/6"
          onClick={toggleModal}
        >
          設 定
        </button>
      </div>
      <VocabList settings={settings} />
      <Settings isOpen={isModalOpen} onClose={toggleModal}/>
      <div className="h-32"></div>
    </div>
  );
}
