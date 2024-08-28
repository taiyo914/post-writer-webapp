"use client";
import { useState } from "react";
import Link from "next/link";
import VocabList from "./components/VocabList";
import SettingsModal from "./components/SettingModal";

type Settings = {
  sortOrder: string;
  // "日付順（新しい順）" | "日付順（古い順）" | "優先度順（高い順 " | "優先度順（低い順）"としたほうがより厳密。だが文言は今後も変更する可能性があるので、一旦stringで定義。
  displayCount: number;
  priorityRange: [number, number];
  dateRange: [string, string];
};

export default function Home() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  const [settings, setSettings] = useState<Settings>({
    sortOrder: "日付順（新しい順）",
    displayCount: 10,
    priorityRange: [1, 10],
    dateRange: ["", ""],
  }); //↑本来は、Cookieに保存された前回の情報を初期値とする
  const handleSaveSettings = (newSettings: Settings) => {
    setSettings(newSettings);
  };

  return (
    <div className="p-4 mx-auto max-w-[2000px]">
      <div className="flex justify-center space-x-2 mb-4 p-1">
        <Link
          href="new"
          className="text-center w-1/2 py-2  font-semibold rounded-md shadow-md hover:bg-gray-200  transition-colors duration-300 border"
        >
          Add New Vocab
        </Link>
        <Link
          href="review"
          className="text-center w-1/2 py-2 border font-semibold rounded-md shadow-md bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-300"
        >
          ➞ Review
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl px-3 w-fit">Vocab</h1>
        <button
          className="text-sm font-semibold mb-1 px-2 py-1 rounded-md bg-gray-300 hover:opacity-75 shadow"
          onClick={toggleModal}
        >
          Settings
        </button>
      </div>
      <VocabList settings={settings} />
      <SettingsModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        settings={settings}
        onSave={handleSaveSettings}
      />
      <div className="h-32"></div>
    </div>
  );
}
