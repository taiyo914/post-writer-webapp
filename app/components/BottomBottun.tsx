"use client"
import { div } from "framer-motion/client";
import { FaArrowUp } from "react-icons/fa";

const BottomButton = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex justify-center mt-5 mb-20">
      <button 
        onClick={handleScrollTop} 
        className="
          bg-gray-500 text-white rounded-full 
          py-2 px-5 
          hover:bg-gray-400 transition-all
          flex space-x-1"
      >
        <FaArrowUp size={20} /> <div>トップに戻る</div>
      </button>
    </div>
  );
};

export default BottomButton;
