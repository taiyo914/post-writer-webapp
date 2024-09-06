"use client";
import { useEffect } from "react";
import { InitialInfoProps } from "@/types/Types";
import Header from "./Header/Header";
import TopButtons from "./TopButtons";
import Display from "./Display/Display";


export default function Home({ initialWords, userId, initialUserWordsSettings }: InitialInfoProps) {
  return <>
    <Header/>
    <TopButtons/>
    <Display userId={userId} initialUserWordsSettings={initialUserWordsSettings} initialWords={initialWords}/>
  </>
}
