import { useState } from "react";
import { motion } from "framer-motion";
import { SignOut } from "@supabase/supabase-js";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ArrowLeftStartOnRectangleIcon,
  EnvelopeIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import SignOutBtn from "../components/SignOutBtn";

interface MenuProps {
  isMenuOpen: boolean;
  onClose: () => void;
}

const Menubar = ({ isMenuOpen, onClose }: MenuProps) => {
  return (
    <div>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isMenuOpen ? "0%" : "100%" }}
        transition={{ type: "tween", duration: 0.2, ease: "easeInOut" }}
        className="fixed top-0 right-0 h-full w-64  bg-gray-100 shadow-2xl px-5 py-4 z-40"
      >
        <div className="flex justify-end">
          <XMarkIcon className="h-8 text-gray-400 cursor-pointer" onClick={onClose}/>
        </div>
        <div className="p-4">
          <h2 className="text-3xl p-3 pt-0 font-bold ">Menu</h2>
          <div className="text-lg text-gray-700 rounded-lg p-3 duration-100  hover:bg-gray-200 hover:underline flex items-center">
            <HomeIcon className="h-5 mr-1" />
            <a href="#">Home</a>
          </div>
          <div className="text-lg text-gray-700 rounded-lg p-3 duration-100 hover:bg-gray-200 hover:underline flex items-center">
            <UserCircleIcon className="h-5 mr-1" />
            <a href="#">Profile</a>
          </div>
          <div className="text-lg text-gray-700 rounded-lg p-3 duration-100 hover:bg-gray-200 hover:underline flex items-center">
            <InformationCircleIcon className="h-5 mr-1" />
            <a href="#">About</a>
          </div>
          <div className="text-lg text-gray-700 rounded-lg p-3 duration-100  hover:bg-gray-200 hover:underline flex items-center">
            <QuestionMarkCircleIcon className="h-5 mr-1" />
            <a href="#">Help</a>
          </div>
          <div className="text-lg text-gray-700 rounded-lg p-3 duration-100  hover:bg-gray-200 hover:underline flex items-center">
            <EnvelopeIcon className="h-5 mr-1" />
            <a href="#">Contact</a>
          </div>
          <div className="my-1 border"></div>
          <div className="text-lg text-gray-700 rounded-lg p-3 duration-100  hover:bg-gray-200 hover:underline flex items-center">
            <ArrowLeftStartOnRectangleIcon className="h-5 mr-1" />
            <SignOutBtn/>
          </div>
        </div>
      </motion.div>

      {/* サイドバーが開いているときのオーバーレイ */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30"
          onClick={onClose} // オーバーレイをクリックすると閉じる
        />
      )}
    </div>
  );
};

export default Menubar;
