//検索入力欄のコンポーネントです
//とりあえずフロントだけで画面に反映させる機能はついてません

"use client";
import { MagnifyingGlassIcon, XCircleIcon,} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const SearchInput = () => {
  const [screenSize, setScreenSize] = useState("mobile");
  const [inputValue, setInputValue] = useState("");

  // ウィンドウ幅に応じてHTML自体をかえる記述
  //ただしパフォーマンスに影響があるかも...
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setScreenSize("mobile");
      } else if (width >= 640) {
        setScreenSize("tablet");
      }
      //好きなサイズと名前を追加できます
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  //あとは{screenSize === "mobile" && (<JSX/>)}という記述で設定できます！

  //Former Motionの記述
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const toggleSearch = () => {
    if (!inputValue) {
      setIsOpen(!isOpen);
    }
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };

  const handleClear = () => {
    setInputValue("");
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        inputValue === "" // 入力があるときは閉じない
      ) {
        setIsOpen(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputValue]);

  return (
    <div ref={containerRef} className="flex items-center">
      <button onClick={toggleSearch} className="ml-2">
        <MagnifyingGlassIcon className="h-5 text-gray-400 cursor-pointer mx-1" />
      </button>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: isOpen ? 150 : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="py-1 pl-1 border-b focus:outline-none"
            placeholder="検索"
            style={{ width: "100%" }}
          />
          {/* 入力があればバツボタンを表示 */}
          {inputValue && (
            <button onClick={handleClear} className="absolute right-0 top-0 mt-2 mr-2">
              <XCircleIcon className="h-5 text-gray-500" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SearchInput;
