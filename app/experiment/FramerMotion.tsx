import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const FramerMotion = () => {
  const [isOpen, setIsOpen] = useState(false);

  // メニューのアニメーション設定
  const menuVariants = {
    hidden: { x: "100%", opacity: 0.5}, // 右側からスライドして現れる
    visible: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0.5 }, // 右側にスライドして消える
  };

  return (
    <div>
      {/* メニューボタン */}
      <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 bg-blue-500 text-white">
        {isOpen ? "Close Menu" : "Open Menu"}
      </button>

      {/* メニューバー */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 0.2 }} // スムーズなトランジション
            className="fixed top-0 right-0 w-64 h-full bg-gray-100 shadow-2xl p-5"
          >
            <h2 className="text-3xl p-3 font-bold ">Menu</h2>
            <ul className="">
              <li className="text-lg text-gray-700 rounded-lg p-3 duration-100  hover:bg-gray-200 hover:underline   ">
                <a href="#">Home</a>
              </li>
              <li className="text-lg text-gray-700 rounded-lg p-3 duration-100 hover:bg-gray-200 hover:underline ">
                <a href="#">About</a>
              </li>
              <li className="text-lg text-gray-700 rounded-lg p-3 duration-100  hover:bg-gray-200 hover:underline ">
                <a href="#">Help</a>
              </li>
              <li className="text-lg text-gray-700 rounded-lg p-3 duration-100  hover:bg-gray-200 hover:underline ">
                <a href="#">Contact</a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* サイドバーが開いているときのオーバーレイ */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30"
          onClick={()=>setIsOpen(false)} // オーバーレイをクリックすると閉じる
        />
      )}
    </div>
  );
};

export default FramerMotion;
