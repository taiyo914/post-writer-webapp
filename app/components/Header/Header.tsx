"use client";
import { useState } from "react";
import Link from "next/link";
import Menubar from "./Menubar";
import { Bars3Icon } from "@heroicons/react/24/outline";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-[2000px] mx-auto px-5 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          <Link href="/">Vocab Deck</Link>
        </h1>
        <nav>
          <div className="flex space-x-4 items-center">
            {/* ハンバーガーメニューボタン */}
            <button onClick={toggleMenu} className="">
              <Bars3Icon className="cursor-pointer h-8 w-8 text-gray-600" />
            </button>
          </div>
        </nav>
      </div>
      <Menubar isMenuOpen={isMenuOpen} onClose={toggleMenu} />
    </header>
  );
};

export default Header;
