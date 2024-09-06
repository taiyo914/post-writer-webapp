"use client";
import { useState, useEffect } from "react";
import SettingsModal from "../components/SettingsModal";
import VocabDisplayHeader from "./VocabDisplayHeader";
import TableDisplay from "./TableDisplay";
import Menubar from "./Menubar";
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

      <SettingsModal isOpen={isModalOpen} onClose={toggleModal} />
      <VocabDisplayHeader
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        toggleModal={toggleModal}
      />
      {currentTab === "cards" ? (
        <div className=" rounded rounded-tl-none  border ">CardsDisplayコンポーネント</div>
      ) : (
        // <TableDisplay userId={userId} initialUserWordsSettings={initialUserWordsSettings} initialWords={initialWords}/>
        <></>
      )}
    </div>
  );
}
