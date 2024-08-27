
import React from "react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg p-6 z-10 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        {/* 設定項目はここに追加されます */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">並び替え</label>
          <select className="w-full border rounded-md p-2">
            <option>日付順（古い順）</option>
            <option>日付順（新しい順）</option>
            <option>優先度順（高い順）</option>
            <option>優先度順（低い順）</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">表示個数</label>
          <input type="number" className="w-full border rounded-md p-2" placeholder="例: 10" />
        </div>
        {/* その他の設定項目もここに追加されます */}
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
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
