"use client"
import { useState } from "react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: any) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave }) => {
  const [sortOrder, setSortOrder] = useState("日付順（新しい順）");
  const [displayCount, setDisplayCount] = useState(10);
  const [priorityRange, setPriorityRange] = useState([1, 10]); // 優先度の範囲
  const [dateRange, setDateRange] = useState(["", ""]); // 日付範囲
  
  const handleSave = () => {
    onSave({
      sortOrder,
      displayCount,
      priorityRange,
      dateRange
    });
    onClose(); // 保存したらモーダルを閉じる
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg p-6 z-10 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Settings</h2>
       
        <div className="mb-4">
          <label className="block font-semibold mb-2">並び替え</label>
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

        <div className="mb-4">
          <label className="block font-semibold mb-2">表示個数</label>
          <input 
            type="number" 
            className="w-full border rounded-md p-2" 
            placeholder="例: 10" 
            value={displayCount}
            onChange={(e) => setDisplayCount(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">優先度範囲</label>
          <div className="flex space-x-2">
            <input
              type="number"
              className="w-full border rounded-md p-2"
              value={priorityRange[0]}
              onChange={(e) =>
                setPriorityRange([Number(e.target.value), priorityRange[1]])
              }
              placeholder="最小"
            />
            <input
              type="number"
              className="w-full border rounded-md p-2"
              value={priorityRange[1]}
              onChange={(e) =>
                setPriorityRange([priorityRange[0], Number(e.target.value)])
              }
              placeholder="最大"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">作成日範囲</label>
          <div className="flex space-x-2">
            <input
              type="date"
              className="w-full border rounded-md p-2"
              value={dateRange[0]}
              onChange={(e) =>
                setDateRange([e.target.value, dateRange[1]])
              }
            />
            <input
              type="date"
              className="w-full border rounded-md p-2"
              value={dateRange[1]}
              onChange={(e) =>
                setDateRange([dateRange[0], e.target.value])
              }
            />
          </div>
        </div>


        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition ml-2"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
