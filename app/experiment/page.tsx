"use client";
import { useState, useEffect } from "react";
import SettingsModal from "../components/display/SettingsModal";
import VocabDisplayHeader from "./VocabDisplayHeader";
import TableDisplay from "./TableDisplay";
import Menubar from "../components/header/Menubar";
import FramerMotion from "./FramerMotion";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function VocabDisplay() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [currentTab, setCurrentTab] = useState("cards");

  return (
    <div className="p-4">
      {/* <SettingsModal isOpen={isModalOpen} onClose={toggleModal} /> */}
      <VocabDisplayHeader
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        toggleModal={toggleModal}
      />
      {currentTab === "cards" ? (
        <div className=" rounded rounded-tl-none  border ">CardsDisplayコンポーネント</div>
      ) : (
        // <TableDisplay userId={userId} initialUserWordsSettings={initialUserWordsSettings} initialWords={initialWords}/>
        <></>)}
        <div className="border bg-red-300 rounded-2xl overflow-hidden">
          
        
          <div className="max-h-[90vh] w-full bg-gray-100 rounded-lg p-4 overflow-y-auto">
          <div className="h-full overflow-y-auto">
            <p className="mb-2">このコンテンツはスクロールできます。</p>
            <p className="mb-2">次のように続けることができます。</p>
            <p className="mb-2">スクロールバーが縦に表示されます。</p>
            <p className="mb-2">Tailwind CSS を使うと簡単です。</p>
            <p className="mb-2">縦スクロールを確認してみてください。</p>
            <p className="mb-2">スクロール可能なエリアが狭いです。</p>
            <p className="mb-2">最後の項目です。</p>
            <p className="mb-2">このコンテンツはスクロールできます。</p>
            <p className="mb-2">次のように続けることができます。</p>
            <p className="mb-2">スクロールバーが縦に表示されます。</p>
            <p className="mb-2">Tailwind CSS を使うと簡単です。</p>
            <p className="mb-2">縦スクロールを確認してみてください。</p>
            <p className="mb-2">スクロール可能なエリアが狭いです。</p>
            <p className="mb-2">最後の項目です。</p>
            <p className="mb-2">このコンテンツはスクロールできます。</p>
            <p className="mb-2">次のように続けることができます。</p>
            <p className="mb-2">スクロールバーが縦に表示されます。</p>
            <p className="mb-2">Tailwind CSS を使うと簡単です。</p>
            <p className="mb-2">縦スクロールを確認してみてください。</p>
            <p className="mb-2">スクロール可能なエリアが狭いです。</p>
            <p className="mb-2">最後の項目です。</p>
            <p className="mb-2">このコンテンツはスクロールできます。</p>
            <p className="mb-2">次のように続けることができます。</p>
            <p className="mb-2">スクロールバーが縦に表示されます。</p>
            <p className="mb-2">Tailwind CSS を使うと簡単です。</p>
            <p className="mb-2">縦スクロールを確認してみてください。</p>
            <p className="mb-2">スクロール可能なエリアが狭いです。</p>
            <p className="mb-2">最後の項目です。</p>
          </div>
        </div>
        </div>

    </div>
  );
}
