"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, Mousewheel } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper as SwiperType } from "swiper";
import Link from "next/link";
import { Word } from "@/types/word";

const Review = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reviewWords, setReviewWords] = useState<Word[]>([]);
  const [priorityValues, setPriorityValues] = useState<number[]>([]);

  // ローカルストレージからreviewWordsキーで表示していた単語を取得
  useEffect(() => {
    const storedWords = localStorage.getItem("reviewWords");
    if (storedWords) {
      const words = JSON.parse(storedWords) as Word[];
      setReviewWords(words);
      setPriorityValues(words.map((item) => item.priority)); // priorityValuesを初期化
    }
  }, []);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPriority = parseInt(e.target.value, 10);
    setPriorityValues((prev) => {
      const newValues = [...prev];
      const cardIndex = Math.floor((activeIndex - 1) / 5); // 各cardの基準に基づくindexを取得
      newValues[cardIndex] = newPriority;
      return newValues;
    });
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  const isNotFirstOrLastSlide =
    activeIndex > 0 && activeIndex < reviewWords.length * 5 + 1;

  return (
    <div className="h-screen p-4 flex flex-col items-center ">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-2 px-1">
          <Link
            href="/" //今は簡易的にリンクを付けているが、データベースに状態を更新してから戻る
            className="px-4 py-2 border-2 font-semibold rounded-md shadow-sm hover:bg-gray-100 transition duration-300"
          >
            完 了
          </Link>
          <Link
            href="#" //ここもcardIndexによって動的に変える必要がある
            className="p-2  font-semibold bg-gray-300 rounded-md border-2 border-gray-300 shadow hover:bg-gray-400 hover:border-gray-400 transition duration-300"
          >
            カードを編集
          </Link>
        </div>
      </div>
      <Swiper
        navigation
        pagination={{ type: "progressbar" }}
        keyboard={{enabled: true}}
        mousewheel={{ forceToAxis: true }} //設定で縦スクロールも選べるようにするとよい
        onSlideChange={handleSlideChange}
        modules={[Navigation, Pagination, Keyboard, Mousewheel]}
        spaceBetween={30}
        className="w-full max-w-3xl h-3/5 border p-2 rounded-lg"
      >
        <SwiperSlide>
          <div className="h-full flex flex-col items-center justify-center text-3xl text-gray-500 opacity-20">
            <div className="text-3xl font-bold mb-4">Let's get started ! ➞</div>
          </div>
        </SwiperSlide>
        {reviewWords.map((card, i) => (
          <React.Fragment key={i}>
            <SwiperSlide>
              <div className="text-gray-400 pt-3 pl-3 ">語句</div>
              <div className="h-full flex items-center justify-center text-3xl -mt-8 px-20">
                <div className="font-bold">{card.word}</div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="text-gray-400 pt-3 pl-3 ">意味</div>
              <div className="w-full h-full  flex items-center justify-center text-3xl -mt-8 px-20">
                <div className="font-bold">{card.meaning}</div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="text-gray-400 pt-3 pl-3 ">例文</div>
              <div className="w-full h-full flex items-center justify-center text-2xl -mt-8 px-20">
                <div className="leading-normal">{card.example}</div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="text-gray-400 pt-3 pl-3 ">例文訳</div>
              <div className="w-full h-full flex items-center justify-center text-2xl -mt-8 px-20">
                <div className="leading-normal">{card.exampleTranslation}</div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="text-gray-400 pt-3 pl-3 ">メモ</div>
              <div className="w-full h-full flex items-center justify-center text-xl -mt-8 px-20">
                <div className="leading-normal">{card.note}</div>
              </div>
            </SwiperSlide>
          </React.Fragment>
        ))}

        <SwiperSlide>
          <div className="h-full flex flex-col items-center justify-center   bg-gradient-to-t from-yellow-300 to-orange-400 text-gray-100 p-8 rounded-lg shadow-xl">
            <div className="flex space-x-2 text-3xl">
              <div className="w-7 h-1"></div>
              <div className="font-bold mb-3">Great job !</div>
              <div className="animate-bounce"> 🎉</div>
            </div>
            <div className="text-lg">すべてのカードを復習しました！</div>
            <div>
              →{" "}
              <Link href="/" className="underline underline-offset-2">
                Home
              </Link>{" "}
              へ戻る
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {isNotFirstOrLastSlide && (
        <div className="mt-4 w-full text-center flex justify-center max-w-3xl">
          <input
            type="range"
            name="priority"
            min="0"
            max="10"
            value={priorityValues[Math.floor((activeIndex - 1) / 5)]}
            onChange={handleSliderChange}
            className="w-2/3"
          />
          <div className="px-2">
            {priorityValues[Math.floor((activeIndex - 1) / 5)]}
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
