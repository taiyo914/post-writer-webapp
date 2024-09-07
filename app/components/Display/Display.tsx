"use client";
import { useState, useEffect } from "react";
import SettingsModal from "./SettingsModal";
import DisplayHeader from "./header/DisplayHeader";
import CardsDisplay from "./content/CardsDisplay";
import TableDisplay from "./content/TableDisplay";
import { InitialInfoProps } from "@/types/Types";

export default function Display({initialWords, userId, initialUserWordsSettings,}: InitialInfoProps) {

  return (
    <div className="px-5 mx-auto max-w-[2000px]">
      <SettingsModal userId = {userId} initialUserWordsSettings={initialUserWordsSettings} />
      <DisplayHeader/>
      {false ? (
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
