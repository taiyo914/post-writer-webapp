"use client";
import { useState, useEffect } from "react";
import SettingsModal from "./SettingsModal";
import DisplayHeader from "./header/DisplayHeader";
import CardsDisplay from "./content/CardsDisplay";
import TableDisplay from "./content/TableDisplay";
import { InitialInfoProps } from "@/types/Types";

export default function Display({
  initialWords,
  userId,
  initialUserWordsSettings,
}: InitialInfoProps) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const toggleModal = () => setModalOpen(!isModalOpen);
  const [currentTab, setCurrentTab] = useState("cards");

  return (
    <div className="px-5 mx-auto max-w-[2000px]">
      <SettingsModal isOpen={isModalOpen} onClose={toggleModal} />
      <DisplayHeader
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        toggleModal={toggleModal}
      />
      {currentTab === "cards" ? (
        <div className=" rounded rounded-tl-none border">
          <CardsDisplay />
        </div>
      ) : (
        <div className=" rounded rounded-tl-none border">
          <TableDisplay
            userId={userId}
            initialUserWordsSettings={initialUserWordsSettings}
            initialWords={initialWords}
          />
        </div>
      )}
    </div>
  );
}
