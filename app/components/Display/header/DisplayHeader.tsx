"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface SettingsProps {
  currentTab:string;
  setCurrentTab: Dispatch<SetStateAction<string>>
  toggleModal: () => void;
}

const DisplayHeader = ({currentTab, setCurrentTab, toggleModal}: SettingsProps) => {
  const [clickedSearch, setClickSearch] = useState(false);
  const [screenSize, setScreenSize] = useState("mobile");
  const [inputValue, setInputValue] = useState(""); //Home内で共有する必要があるかも

  // ウィンドウ幅に応じてHTML自体をかえる
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setScreenSize("mobile");
      } else if (width >= 640) {
        setScreenSize("tablet");
      }
      //好きなサイズと名前を追加
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="flex">
          <div
            onClick={() => setCurrentTab("cards")}
            className={`cursor-pointer py-1 xs:px-7 px-4 border-t border-l rounded-tl-md rounded-tr-md 
                ${currentTab === "cards" ? "bg-gray-300 font-semibold" : " hover:bg-gray-100"}`}
          >
            単 語
          </div>
          <div
            onClick={() => setCurrentTab("table")}
            className={`cursor-pointer py-1 xs:px-4 px-1 border-t border-r rounded-tr-md rounded-tl-md 
                ${currentTab === "table" ? "bg-gray-300 font-semibold" : " hover:bg-gray-100"}`}
          >
            テーブル
          </div>
        </div>

        {/* スマホ用の検索とフィルター */}
        {screenSize === "mobile" && (
          <div className="flex  ">
            {clickedSearch ? (
              <div className="flex items-center">
                <XCircleIcon
                  onClick={() => setClickSearch((prev) => !prev)}
                  className="h-6 w-6 text-gray-400 cursor-pointer xs:mr-1"
                />
                <div className="flex items-center border border-gray-300 rounded-md  py-1 xs:px-2 px-1">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 cursor-pointer" />
                  <input
                    type="text"
                    className="focus:outline-none xs:ml-2 ml-1 text-gray-600 w-28 xs:w-full "
                    placeholder="検索"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div className="flex xs:gap-1">
                <div
                  className="cursor-pointer flex items-center gap-1 rounded-md p-1 text-gray-500 "
                  onClick={() => setClickSearch((prev) => !prev)}
                >
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  検索
                </div>
                <div
                  onClick={toggleModal}
                  className="cursor-pointer flex items-center text-gray-500"
                >
                  <AdjustmentsHorizontalIcon className="h-6 w-6 text-gray-400" />
                  フィルター
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* タブレット&デスクトップ用の検索とフィルター */}
        {screenSize === "tablet" && (
          <div className="flex items-center justify-between">
            <div className="flex  ">
              {clickedSearch ? (
                <div className="flex items-center">
                  <XCircleIcon
                    onClick={() => setClickSearch((prev) => !prev)}
                    className="h-6 w-6 text-gray-400 cursor-pointer xs:mr-1"
                  />
                  <div className="flex items-center border border-gray-300 rounded-md  py-1 px-2">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 cursor-pointer" />
                    <input
                      type="text"
                      className="focus:outline-none ml-2 text-gray-600 w-24 xs:w-full"
                      placeholder="検索"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </div>
                  <div
                    onClick={toggleModal}
                    className="cursor-pointer flex items-center text-gray-500"
                  >
                    <AdjustmentsHorizontalIcon className="h-6 w-6 text-gray-400 ml-1" />
                    フィルター
                  </div>
                </div>
              ) : (
                <div className="flex gap-1">
                  <div
                    className="cursor-pointer flex items-center gap-1 rounded-md p-1 text-gray-500 "
                    onClick={() => setClickSearch((prev) => !prev)}
                  >
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                    検索
                  </div>
                  <div
                    onClick={toggleModal}
                    className="cursor-pointer flex items-center text-gray-500"
                  >
                    <AdjustmentsHorizontalIcon className="h-6 w-6 text-gray-400" />
                    フィルター
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayHeader;
