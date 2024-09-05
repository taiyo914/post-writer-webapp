"use client";
import { useState, useEffect,  } from "react";
import SettingsModal from "../components/SettingsModal";
import VocabDisplayHeader from "./VocabDisplayHeader";
import TableDisplay from "./TableDisplay";

export default function VocabDisplay(){
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const toggleModal = () => {setModalOpen(!isModalOpen);};
  const [currentTab, setCurrentTab] = useState("cards");

  return (
    <div className="p-4">
      <SettingsModal isOpen={isModalOpen} onClose={toggleModal} />
      <VocabDisplayHeader currentTab={currentTab} setCurrentTab={setCurrentTab} toggleModal={toggleModal}/>
      {currentTab === "cards" ? (
        <div className=" rounded rounded-tl-none  border h-screen">CardsDisplayコンポーネント</div>
      ) : (
        // <TableDisplay userId={userId} initialUserWordsSettings={initialUserWordsSettings} initialWords={initialWords}/>
        <></>
      )}
    </div>
  );
};
