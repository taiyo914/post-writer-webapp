"use client";
import React, { useState } from "react";
import { Settings } from "@/types/settings";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSave: (settings: Settings) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
}) => {
  const [sortOrder, setSortOrder] = useState<string>(settings.sortOrder);
  const [displayCount, setDisplayCount] = useState<number>(
    settings.displayCount
  );
  const [priorityRange, setPriorityRange] = useState<[number, number]>(
    settings.priorityRange
  );
  const [dateRange, setDateRange] = useState<[string, string]>(
    settings.dateRange
  );

  const handleSave = () => {
    onSave({
      sortOrder,
      displayCount,
      priorityRange,
      dateRange,
    });
    //ここで設定情報をローカルストレージに保存
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg p-6 z-10 min-w-fit w-1/2 max-w-xl shadow-lg relative -top-10">
        <h2 className="text-xl font-bold mb-4 text-center pr-2">設定</h2>

        <div className="mb-5">
          <label className="block font-semibold mb-1">並び替え</label>
          <select
            className="w-full border rounded-md p-2"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option>日付順（古い順）</option>
            <option>日付順（新しい順）</option>
            <option>優先度順（高い順）</option>
            <option>優先度順（低い順）</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="block font-semibold mb-1">表示個数</label>
          <input
            type="number"
            className="w-full border rounded-md p-2"
            placeholder="例: 10"
            value={displayCount}
            onChange={(e) => setDisplayCount(Number(e.target.value))}
          />
        </div>
        <div className="mb-5">
          <label className="block font-semibold mb-1">優先度範囲</label>
          <div className="flex space-x-2">
            <div className="w-full">
            <p className="text-sm text-gray-400 pl-1">from</p>
              <input
                type="number"
                min={0}
                max={10}
                className="w-full border rounded-md p-2"
                value={priorityRange[0]}
                onChange={(e) =>
                  setPriorityRange([Number(e.target.value), priorityRange[1]])
                }
                placeholder="最小"
              />
            </div>
            <div className="w-full">
              <p className="text-sm text-gray-400 pl-1">to</p>
              <input
                type="number"
                min={0}
                max={10}
                className="w-full border rounded-md p-2"
                value={priorityRange[1]}
                onChange={(e) =>
                  setPriorityRange([priorityRange[0], Number(e.target.value)])
                }
                placeholder="最大"
              />
            </div>
          </div>
        </div>

        <div className="mb-11">
          <label className="block font-semibold">作成日範囲</label>
          <div className="flex space-x-2">
            <div className="w-full">
              <p className="text-sm text-gray-400 pl-1">from</p>
              <input
                type="date"
                className="w-full border rounded-md p-2"
                value={dateRange[0]}
                onChange={(e) => setDateRange([e.target.value, dateRange[1]])}
              />
            </div>
            <div className="w-full">
              <p className="text-sm text-gray-400 pl-1">to</p>
              <input
                type="date"
                className="w-full border rounded-md p-2"
                value={dateRange[1]}
                onChange={(e) => setDateRange([dateRange[0], e.target.value])}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 ">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            onClick={handleSave}
          >
            保存
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition ml-2"
            onClick={onClose}
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
