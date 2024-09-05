"use client";
import { useState, useEffect,  } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/outline";
import SettingsModal from "../components/SettingsModal";
import VocabDisplayHeader from "./VocabDisplayHeader";

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
        <div className="  rounded rounded-tl-none border h-screen">TableDipslayコンポーネント</div>
      )}
    </div>
  );
};
